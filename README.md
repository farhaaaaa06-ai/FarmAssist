# FarmAssist - Plant Leaf Disease Detection & Diagnostic System

FarmAssist is an intelligent agronomic health diagnostic platform engineered to identify plant leaf pathogens, bacterial spots, and nutritional deficiencies using deep convolutional neural networks (PyTorch). The system provides laboratory-grade foliar diagnosis across 38 disease categories spanning 14 agricultural crop varieties with instant treatment and management protocols.

---

## Key Features
- **Accurate Pathogen Detection**: Classifies 38 distinct crop pathologies and 1 background category with a 95.00% overall diagnostic benchmark score.
- **Broad Agricultural Coverage**: Diagnostics across 14 crops including Apple, Blueberry, Cherry, Corn, Grape, Citrus, Peach, Bell Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, and Tomato.
- **Multilingual Diagnostic Reports**: Real-time translation into English, Kannada (ಕನ್ನಡ), and Hindi (हिन्दी).
- **Integrated Voice Assistant**: Hands-free voice commands and navigation in all supported languages.
- **Live Webcam & Photo Capture**: Test real leaves directly via mobile or desktop cameras with specimen capture guidelines.

---

## Directory Architecture

```
Plant-Disease-Detection/
├── web_app/                   # Full-stack Flask diagnostic web platform
│   ├── app.py                 # Core application engine & route handlers
│   ├── CNN.py                 # CropPathologyNet neural architecture
│   ├── disease_info.csv       # Clinical pathology descriptions & protocols
│   ├── supplement_info.csv    # Crop care remedies and bio-controls
│   ├── disease_reports.json   # Multilingual clinical dossiers (EN, KN, HI)
│   ├── requirements.txt       # Web application dependencies
│   ├── static/                # Design system, CSS, JS, voice engine
│   └── templates/             # Jinja2 responsive HTML5 views
├── model_training/            # Deep learning model development & training
│   ├── Plant Disease Detection Code.ipynb  # End-to-end training notebook
│   ├── Plant Disease Detection Code.md     # Markdown export of pipeline
│   └── model.JPG              # Visual architecture diagram
├── sample_images/             # Pre-curated specimen photographs for testing
├── assets/                    # Platform media, previews, and documentation assets
├── details.md                 # Complete technical architecture & project dossier
├── theory.md                  # Theoretical foundations of phytopathology & deep learning
├── flowchart.md               # End-to-end system flowchart & diagram data
└── README.md                  # Project overview & quick-start guide
```

---

## Quick Start Guide

### 1. Prerequisites
- Python 3.8+
- Recommended: A dedicated virtual environment (`venv` or `conda`)

### 2. Environment Setup
```bash
# Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install required dependencies
pip install -r web_app/requirements.txt
```

### 3. Run the Web Application
```bash
cd web_app
python app.py
```
Open your browser and navigate to `http://localhost:5000`.

---

## Testing & Verification
You can evaluate the diagnostic model immediately using the high-resolution foliar specimens located in the `sample_images/` directory. Each image is named after the target crop and pathogen condition for easy validation.
