"""
FarmAssist - Intelligent Agricultural Pathology & Crop Health Diagnostic Platform.
Modular, performant Flask application engine with multilingual diagnostic reporting.
"""

import os
import sys
import json
import numpy as np
import pandas as pd
from PIL import Image
import torch
import torchvision.transforms.functional as TF
from werkzeug.utils import secure_filename
from flask import Flask, redirect, render_template, request, url_for, jsonify
import uuid
import threading

# Ensure execution context includes current module directory
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
if APP_ROOT not in sys.path:
    sys.path.insert(0, APP_ROOT)

import CNN

# ----------------------------------------------------------------------
# 1. Dataset & Knowledge Base Paths
# ----------------------------------------------------------------------
PATHOLOGY_CATALOG_PATH = os.path.join(APP_ROOT, 'disease_info.csv')
REMEDY_CATALOG_PATH = os.path.join(APP_ROOT, 'supplement_info.csv')
MULTILINGUAL_KNOWLEDGE_PATH = os.path.join(APP_ROOT, 'disease_reports.json')
MODEL_WEIGHTS_PATH = os.path.join(APP_ROOT, 'plant_disease_model_1_latest.pt')
UPLOAD_DIRECTORY = os.path.join(APP_ROOT, 'static', 'uploads')

os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# Load tabular agronomic registries with UTF-8 encoding
pathology_catalog = pd.read_csv(PATHOLOGY_CATALOG_PATH, encoding='utf-8')
remedy_catalog = pd.read_csv(REMEDY_CATALOG_PATH, encoding='utf-8')

# Load localized pathology knowledge repository (English, Kannada, Hindi)
knowledge_repository = {}
if os.path.exists(MULTILINGUAL_KNOWLEDGE_PATH):
    try:
        with open(MULTILINGUAL_KNOWLEDGE_PATH, 'r', encoding='utf-8') as kb_file:
            knowledge_repository = json.load(kb_file)
        print(f"[KnowledgeBase] Loaded localized clinical dossiers for {len(knowledge_repository)} classes.")
    except Exception as kb_err:
        print(f"[KnowledgeBase] Warning: Unable to parse localized reports: {kb_err}")

# ----------------------------------------------------------------------
# 2. Neural Diagnostic Engine Initialization
# ----------------------------------------------------------------------
NUM_PATHOLOGY_CLASSES = 39
pathology_classifier = CNN.CropPathologyNet(num_classes=NUM_PATHOLOGY_CLASSES)

if os.path.exists(MODEL_WEIGHTS_PATH):
    try:
        checkpoint_weights = torch.load(MODEL_WEIGHTS_PATH, map_location=torch.device('cpu'))
        pathology_classifier.load_state_dict(checkpoint_weights)
        pathology_classifier.eval()
        print(f"[ModelEngine] Neural network initialized successfully from {MODEL_WEIGHTS_PATH}")
    except Exception as model_err:
        print(f"[ModelEngine] Error loading checkpoint weights: {model_err}")
else:
    print(f"[ModelEngine] Warning: Model checkpoint missing at {MODEL_WEIGHTS_PATH}")

# ----------------------------------------------------------------------
# 2.5. Voice Command Engine Initialization (Vosk)
# ----------------------------------------------------------------------
VOSK_MODEL_PATH = os.path.join(APP_ROOT, 'vosk-model')
speech_model = None

try:
    import vosk
    if os.path.exists(VOSK_MODEL_PATH):
        vosk.SetLogLevel(-1)
        speech_model = vosk.Model(VOSK_MODEL_PATH)
        print(f"[VoiceEngine] Offline Vosk model initialized successfully from {VOSK_MODEL_PATH}")
    else:
        print(f"[VoiceEngine] Warning: Vosk model missing at {VOSK_MODEL_PATH}")
except ImportError:
    print("[VoiceEngine] Warning: vosk package not installed. Offline voice commands unavailable.")

def evaluate_specimen_pathology(specimen_filepath):
    """
    Executes deep convolutional feature inference on an input foliar image specimen.
    Preprocesses input to 224x224 RGB tensor and extracts predicted class index.
    """
    with Image.open(specimen_filepath) as raw_img:
        rgb_specimen = raw_img.convert('RGB').resize((224, 224))
    
    specimen_tensor = TF.to_tensor(rgb_specimen).view((-1, 3, 224, 224))
    
    with torch.no_grad():
        class_logits = pathology_classifier(specimen_tensor)
        logits_array = class_logits.detach().numpy()
        predicted_idx = int(np.argmax(logits_array))
        
    return predicted_idx


# ----------------------------------------------------------------------
# 3. Web Platform & Route Handlers
# ----------------------------------------------------------------------
app = Flask(
    __name__,
    template_folder=os.path.join(APP_ROOT, 'templates'),
    static_folder=os.path.join(APP_ROOT, 'static')
)

@app.route('/')
def home_page():
    """Renders the FarmAssist home landing page."""
    return render_template('home.html')

@app.route('/index')
def scan_leaf_studio():
    """Renders the interactive specimen camera & image upload studio."""
    return render_template('index.html')

@app.route('/contact')
def support_center():
    """Renders user guides, technical FAQ, and agronomic inquiry forms."""
    return render_template('contact-us.html')

@app.route('/farmassist', methods=['GET', 'POST'])
@app.route('/market', methods=['GET', 'POST'])
def remedy_catalog_view():
    """Renders curated crop care remedies, bio-fungicides, and nutrition boosters."""
    return render_template(
        'farmassist.html',
        supplement_image=list(remedy_catalog['product_image_url']),
        supplement_name=list(remedy_catalog['product_title']),
        disease=list(pathology_catalog['condition_title']),
        buy=list(remedy_catalog['purchase_link']),
        remedy_images=list(remedy_catalog['product_image_url']),
        remedy_names=list(remedy_catalog['product_title']),
        target_conditions=list(pathology_catalog['condition_title']),
        purchase_links=list(remedy_catalog['purchase_link'])
    )

@app.route('/submit', methods=['GET', 'POST'])
def process_diagnostic_submission():
    """
    Receives uploaded foliar photograph, dispatches neural inference,
    and returns comprehensive pathology breakdown with localized advice.
    """
    if request.method == 'POST':
        if 'image' not in request.files:
            return redirect(url_for('scan_leaf_studio'))

        uploaded_file = request.files['image']
        if not uploaded_file or uploaded_file.filename == '':
            return redirect(url_for('scan_leaf_studio'))

        selected_language = request.form.get('lang', 'en').lower().strip()
        if selected_language not in ['en', 'kn', 'hi']:
            selected_language = 'en'

        safe_filename = secure_filename(uploaded_file.filename) or "foliar_specimen.jpg"
        persisted_specimen_path = os.path.join(UPLOAD_DIRECTORY, safe_filename)
        uploaded_file.save(persisted_specimen_path)

        try:
            detected_class_index = evaluate_specimen_pathology(persisted_specimen_path)
        except Exception as infer_err:
            print(f"[InferenceError] Failed to process specimen: {infer_err}")
            detected_class_index = 0

        class_key = str(detected_class_index)
        if class_key in knowledge_repository:
            class_dossier = knowledge_repository[class_key]
            active_dossier = class_dossier.get(selected_language, class_dossier['en'])
            
            condition_title = active_dossier['name']
            clinical_description = active_dossier['desc']
            treatment_advice = active_dossier['prevent']
            remedy_name = active_dossier['sname']
            reference_image_url = active_dossier['image_url']
            remedy_image_url = active_dossier['simage']
            remedy_purchase_link = active_dossier['buy_link']
            serialized_reports_json = json.dumps(class_dossier, ensure_ascii=False)
        else:
            condition_title = pathology_catalog['condition_title'][detected_class_index]
            clinical_description = pathology_catalog['description'][detected_class_index]
            treatment_advice = pathology_catalog['treatment_protocol'][detected_class_index]
            reference_image_url = pathology_catalog['sample_image_url'][detected_class_index]
            remedy_name = remedy_catalog['product_title'][detected_class_index]
            remedy_image_url = remedy_catalog['product_image_url'][detected_class_index]
            remedy_purchase_link = remedy_catalog['purchase_link'][detected_class_index]
            serialized_reports_json = '{}'

        return render_template(
            'submit.html',
            title=condition_title,
            desc=clinical_description,
            prevent=treatment_advice,
            image_url=reference_image_url,
            pred=detected_class_index,
            sname=remedy_name,
            simage=remedy_image_url,
            buy_link=remedy_purchase_link,
            selected_lang=selected_language,
            reports_json=serialized_reports_json
        )

    return redirect(url_for('scan_leaf_studio'))

@app.route('/voice-command', methods=['POST'])
def process_voice_command():
    """
    Receives raw 16-bit PCM audio from the frontend, decodes it completely offline
    using Vosk, and returns the transcribed text.
    """
    if not speech_model:
        return {"text": "", "error": "Offline speech model not loaded."}
    
    try:
        import vosk
        pcm_data = request.data
        if not pcm_data:
            return {"text": "", "error": "No audio data received."}
            
        rec = vosk.KaldiRecognizer(speech_model, 16000)
        # AcceptWaveform requires bytes
        rec.AcceptWaveform(pcm_data)
        # We also need FinalResult for any remaining audio in the buffer
        final_res = json.loads(rec.FinalResult())
        
        return {"text": final_res.get("text", "")}
    except Exception as e:
        print(f"[VoiceEngine] Error processing voice command: {e}")
        return {"text": "", "error": str(e)}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
