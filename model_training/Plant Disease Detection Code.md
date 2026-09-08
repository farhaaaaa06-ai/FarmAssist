# FarmAssist: Plant Foliar Pathology Diagnostic Pipeline
A modular deep convolutional neural network for multi-class plant disease classification across 38 agricultural foliar conditions.


## 1. Environment & Library Initialization
Import required analytical libraries, deep learning primitives from PyTorch, and imaging utilities.


```python
import os
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader
from torch.utils.data.sampler import SubsetRandomSampler
from torchvision import datasets, transforms
import torchvision.transforms.functional as TF

# Set deterministic random seed for reproducibility
RANDOM_SEED = 42
torch.manual_seed(RANDOM_SEED)
np.random.seed(RANDOM_SEED)

# Detect hardware acceleration
compute_device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Active Compute Engine: {compute_device}")
```


## 2. Dataset Ingestion & Transform Pipeline
Configures input normalization, spatial resizing to standard 224x224 RGB resolution, and stratified dataset partitioning.


```python
# Foliar specimen preprocessing pipeline
foliar_transforms = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor()
])

# Dataset ingestion path
DATASET_DIRECTORY = 'Dataset'

if os.path.exists(DATASET_DIRECTORY):
    foliar_dataset = datasets.ImageFolder(DATASET_DIRECTORY, transform=foliar_transforms)
    total_samples = len(foliar_dataset)
    num_classes = len(foliar_dataset.class_to_idx)
    print(f"Loaded foliar dataset: {total_samples} samples across {num_classes} categories.")
    
    # 80% Train, 10% Validation, 10% Test split
    sample_indices = list(range(total_samples))
    np.random.shuffle(sample_indices)
    
    train_cutoff = int(np.floor(0.80 * total_samples))
    val_cutoff = int(np.floor(0.90 * total_samples))
    
    train_idx = sample_indices[:train_cutoff]
    val_idx = sample_indices[train_cutoff:val_cutoff]
    test_idx = sample_indices[val_cutoff:]
    
    train_loader = DataLoader(foliar_dataset, batch_size=64, sampler=SubsetRandomSampler(train_idx))
    val_loader = DataLoader(foliar_dataset, batch_size=64, sampler=SubsetRandomSampler(val_idx))
    test_loader = DataLoader(foliar_dataset, batch_size=64, sampler=SubsetRandomSampler(test_idx))
else:
    num_classes = 39
    print(f"Defaulting to {num_classes} benchmark pathology classes.")
```


## 3. Deep Convolutional Architecture (CropPathologyNet)
Hierarchical 4-stage convolutional feature extractor with spatial batch normalization and dense dropout regularization.


```python
class CropPathologyNet(nn.Module):
    def __init__(self, num_classes=39):
        super(CropPathologyNet, self).__init__()
        
        self.conv_layers = nn.Sequential(
            # Stage 1: Spatial edge extraction
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(32),
            nn.Conv2d(32, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(32),
            nn.MaxPool2d(kernel_size=2),

            # Stage 2: Foliar lesion & texture descriptors
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(64),
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(64),
            nn.MaxPool2d(kernel_size=2),

            # Stage 3: Chlorosis and spot morphology
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(128),
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(128),
            nn.MaxPool2d(kernel_size=2),

            # Stage 4: High-level pathogen signature maps
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(256),
            nn.Conv2d(256, 256, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(256),
            nn.MaxPool2d(kernel_size=2),
        )

        self.dense_layers = nn.Sequential(
            nn.Dropout(p=0.4),
            nn.Linear(50176, 1024),
            nn.ReLU(),
            nn.Dropout(p=0.4),
            nn.Linear(1024, num_classes),
        )

    def forward(self, tensor_batch):
        feature_maps = self.conv_layers(tensor_batch)
        flattened = feature_maps.view(-1, 50176)
        return self.dense_layers(flattened)

pathology_model = CropPathologyNet(num_classes=num_classes).to(compute_device)
print(pathology_model)
```


## 4. Optimization Engine & Training Pipeline
Modular optimization loop utilizing Cross-Entropy loss with Adam optimizer.


```python
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(pathology_model.parameters(), lr=0.001, weight_decay=1e-5)

def train_pathology_engine(model, train_data, val_data, epochs=10):
    history = {'train_loss': [], 'val_loss': []}
    
    for epoch in range(epochs):
        model.train()
        running_train_loss = 0.0
        
        for images, labels in train_data:
            images, labels = images.to(compute_device), labels.to(compute_device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_train_loss += loss.item() * images.size(0)
            
        model.eval()
        running_val_loss = 0.0
        with torch.no_grad():
            for images, labels in val_data:
                images, labels = images.to(compute_device), labels.to(compute_device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                running_val_loss += loss.item() * images.size(0)
                
        epoch_train_loss = running_train_loss / len(train_data.sampler)
        epoch_val_loss = running_val_loss / len(val_data.sampler)
        
        history['train_loss'].append(epoch_train_loss)
        history['val_loss'].append(epoch_val_loss)
        print(f"Epoch [{epoch+1}/{epochs}] - Train Loss: {epoch_train_loss:.4f} | Val Loss: {epoch_val_loss:.4f}")
        
    return history
```


## 5. Model Checkpoint Loading & State Verification
Load pre-trained neural network weights into the architecture and evaluate parameters.


```python
CHECKPOINT_PATH = 'plant_disease_model_1_latest.pt'

if os.path.exists(CHECKPOINT_PATH):
    weights = torch.load(CHECKPOINT_PATH, map_location=compute_device)
    pathology_model.load_state_dict(weights)
    pathology_model.eval()
    print("Pre-trained model checkpoint loaded successfully.")
else:
    print(f"Checkpoint not found at {CHECKPOINT_PATH}.")
```


## 6. Performance Evaluation Function
Quantifies model diagnostic accuracy across evaluation loaders.


```python
def compute_model_accuracy(model, data_loader):
    model.eval()
    correct_predictions = 0
    total_samples = 0
    
    with torch.no_grad():
        for images, labels in data_loader:
            images, labels = images.to(compute_device), labels.to(compute_device)
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            total_samples += labels.size(0)
            correct_predictions += (predicted == labels).sum().item()
            
    accuracy_percentage = (correct_predictions / total_samples) * 100
    return accuracy_percentage
```


## 7. Automated Batch Inference Engine
Performs vector inference on real leaf specimens, mapping predicted class labels to agronomic management protocols.


```python
CLASS_INDEX = {
    0: 'Apple : Scab', 1: 'Apple : Black Rot', 2: 'Apple : Cedar Apple Rust', 3: 'Apple : Healthy',
    4: 'Background without leaves', 5: 'Blueberry : Healthy', 6: 'Cherry : Powdery Mildew', 7: 'Cherry : Healthy',
    8: 'Corn : Gray Leaf Spot', 9: 'Corn : Common Rust', 10: 'Corn : Northern Leaf Blight', 11: 'Corn : Healthy',
    12: 'Grape : Black Rot', 13: 'Grape : Esca (Black Measles)', 14: 'Grape : Leaf Blight', 15: 'Grape : Healthy',
    16: 'Citrus : Huanglongbing', 17: 'Peach : Bacterial Spot', 18: 'Peach : Healthy',
    19: 'Bell Pepper : Bacterial Spot', 20: 'Bell Pepper : Healthy', 21: 'Potato : Early Blight',
    22: 'Potato : Late Blight', 23: 'Potato : Healthy', 24: 'Raspberry : Healthy', 25: 'Soybean : Healthy',
    26: 'Squash : Powdery Mildew', 27: 'Strawberry : Leaf Scorch', 28: 'Strawberry : Healthy',
    29: 'Tomato : Bacterial Spot', 30: 'Tomato : Early Blight', 31: 'Tomato : Late Blight',
    32: 'Tomato : Leaf Mold', 33: 'Tomato : Septoria Leaf Spot', 34: 'Tomato : Two-Spotted Spider Mite',
    35: 'Tomato : Target Spot', 36: 'Tomato : Yellow Leaf Curl Virus', 37: 'Tomato : Mosaic Virus', 38: 'Tomato : Healthy'
}

def predict_single_specimen(image_path, model=pathology_model):
    if not os.path.exists(image_path):
        return None
    with Image.open(image_path) as img:
        img_tensor = TF.to_tensor(img.convert('RGB').resize((224, 224))).view(-1, 3, 224, 224).to(compute_device)
    with torch.no_grad():
        logits = model(img_tensor)
        predicted_idx = int(np.argmax(logits.cpu().detach().numpy()))
    return CLASS_INDEX.get(predicted_idx, 'Unknown Condition')

def run_batch_evaluation(samples_directory='../sample_images', max_items=10):
    if not os.path.exists(samples_directory):
        samples_directory = 'sample_images'
    if not os.path.exists(samples_directory):
        print(f"Samples directory '{samples_directory}' not found.")
        return
    image_files = [f for f in os.listdir(samples_directory) if f.lower().endswith(('.jpg', '.jpeg', '.png'))][:max_items]
    print(f"Executing inference across {len(image_files)} sample specimens:\n")
    for img_name in image_files:
        path = os.path.join(samples_directory, img_name)
        diagnosis = predict_single_specimen(path)
        print(f"  Specimen: {img_name:<35} -> Diagnosis: {diagnosis}")

# Execute demonstration batch evaluation
run_batch_evaluation()
```
