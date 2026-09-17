/**
 * FarmAssist - Centralized Multilingual Translation Dictionary
 * Supported Languages: English (en), Kannada (kn), Hindi (hi)
 * Zero organization names or personal details.
 */

const translations = {
    en: {
        // Brand & Navigation
        brand_name: "FarmAssist",
        brand_badge: "AI Diagnostic",
        nav_home: "Home",
        nav_engine: "AI Engine",
        nav_market: "Crop Care",
        nav_farmassist: "Crop Care",
        nav_support: "Help & Guides",
        nav_scan_leaf: "Scan Leaf",
        lang_select: "Language",

        // Hero Section
        hero_badge: "Next-Gen Computer Vision",
        hero_title_1: "Detect Crop Diseases",
        hero_title_highlight: "Instantly with AI",
        hero_desc: "Protect your harvest with laboratory-grade plant pathology right in your browser. Upload any leaf photo to pinpoint fungal infections, bacterial blights, and nutritional deficiencies in seconds.",
        hero_btn_analyze: "Start AI Diagnosis",
        hero_btn_market: "Crop Care Advisor",
        hero_btn_farmassist: "Crop Care Advisor",
        stat_profiles: "Pathogen Profiles",
        stat_crops: "Supported Crops",
        stat_speed: "Inference Speed",
        preview_scanner_active: "Neural Scanner Active",
        preview_match: "99.4% Match",
        preview_sample_diag: "Tomato : Early Blight Detected",
        preview_sample_desc: "Target spots and chlorosis detected. Copper fungicide and leaf pruning recommended.",

        // Workflow Section
        workflow_subtitle: "Seamless Workflow",
        workflow_title: "How the AI Diagnostic Works",
        workflow_desc: "From photo to treatment plan in three intuitive steps.",
        step1_title: "Capture Leaf",
        step1_desc: "Upload a high-resolution photo or capture directly using your mobile or desktop webcam.",
        step2_title: "Deep CNN Analysis",
        step2_desc: "Convolutional neural networks analyze lesion morphology, chlorosis patterns, and fungal structures.",
        step3_title: "Treatment Protocol",
        step3_desc: "Receive instant pathology breakdown, preventive hygiene steps, and targeted supplement remedies.",

        // Supported Crops
        crops_subtitle: "Broad Agricultural Coverage",
        crops_title: "Supported Crops & Fruits",
        crops_desc: "Our diagnostic models are specifically trained and validated on leaf specimens across these 14 agricultural varieties.",
        crop_apple: "Apple",
        crop_apple_sub: "Scab • Black Rot • Rust",
        crop_blueberry: "Blueberry",
        crop_blueberry_sub: "Foliar Vigor Diagnostics",
        crop_banana: "Banana",
        crop_banana_sub: "Powdery Mildew",
        crop_corn: "Corn (Maize)",
        crop_corn_sub: "Gray Leaf Spot • Rust • Blight",
        crop_grape: "Grape",
        crop_grape_sub: "Black Rot • Esca • Leaf Blight",
        crop_orange: "Citrus / Orange",
        crop_orange_sub: "Huanglongbing (Citrus Greening)",
        crop_peach: "Peach",
        crop_peach_sub: "Bacterial Spot",
        crop_pepper: "Bell Pepper",
        crop_pepper_sub: "Bacterial Spot • Vigor",
        crop_potato: "Potato",
        crop_potato_sub: "Early Blight • Late Blight",
        crop_raspberry: "Raspberry",
        crop_raspberry_sub: "Foliar Health Screening",
        crop_soybean: "Soybean",
        crop_soybean_sub: "Crop Health & Purity",
        crop_squash: "Squash",
        crop_squash_sub: "Powdery Mildew",
        crop_strawberry: "Strawberry",
        crop_strawberry_sub: "Leaf Scorch • Health",
        crop_tomato: "Tomato",
        crop_tomato_sub: "10 Distinct Pathology Profiles",
        btn_diagnose_now: "Diagnose Your Plant Now",

        // Diagnostic Studio
        studio_header_badge: "Neural Vision Engine",
        studio_header_title: "Plant Leaf Diagnostic Studio",
        studio_header_desc: "Capture or upload a clear photo of an infected or suspect crop leaf. Our deep learning classifier analyzes pathogen signatures against 38 agricultural pathology classes.",
        dropzone_title: "Upload Leaf Specimen",
        dropzone_hint: "Drag & drop your leaf photo here, or browse files",
        btn_browse: "Browse Photos",
        btn_camera: "Use Live Camera",
        btn_snap: "Snap Photo",
        btn_cancel: "Cancel",
        btn_run_diagnosis: "Run AI Diagnosis",
        btn_voice_command: "Voice Command",
        voice_listening_title: "Listening...",
        voice_modal_hint: "Speak a command or search query",
        voice_listening_transcript: "Listening... speak now",
        voice_chip_home: "Home",
        voice_chip_scan: "Scan Leaf",
        voice_chip_remedies: "Remedies",
        voice_chip_camera: "Camera",
        voice_err_denied: "Microphone permission denied. Please click the lock or settings icon in your browser address bar to allow microphone access.",
        voice_err_no_speech: "No speech detected. Please speak clearly into your microphone.",
        voice_err_network: "Network error: Web speech service unreachable. Check your internet connection.",
        voice_err_unsupported: "Voice recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Apple Safari.",
        voice_btn_try_again: "Try Again",
        voice_btn_cancel: "Cancel",
        voice_search_dictate: "Voice Search",
        audio_report_title: "Audio Diagnostic Report",
        audio_report_hint: "Listen to disease diagnosis and prevention steps in your selected language",
        btn_listen_report: "Listen to Report",
        scanning_title: "Analyzing Specimen...",
        scanning_subtitle: "Comparing against 38 deep neural disease models",
        tips_title: "Specimen Capture Tips",
        tip1_title: "Natural, Even Lighting",
        tip1_desc: "Photograph in diffuse natural light. Avoid harsh shadows or strong flash reflections on glossy leaf surfaces.",
        tip2_title: "Focus on Affected Tissue",
        tip2_desc: "Frame the lesion, discoloration, or pustules clearly in center view. Ensure crisp lens focus.",
        tip3_title: "Single Leaf Framing",
        tip3_desc: "Place the leaf against a plain or natural background. Avoid crowded bunches or non-foliar debris.",
        adv_title: "Early Detection Advantage",
        adv_desc: "Diagnosing symptoms at early infection stages dramatically reduces crop yield loss and allows targeted bio-fungicide treatment before disease spreads across the field.",

        // Diagnostic Results
        res_healthy_badge: "Healthy Specimen Verified",
        res_diseased_badge: "Pathogen Detected",
        res_bg_badge: "Non-Foliar Background",
        res_confidence_sub: "Neural classification index: #",
        res_btn_another: "Diagnose Another Leaf",
        res_ref_title: "Reference Specimen",
        res_ref_desc: "Archived Pathology Verification Sample",
        res_nutrition_title: "Recommended Crop Nutrition",
        res_treatment_title: "Targeted Treatment Remedy",
        res_view_product: "View Product Details",
        res_symptom_overview: "Pathology & Symptom Overview",
        res_health_overview: "Crop Health Profile",
        res_management_title: "Actionable Management & Cultural Controls",
        res_vigor_title: "Best Practices for Sustained Vigor",
        res_advisory_title: "Agronomic Advisory:",
        res_advisory_text: "Always follow localized dosage rates when applying sprays, and rotate chemical modes of action (FRAC codes) to prevent pathogen resistance development.",

        // Treatment Market
        // FarmAssist Advisory
        market_badge: "FarmAssist Agronomy Guide",
        farmassist_badge: "FarmAssist Agronomy Guide",
        market_title: "FarmAssist: Crop Care & Remedy Advisor",
        farmassist_title: "FarmAssist: Crop Care & Remedy Advisor",
        market_desc: "Explore expert-curated bio-fungicides, systemic bactericides, micronutrient boosters, and organic crop care protocols.",
        farmassist_desc: "Explore expert-curated bio-fungicides, systemic bactericides, micronutrient boosters, and organic crop care protocols.",
        market_search_placeholder: "Search remedies, crops, or treatment actives in FarmAssist...",
        farmassist_search_placeholder: "Search remedies, crops, or treatment actives in FarmAssist...",
        tab_all: "All Remedies",
        tab_healthy: "Fertilizers & Vigor",
        tab_diseased: "Disease Remedies",
        target_label: "Target:",
        btn_buy: "View Remedy Guide",
        no_products_title: "No Matching Remedies Found",
        no_products_desc: "Try adjusting your keywords or clearing the category filter.",
        tag_nutrition: "Crop Nutrition",
        tag_treatment: "Disease Treatment",
        badge_healthy: "Healthy",
        badge_remedy: "Remedy",

        // Support & FAQ Center
        contact_badge: "Agronomy Assistance",
        contact_title: "Support & Diagnostic Center",
        contact_desc: "Have questions regarding leaf disease identification, model accuracy, or recommended treatment protocols? Our diagnostics team and FAQ guides are here to assist.",
        form_title: "Send Diagnostic Inquiry",
        form_subtitle: "Submit your inquiry or feedback on classification results.",
        form_name_label: "Your Full Name",
        form_email_label: "Email Address",
        form_topic_label: "Subject / Crop Category",
        form_select_placeholder: "Select topic...",
        form_topic_acc: "Model Accuracy or Misclassification",
        form_topic_crops: "Request Additional Crop Variety",
        form_topic_treatment: "Treatment & Supplement Advisory",
        form_topic_tech: "Technical Support / Bug Report",
        form_message_label: "Message Details",
        form_btn_submit: "Submit Inquiry",
        form_success: "Thank you! Your inquiry has been received. Our agronomy team will review your query.",
        faq_title: "Diagnostic FAQs",
        faq1_q: "How accurate is the AI diagnosis?",
        faq1_a: "The underlying Deep Convolutional Neural Network achieves 95% validation accuracy across standard benchmark datasets comprising 38 distinct foliar health and disease classes.",
        faq2_q: "What image quality is needed?",
        faq2_a: "A standard smartphone camera in good lighting is sufficient. For optimal results, ensure the leaf fills the majority of the frame with lesions in clear focus without motion blur.",
        faq3_q: "Are organic treatment alternatives provided?",
        faq3_a: "Yes. Each diagnostic breakdown provides cultural sanitation methods, preventive biological practices, and both organic copper/sulfur and targeted bio-fungicide remedies.",
        faq4_q: "Can I use this in field conditions offline?",
        faq4_a: "Once the model weights are downloaded locally, inference executes rapidly on your local CPU or GPU without requiring external cloud API calls.",
        specs_title: "Neural Engine Specs",
        spec_arch: "Architecture: 4-Stage Deep Convolutional Network",
        spec_res: "Input Resolution: 224 × 224 RGB",
        spec_classes: "Pathology Classes: 39 (38 Foliar + 1 Background)",
        spec_framework: "Inference Framework: PyTorch • TorchVision",

        // Footer
        footer_desc: "High-precision deep learning platform engineered to detect 38+ plant leaf pathogens, bacterial spots, and nutrient deficiencies to safeguard crop yields and empower sustainable agronomy.",
        footer_quick_links: "Quick Navigation",
        footer_diagnostics_title: "Supported Diagnostics",
        footer_stat1: "Agricultural Crops",
        footer_stat2: "Disease Categories",
        footer_stat3: "Instant Cultural Advice",
        footer_stat4: "Organic & Bio Controls",
        footer_copyright: "© 2026 FarmAssist. All rights reserved.",
        footer_engine_tag: "AI Powered Agronomy • Model Architecture: Deep Convolutional Neural Network"
    },

    kn: {
        // Brand & Navigation
        brand_name: "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್ (FarmAssist)",
        brand_badge: "AI ರೋಗನಿರ್ಣಯ",
        nav_home: "ಮುಖಪುಟ",
        nav_engine: "AI ಎಂಜಿನ್",
        nav_market: "ಬೆಳೆ ಆರೈಕೆ (Crop Care)",
        nav_farmassist: "ಬೆಳೆ ಆರೈಕೆ (Crop Care)",
        nav_support: "ಸಹಾಯ ಮತ್ತು ಮಾರ್ಗದರ್ಶಿ",
        nav_scan_leaf: "ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
        lang_select: "ಭಾಷೆ",

        // Hero Section
        hero_badge: "ಮುಂದಿನ ಪೀಳಿಗೆಯ ಕಂಪ್ಯೂಟರ್ ದೃಷ್ಟಿ",
        hero_title_1: "ಬೆಳೆ ರೋಗಗಳನ್ನು",
        hero_title_highlight: "AI ಮೂಲಕ ತಕ್ಷಣವೇ ಪತ್ತೆ ಮಾಡಿ",
        hero_desc: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿಯೇ ಪ್ರಯೋಗಾಲಯ ದರ್ಜೆಯ ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರದೊಂದಿಗೆ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ. ಶಿಲೀಂಧ್ರ ಸೋಂಕುಗಳು, ಬ್ಯಾಕ್ಟೀರಿಯಾದ ರೋಗಗಳು ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶದ ಕೊರತೆಗಳನ್ನು ಕ್ಷಣಗಳಲ್ಲಿ ಪತ್ತೆಹಚ್ಚಲು ಯಾವುದೇ ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        hero_btn_analyze: "AI ರೋಗನಿರ್ಣಯ ಪ್ರಾರಂಭಿಸಿ",
        hero_btn_market: "ಬೆಳೆ ಆರೈಕೆ ಸಲಹೆಗಳು",
        hero_btn_farmassist: "ಬೆಳೆ ಆರೈಕೆ ಸಲಹೆಗಳು",
        stat_profiles: "ರೋಗಕಾರಕ ಪ್ರೊಫೈಲ್‌ಗಳು",
        stat_crops: "ಬೆಂಬಲಿತ ಬೆಳೆಗಳು",
        stat_speed: "ವಿಶ್ಲೇಷಣಾ ವೇಗ",
        preview_scanner_active: "ನ್ಯೂರಲ್ ಸ್ಕ್ಯಾನರ್ ಸಕ್ರಿಯವಾಗಿದೆ",
        preview_match: "99.4% ಹೊಂದಾಣಿಕೆ",
        preview_sample_diag: "ಟೊಮೇಟೊ : ಅರ್ಲಿ ಬ್ಲೈಟ್ ಪತ್ತೆಯಾಗಿದೆ",
        preview_sample_desc: "ಎಲೆಯ ಕಲೆಗಳು ಪತ್ತೆಯಾಗಿವೆ. ತಾಮ್ರದ ಶಿಲೀಂಧ್ರನಾಶಕ ಮತ್ತು ಎಲೆ ಕತ್ತರಿಸುವಿಕೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",

        // Workflow Section
        workflow_subtitle: "ಸುಲಭ ಕಾರ್ಯವಿಧಾನ",
        workflow_title: "AI ರೋಗನಿರ್ಣಯ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
        workflow_desc: "ಫೋಟೋದಿಂದ ಚಿಕಿತ್ಸಾ ಯೋಜನೆಯವರೆಗೆ ಮೂರು ಸುಲಭ ಹಂತಗಳಲ್ಲಿ.",
        step1_title: "ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ",
        step1_desc: "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಮೊಬೈಲ್/ಕ್ಯಾಮೆರಾ ಬಳಸಿ ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ.",
        step2_title: "ಡೀಪ್ CNN ವಿಶ್ಲೇಷಣೆ",
        step2_desc: "ಕನ್ವಲ್ಯೂಷನಲ್ ನ್ಯೂರಲ್ ನೆಟ್‌ವರ್ಕ್ ಎಲೆಯ ಕಲೆಗಳು ಮತ್ತು ಶಿಲೀಂಧ್ರ ಮಾದರಿಗಳನ್ನು ನಿಖರವಾಗಿ ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
        step3_title: "ಚಿಕಿತ್ಸಾ ಪ್ರೋಟೋಕಾಲ್",
        step3_desc: "ತಕ್ಷಣದ ರೋಗ ವಿವರಣೆ, ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು ಮತ್ತು ನಿಖರ ಪರಿಹಾರಗಳನ್ನು ಪಡೆಯಿರಿ.",

        // Supported Crops
        crops_subtitle: "ವ್ಯಾಪಕ ಕೃಷಿ ವ್ಯಾಪ್ತಿ",
        crops_title: "ಬೆಂಬಲಿತ ಬೆಳೆಗಳು ಮತ್ತು ಹಣ್ಣುಗಳು",
        crops_desc: "ನಮ್ಮ ರೋಗನಿರ್ಣಯ ಮಾದರಿಗಳನ್ನು ಈ 14 ಕೃಷಿ ಪ್ರಭೇದಗಳ ಎಲೆಯ ಮಾದರಿಗಳ ಮೇಲೆ ವಿಶೇಷವಾಗಿ ತರಬೇತಿ ನೀಡಲಾಗಿದೆ.",
        crop_apple: "ಸೇಬು",
        crop_apple_sub: "ಸ್ಕ್ಯಾಬ್ • ಬ್ಲಾಕ್ ರಾಟ್ • ತುಕ್ಕು",
        crop_blueberry: "ಬ್ಲೂಬೆರ್ರಿ",
        crop_blueberry_sub: "ಎಲೆಗಳ ಆರೋಗ್ಯ ರೋಗನಿರ್ಣಯ",
        crop_banana: "ಬಾಳೆಹಣ್ಣು",
        crop_banana_sub: "ಬೂದಿ ರೋಗ (ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂ)",
        crop_corn: "ಜೋಳ (ಮೆಕ್ಕೆಜೋಳ)",
        crop_corn_sub: "ಬೂದು ಎಲೆ ಕಲೆ • ತುಕ್ಕು • ಬ್ಲೈಟ್",
        crop_grape: "ದ್ರಾಕ್ಷಿ",
        crop_grape_sub: "ಬ್ಲಾಕ್ ರಾಟ್ • ಎಸ್ಕಾ • ಎಲೆ ಬ್ಲೈಟ್",
        crop_orange: "ಕಿತ್ತಳೆ / ಸಿಟ್ರಸ್",
        crop_orange_sub: "ಹುವಾಂಗ್‌ಲಾಂಗ್‌ಬಿಂಗ್ (ಸಿಟ್ರಸ್ ಗ್ರೀನಿಂಗ್)",
        crop_peach: "ಪೀಚ್",
        crop_peach_sub: "ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಕಲೆ",
        crop_pepper: "ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ",
        crop_pepper_sub: "ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಕಲೆ • ಬೆಳವಣಿಗೆ",
        crop_potato: "ಆಲೂಗಡ್ಡೆ",
        crop_potato_sub: "ಅರ್ಲಿ ಬ್ಲೈಟ್ • ಲೇಟ್ ಬ್ಲೈಟ್",
        crop_raspberry: "ರಾಸ್ಪ್ಬೆರಿ",
        crop_raspberry_sub: "ಎಲೆಗಳ ಆರೋಗ್ಯ ಪರೀಕ್ಷೆ",
        crop_soybean: "ಸೋಯಾಬೀನ್",
        crop_soybean_sub: "ಬೆಳೆ ಆರೋಗ್ಯ ಮತ್ತು ಶುದ್ಧತೆ",
        crop_squash: "ಸೋರೆಕಾಯಿ / ಕುಂಬಳ",
        crop_squash_sub: "ಬೂದಿ ರೋಗ",
        crop_strawberry: "ಸ್ಟ್ರಾಬೆರಿ",
        crop_strawberry_sub: "ಎಲೆ ಸುಡುವ ರೋಗ • ಆರೋಗ್ಯ",
        crop_tomato: "ಟೊಮೇಟೊ",
        crop_tomato_sub: "10 ಪ್ರತ್ಯೇಕ ರೋಗಶಾಸ್ತ್ರೀಯ ಪ್ರೊಫೈಲ್‌ಗಳು",
        btn_diagnose_now: "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಈಗಲೇ ಪರೀಕ್ಷಿಸಿ",

        // Diagnostic Studio
        studio_header_badge: "ನ್ಯೂರಲ್ ವಿಷನ್ ಎಂಜಿನ್",
        studio_header_title: "ಸಸ್ಯ ಎಲೆ ರೋಗನಿರ್ಣಯ ಕೇಂದ್ರ",
        studio_header_desc: "ಸೋಂಕಿತ ಅಥವಾ ಸಂಶಯಾಸ್ಪದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ನಮ್ಮ AI ಮಾದರಿಯು 38 ರೋಗ ವರ್ಗಗಳ ವಿರುದ್ಧ ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
        dropzone_title: "ಎಲೆಯ ಮಾದರಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        dropzone_hint: "ನಿಮ್ಮ ಎಲೆಯ ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಅಥವಾ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
        btn_browse: "ಫೋಟೋಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        btn_camera: "ಲೈವ್ ಕ್ಯಾಮೆರಾ ಬಳಸಿ",
        btn_snap: "ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ",
        btn_cancel: "ರದ್ದುಮಾಡಿ",
        btn_run_diagnosis: "AI ರೋಗನಿರ್ಣಯ ನಡೆಸಿ",
        btn_voice_command: "ಧ್ವನಿ ಆಜ್ಞೆ",
        voice_listening_title: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
        voice_modal_hint: "ಆಜ್ಞೆ ಅಥವಾ ಹುಡುಕಾಟದ ಪದಗಳನ್ನು ಹೇಳಿ",
        voice_listening_transcript: "ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಈಗ ಮಾತನಾಡಿ",
        voice_chip_home: "ಮುಖಪುಟ",
        voice_chip_scan: "ಸ್ಕ್ಯಾನ್",
        voice_chip_remedies: "ಔಷಧಗಳು",
        voice_chip_camera: "ಕ್ಯಾಮೆರಾ",
        voice_err_denied: "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿಯನ್ನು ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ವಿಳಾಸ ಪಟ್ಟಿಯಲ್ಲಿ ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ.",
        voice_err_no_speech: "ಯಾವುದೇ ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮೈಕ್ರೊಫೋನ್‌ನಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ.",
        voice_err_network: "ನೆಟ್‌ವರ್ಕ್ ದೋಷ: ಧ್ವನಿ ಸೇವೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ.",
        voice_err_unsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು Chrome, Edge ಅಥವಾ Safari ಬಳಸಿ.",
        voice_btn_try_again: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
        voice_btn_cancel: "ರದ್ದುಮಾಡಿ",
        voice_search_dictate: "ಧ್ವನಿ ಹುಡುಕಾಟ",
        audio_report_title: "ಧ್ವನಿ ರೋಗನಿರ್ಣಯ ವರದಿ",
        audio_report_hint: "ನಿಮ್ಮ ಆಯ್ಕೆಯ ಭಾಷೆಯಲ್ಲಿ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳನ್ನು ಆಲಿಸಿ",
        btn_listen_report: "ವರದಿಯನ್ನು ಆಲಿಸಿ",
        scanning_title: "ಮಾದರಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
        scanning_subtitle: "38 ಡೀಪ್ ನ್ಯೂರಲ್ ರೋಗ ಮಾದರಿಗಳೊಂದಿಗೆ ಹೋಲಿಸಲಾಗುತ್ತಿದೆ",
        tips_title: "ಉತ್ತಮ ಫೋಟೋ ತೆಗೆಯುವ ಸಲಹೆಗಳು",
        tip1_title: "ನೈಸರ್ಗಿಕ ಬೆಳಕು",
        tip1_desc: "ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯಿರಿ. ನೆರಳು ಅಥವಾ ಬಲವಾದ ಫ್ಲ್ಯಾಶ್ ಪ್ರತಿಫಲನವನ್ನು ತಪ್ಪಿಸಿ.",
        tip2_title: "ಬಾಧಿತ ಭಾಗದ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ",
        tip2_desc: "ಎಲೆಯ ಕಲೆ ಅಥವಾ ರೋಗಲಕ್ಷಣಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವಂತೆ ಲೆನ್ಸ್ ಅನ್ನು ಫೋಕಸ್ ಮಾಡಿ.",
        tip3_title: "ಒಂದೇ ಎಲೆಯ ಮೇಲೆ ಗಮನವಿರಲಿ",
        tip3_desc: "ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಗೊಂದಲವಿಲ್ಲದೆ ಒಂದೇ ಎಲೆಯ ಮೇಲೆ ಗಮನವಿರಲಿ. ಗುಂಪಾಗಿರುವ ಎಲೆಗಳನ್ನು ತಪ್ಪಿಸಿ.",
        adv_title: "ಆರಂಭಿಕ ಪತ್ತೆಯ ಪ್ರಯೋಜನ",
        adv_desc: "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ರೋಗ ಪತ್ತೆಹಚ್ಚುವುದರಿಂದ ಬೆಳೆ ನಷ್ಟವನ್ನು ಗಣನೀಯವಾಗಿ ಕಡಿಮೆ ಮಾಡಬಹುದು ಮತ್ತು ರೋಗ ಹರಡುವ ಮೊದಲು ನಿಯಂತ್ರಿಸಬಹುದು.",

        // Diagnostic Results
        res_healthy_badge: "ಆರೋಗ್ಯಕರ ಮಾದರಿ ದೃಢಪಟ್ಟಿದೆ",
        res_diseased_badge: "ರೋಗಾಣು ಪತ್ತೆಯಾಗಿದೆ",
        res_bg_badge: "ಎಲೆ ರಹಿತ ಹಿನ್ನೆಲೆ",
        res_confidence_sub: "ನ್ಯೂರಲ್ ವರ್ಗೀಕರಣ ಸೂಚ್ಯಂಕ: #",
        res_btn_another: "ಮತ್ತೊಂದು ಎಲೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ",
        res_ref_title: "ಉಲ್ಲೇಖ ಮಾದರಿ",
        res_ref_desc: "ದಾಖಲಿತ ರೋಗ ಪರಿಶೀಲನಾ ಮಾದರಿ",
        res_nutrition_title: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಬೆಳೆ ಪೋಷಕಾಂಶ",
        res_treatment_title: "ಸೂಕ್ತ ಚಿಕಿತ್ಸಾ ಪರಿಹಾರ",
        res_view_product: "ಉತ್ಪನ್ನದ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
        res_symptom_overview: "ರೋಗಶಾಸ್ತ್ರ ಮತ್ತು ರೋಗಲಕ್ಷಣಗಳ ವಿವರಣೆ",
        res_health_overview: "ಬೆಳೆ ಆರೋಗ್ಯ ವಿವರ",
        res_management_title: "ನಿರ್ವಹಣಾ ಕ್ರಮಗಳು ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು",
        res_vigor_title: "ನಿರಂತರ ಬೆಳವಣಿಗೆಗೆ ಉತ್ತಮ ಪದ್ಧತಿಗಳು",
        res_advisory_title: "ಕೃಷಿ ಸಲಹೆ:",
        res_advisory_text: "ಔಷಧಿ ಸಿಂಪಡಿಸುವಾಗ ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣವನ್ನು ಅನುಸರಿಸಿ ಮತ್ತು ರೋಗ ನಿರೋಧಕತೆ ತಡೆಯಲು ಕಾಲಕಾಲಕ್ಕೆ ಸೂಕ್ತ ಪರಿಹಾರಗಳನ್ನು ಬದಲಾಯಿಸಿ.",

        // Treatment Market
        // FarmAssist Advisory
        market_badge: "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ",
        farmassist_badge: "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ",
        market_title: "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್: ಬೆಳೆ ಆರೈಕೆ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶಿ",
        farmassist_title: "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್: ಬೆಳೆ ಆರೈಕೆ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶಿ",
        market_desc: "ವಿವಿಧ ಎಲೆ ರೋಗಗಳಿಗೆ ತಜ್ಞರು ಶಿಫಾರಸು ಮಾಡಿದ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕಗಳು, ಪೋಷಕಾಂಶಗಳು ಮತ್ತು ಸಾವಯವ ಪರಿಹಾರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
        farmassist_desc: "ವಿವಿಧ ಎಲೆ ರೋಗಗಳಿಗೆ ತಜ್ಞರು ಶಿಫಾರಸು ಮಾಡಿದ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕಗಳು, ಪೋಷಕಾಂಶಗಳು ಮತ್ತು ಸಾವಯವ ಪರಿಹಾರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
        market_search_placeholder: "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್‌ನಲ್ಲಿ ರೋಗ, ಬೆಳೆ ಅಥವಾ ಚಿಕಿತ್ಸೆ ಹುಡುಕಿ...",
        farmassist_search_placeholder: "ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್‌ನಲ್ಲಿ ರೋಗ, ಬೆಳೆ ಅಥವಾ ಚಿಕಿತ್ಸೆ ಹುಡುಕಿ...",
        tab_all: "ಎಲ್ಲಾ ಪರಿಹಾರಗಳು",
        tab_healthy: "ಗೊಬ್ಬರಗಳು ಮತ್ತು ಪೋಷಕಾಂಶಗಳು",
        tab_diseased: "ರೋಗ ನಿವಾರಕಗಳು",
        target_label: "ಗುರಿ:",
        btn_buy: "ಪರಿಹಾರ ವಿವರ ವೀಕ್ಷಿಸಿ",
        no_products_title: "ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
        no_products_desc: "ನಿಮ್ಮ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ.",
        tag_nutrition: "ಬೆಳೆ ಪೋಷಕಾಂಶ",
        tag_treatment: "ರೋಗ ಚಿಕಿತ್ಸೆ",
        badge_healthy: "ಆರೋಗ್ಯಕರ",
        badge_remedy: "ಪರಿಹಾರ",

        // Support & FAQ Center
        contact_badge: "ಕೃಷಿ ಸಹಾಯವಾಣಿ",
        contact_title: "ಬೆಂಬಲ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ಕೇಂದ್ರ",
        contact_desc: "ರೋಗ ಗುರುತಿಸುವಿಕೆ, ಮಾದರಿಯ ನಿಖರತೆ ಅಥವಾ ಚಿಕಿತ್ಸಾ ವಿಧಾನಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಮ್ಮ FAQ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
        form_title: "ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ",
        form_subtitle: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಮಗೆ ಕಳುಹಿಸಿ.",
        form_name_label: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
        form_email_label: "ಇಮೇಲ್ ವಿಳಾಸ",
        form_topic_label: "ವಿಷಯ / ಬೆಳೆ ವರ್ಗ",
        form_select_placeholder: "ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ...",
        form_topic_acc: "ಮಾದರಿ ನಿಖರತೆ",
        form_topic_crops: "ಹೆಚ್ಚುವರಿ ಬೆಳೆ ವಿನಂತಿ",
        form_topic_treatment: "ಚಿಕಿತ್ಸೆ ಮತ್ತು ಪೋಷಕಾಂಶ ಸಲಹೆ",
        form_topic_tech: "ತಾಂತ್ರಿಕ ಬೆಂಬಲ",
        form_message_label: "ಸಂದೇಶ ವಿವರಗಳು",
        form_btn_submit: "ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ",
        form_success: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿಚಾರಣೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಮ್ಮ ಕೃಷಿ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ಪರಿಶೀಲಿಸುತ್ತದೆ.",
        faq_title: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು (FAQs)",
        faq1_q: "AI ರೋಗನಿರ್ಣಯ ಎಷ್ಟು ನಿಖರವಾಗಿದೆ?",
        faq1_a: "ನಮ್ಮ ಡೀಪ್ ಕನ್ವಲ್ಯೂಷನಲ್ ನ್ಯೂರಲ್ ನೆಟ್‌ವರ್ಕ್ 38 ಎಲೆ ರೋಗ ವರ್ಗಗಳಲ್ಲಿ 95% ನಿಖರತೆಯನ್ನು ಸಾಧಿಸುತ್ತದೆ.",
        faq2_q: "ಯಾವ ಗುಣಮಟ್ಟದ ಫೋಟೋ ಅಗತ್ಯವಿದೆ?",
        faq2_a: "ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ತೆಗೆದ ಸಾಮಾನ್ಯ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಫೋಟೋ ಸಾಕು. ಎಲೆಯ ಕಲೆಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಮತ್ತು ಫೋಕಸ್‌ನಲ್ಲಿರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
        faq3_q: "ಸಾವಯವ ಚಿಕಿತ್ಸಾ ಆಯ್ಕೆಗಳನ್ನು ನೀಡಲಾಗುತ್ತದೆಯೇ?",
        faq3_a: "ಹೌದು. ಪ್ರತಿಯೊಂದು ರೋಗಕ್ಕೂ ನೈಸರ್ಗಿಕ ನೈರ್ಮಲ್ಯ ವಿಧಾನಗಳು, ಜೈವಿಕ ನಿಯಂತ್ರಣ ಮತ್ತು ಸಾವಯವ ಶಿಲೀಂಧ್ರನಾಶಕ ಪರಿಹಾರಗಳನ್ನು ನೀಡಲಾಗುತ್ತದೆ.",
        faq4_q: "ಇದನ್ನು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಬಳಸಬಹುದೇ?",
        faq4_a: "ಮಾದರಿ ಫೈಲ್ ಒಮ್ಮೆ ಡೌನ್‌ಲೋಡ್ ಆದ ನಂತರ, ಯಾವುದೇ ಬಾಹ್ಯ ಇಂಟರ್ನೆಟ್ ಕರೆಗಳ ಅಗತ್ಯವಿಲ್ಲದೇ ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.",
        specs_title: "ನ್ಯೂರಲ್ ಎಂಜಿನ್ ವಿಶೇಷಣಗಳು",
        spec_arch: "ಆರ್ಕಿಟೆಕ್ಚರ್: 4-ಹಂತದ ಡೀಪ್ ಕನ್ವಲ್ಯೂಷನಲ್ ನೆಟ್‌ವರ್ಕ್",
        spec_res: "ಇನ್‌ಪುಟ್ ರೆಸಲ್ಯೂಶನ್: 224 × 224 RGB",
        spec_classes: "ರೋಗ ವರ್ಗಗಳು: 39 (38 ಎಲೆ ರೋಗಗಳು + 1 ಹಿನ್ನೆಲೆ)",
        spec_framework: "ಫ್ರೇಮ್‌ವರ್ಕ್: PyTorch • TorchVision",

        // Footer
        footer_desc: "ಬೆಳೆ ಇಳುವರಿಯನ್ನು ರಕ್ಷಿಸಲು ಮತ್ತು ಸುಸ್ಥಿರ ಕೃಷಿಯನ್ನು ಬೆಂಬಲಿಸಲು 38+ ಸಸ್ಯ ರೋಗಗಳು ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶದ ಕೊರತೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ AI ವೇದಿಕೆ.",
        footer_quick_links: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
        footer_diagnostics_title: "ಬೆಂಬಲಿತ ವೈಶಿಷ್ಟ್ಯಗಳು",
        footer_stat1: "ಕೃಷಿ ಬೆಳೆಗಳು",
        footer_stat2: "ರೋಗ ವರ್ಗಗಳು",
        footer_stat3: "ತ್ವರಿತ ಕೃಷಿ ಸಲಹೆಗಳು",
        footer_stat4: "ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ನಿಯಂತ್ರಣ",
        footer_copyright: "© 2026 ಫಾರ್ಮ್‌ಅಸಿಸ್ಟ್ (FarmAssist). ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
        footer_engine_tag: "AI ಆಧಾರಿತ ಕೃಷಿ • ಮಾದರಿ ಆರ್ಕಿಟೆಕ್ಚರ್: ಡೀಪ್ ಕನ್ವಲ್ಯೂಷನಲ್ ನ್ಯೂರಲ್ ನೆಟ್‌ವರ್ಕ್"
    },

    hi: {
        // Brand & Navigation
        brand_name: "फार्मअसिस्ट (FarmAssist)",
        brand_badge: "AI रोग निदान",
        nav_home: "मुख्य पृष्ठ",
        nav_engine: "AI इंजन",
        nav_market: "फसल देखभाल (Crop Care)",
        nav_farmassist: "फसल देखभाल (Crop Care)",
        nav_support: "सहायता और दिशानिर्देश",
        nav_scan_leaf: "पत्ती स्कैन करें",
        lang_select: "भाषा",

        // Hero Section
        hero_badge: "नेक्स्ट-जेन कंप्यूटर विज़न",
        hero_title_1: "फसल के रोगों का",
        hero_title_highlight: "AI द्वारा तुरंत पता लगाएं",
        hero_desc: "अपने ब्राउज़र में ही प्रयोगशाला-स्तरीय पादप विकृति विज्ञान के साथ अपनी फसल की रक्षा करें। फंगल संक्रमण, जीवाणु झुलसा और पोषण संबंधी कमियों का सेकंडों में पता लगाने के लिए किसी भी पत्ती का फोटो अपलोड करें।",
        hero_btn_analyze: "AI रोग निदान शुरू करें",
        hero_btn_market: "फसल देखभाल सलाह",
        hero_btn_farmassist: "फसल देखभाल सलाह",
        stat_profiles: "रोगजनक प्रोफाइल",
        stat_crops: "समर्थित फसलें",
        stat_speed: "विश्लेषण गति",
        preview_scanner_active: "न्यूरल स्कैनर सक्रिय",
        preview_match: "99.4% सटीक मिलान",
        preview_sample_diag: "टमाटर : अगेती झुलसा (अर्ली ब्लाइट) का पता चला",
        preview_sample_desc: "पत्ती पर धब्बे पाए गए। कॉपर फफूंदनाशी और संक्रमित पत्तियों की छंटाई की सलाह दी जाती है।",

        // Workflow Section
        workflow_subtitle: "सरल कार्यप्रवाह",
        workflow_title: "AI रोग निदान कैसे काम करता है",
        workflow_desc: "फोटो से उपचार योजना तक तीन सरल चरणों में।",
        step1_title: "पत्ती का फोटो लें",
        step1_desc: "उच्च गुणवत्ता वाला फोटो अपलोड करें या सीधे अपने मोबाइल या वेबकैम से फोटो खींचें।",
        step2_title: "डीप सीएनएन विश्लेषण",
        step2_desc: "कन्वोल्यूशनल न्यूरल नेटवर्क पत्तियों के घावों, रंग बदलने और फंगल लक्षणों का गहन विश्लेषण करता है।",
        step3_title: "उपचार प्रोटोकॉल",
        step3_desc: "तत्काल रोग विवरण, निवारक स्वच्छता उपाय और लक्षित सप्लीमेंट उपचार प्राप्त करें।",

        // Supported Crops
        crops_subtitle: "व्यापक कृषि कवरेज",
        crops_title: "समर्थित फसलें और फल",
        crops_desc: "हमारे नैदानिक ​​मॉडल विशेष रूप से इन 14 कृषि किस्मों के पत्तों के नमूनों पर प्रशिक्षित और सत्यापित हैं।",
        crop_apple: "सेब",
        crop_apple_sub: "स्कैब • ब्लैक रॉट • रस्ट (गेरुआ)",
        crop_blueberry: "ब्लूबेरी",
        crop_blueberry_sub: "पर्ण स्वास्थ्य निदान",
        crop_banana: "केला",
        crop_banana_sub: "चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
        crop_corn: "मक्का",
        crop_corn_sub: "ग्रे लीफ स्पॉट • रस्ट • ब्लाइट",
        crop_grape: "अंगूर",
        crop_grape_sub: "ब्लैक रॉट • एस्का • लीफ ब्लाइट",
        crop_orange: "संतरा / नींबू वर्गीय",
        crop_orange_sub: "हुआंगलोंगबिंग (सिट्रस ग्रीनिंग)",
        crop_peach: "आड़ू",
        crop_peach_sub: "जीवाणु धब्बा",
        crop_pepper: "शिमला मिर्च",
        crop_pepper_sub: "जीवाणु धब्बा • स्वास्थ्य",
        crop_potato: "आलू",
        crop_potato_sub: "अगेती झुलसा • पछेती झुलसा",
        crop_raspberry: "रसभरी",
        crop_raspberry_sub: "पर्ण स्वास्थ्य जांच",
        crop_soybean: "सोयाबीन",
        crop_soybean_sub: "फसल स्वास्थ्य और शुद्धता",
        crop_squash: "स्क्वैश / कद्दू",
        crop_squash_sub: "चूर्णिल आसिता",
        crop_strawberry: "स्ट्रॉबेरी",
        crop_strawberry_sub: "लीफ स्कॉर्च • स्वास्थ्य",
        crop_tomato: "टमाटर",
        crop_tomato_sub: "10 विशिष्ट विकृति प्रोफाइल",
        btn_diagnose_now: "अब अपनी फसल की जांच करें",

        // Diagnostic Studio
        studio_header_badge: "न्यूरल विज़न इंजन",
        studio_header_title: "पादप पत्ती रोग निदान स्टूडियो",
        studio_header_desc: "संक्रमित या संदिग्ध फसल पत्ती का स्पष्ट फोटो अपलोड करें। हमारा AI मॉडल 38 रोग श्रेणियों के विरुद्ध इसका विश्लेषण करता है।",
        dropzone_title: "पत्ती का नमूना अपलोड करें",
        dropzone_hint: "पत्ती का फोटो यहाँ खींचें या फ़ाइल चुनें",
        btn_browse: "फ़ोटो ब्राउज़ करें",
        btn_camera: "लाइव कैमरा उपयोग करें",
        btn_snap: "फोटो खींचें",
        btn_cancel: "रद्द करें",
        btn_run_diagnosis: "AI रोग निदान चलाएं",
        btn_voice_command: "आवाज़ आदेश",
        voice_listening_title: "सुना जा रहा है...",
        voice_modal_hint: "कोई आदेश या खोज शब्द बोलें",
        voice_listening_transcript: "सुना जा रहा है... अब बोलें",
        voice_chip_home: "होम",
        voice_chip_scan: "स्कैन",
        voice_chip_remedies: "उपचार",
        voice_chip_camera: "कैमरा",
        voice_err_denied: "माइक्रोफ़ोन अनुमति अस्वीकृत है। कृपया अपने ब्राउज़र के एड्रेस बार में माइक्रोफ़ोन की अनुमति दें।",
        voice_err_no_speech: "कोई आवाज़ नहीं सुनी गई। कृपया माइक्रोफ़ोन में स्पष्ट रूप से बोलें।",
        voice_err_network: "नेटवर्क त्रुटि: आवाज़ सेवा से संपर्क नहीं हो सका। कृपया इंटरनेट कनेक्शन जांचें।",
        voice_err_unsupported: "इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है। कृपया Chrome, Edge या Safari का उपयोग करें।",
        voice_btn_try_again: "पुनः प्रयास करें",
        voice_btn_cancel: "रद्द करें",
        voice_search_dictate: "आवाज़ खोज",
        audio_report_title: "ऑडियो रोग निदान रिपोर्ट",
        audio_report_hint: "अपनी चयनित भाषा में रोग निदान और निवारक उपायों को सुनें",
        btn_listen_report: "रिपोर्ट सुनें",
        scanning_title: "नमूने का विश्लेषण हो रहा है...",
        scanning_subtitle: "38 डीप न्यूरल रोग मॉडलों के साथ तुलना की जा रही है",
        tips_title: "सटीक फोटो लेने के टिप्स",
        tip1_title: "प्राकृतिक प्रकाश",
        tip1_desc: "प्राकृतिक रोशनी में फोटो लें। चमकदार पत्ती की सतहों पर तेज छाया या तेज फ्लैश से बचें।",
        tip2_title: "प्रभावित हिस्से पर फोकस करें",
        tip2_desc: "रोग के धब्बों या लक्षणों को केंद्र में रखकर स्पष्ट फोटो लें। लेंस फोकस सटीक रखें।",
        tip3_title: "एकल पत्ती का दृश्य",
        tip3_desc: "सादे या प्राकृतिक पृष्ठभूमि पर केवल एक ही पत्ती का फोटो लें। भीड़भाड़ से बचें।",
        adv_title: "प्रारंभिक पहचान का लाभ",
        adv_desc: "शुरुआती चरण में बीमारी की पहचान करने से फसल के नुकसान को काफी हद तक कम किया जा सकता है और रोग फैलने से पहले लक्षित उपचार संभव होता है।",

        // Diagnostic Results
        res_healthy_badge: "स्वस्थ नमूना सत्यापित",
        res_diseased_badge: "रोगजनक पाया गया",
        res_bg_badge: "गैर-पत्ती पृष्ठभूमि",
        res_confidence_sub: "न्यूरल वर्गीकरण सूचकांक: #",
        res_btn_another: "दूसरी पत्ती की जांच करें",
        res_ref_title: "संदर्भ नमूना",
        res_ref_desc: "संग्रहीत विकृति सत्यापन नमूना",
        res_nutrition_title: "अनुशंसित फसल पोषण",
        res_treatment_title: "लक्षित उपचार उपाय",
        res_view_product: "उत्पाद विवरण देखें",
        res_symptom_overview: "विकृति और लक्षणों का विवरण",
        res_health_overview: "फसल स्वास्थ्य विवरण",
        res_management_title: "प्रबंधन के उपाय और सावधानियां",
        res_vigor_title: "निरंतर विकास के लिए सर्वोत्तम अभ्यास",
        res_advisory_title: "कृषि सलाह:",
        res_advisory_text: "छिड़काव करते समय हमेशा अनुशंसित मात्रा का पालन करें और रोग प्रतिरोधक क्षमता से बचने के लिए दवाओं को बदलते रहें।",

        // Treatment Market
        // FarmAssist Advisory
        market_badge: "फार्मअसिस्ट कृषि गाइड",
        farmassist_badge: "फार्मअसिस्ट कृषि गाइड",
        market_title: "फार्मअसिस्ट: फसल देखभाल एवं उपचार गाइड",
        farmassist_title: "फार्मअसिस्ट: फसल देखभाल एवं उपचार गाइड",
        market_desc: "विशेषज्ञों द्वारा अनुशंसित जैव-कवकनाशी, पोषक तत्व और जैविक फसल देखभाल उपचार खोजें।",
        farmassist_desc: "विशेषज्ञों द्वारा अनुशंसित जैव-कवकनाशी, पोषक तत्व और जैविक फसल देखभाल उपचार खोजें।",
        market_search_placeholder: "फार्मअसिस्ट में रोग, फसल या उपचार विधि खोजें...",
        farmassist_search_placeholder: "फार्मअसिस्ट में रोग, फसल या उपचार विधि खोजें...",
        tab_all: "सभी उपचार",
        tab_healthy: "उर्वरक और पोषण",
        tab_diseased: "रोग उपचार",
        target_label: "लक्षित रोग:",
        btn_buy: "उपचार विवरण देखें",
        no_products_title: "कोई उत्पाद नहीं मिला",
        no_products_desc: "अपने कीवर्ड बदलने या श्रेणी फ़िल्टर हटाने का प्रयास करें।",
        tag_nutrition: "फसल पोषण",
        tag_treatment: "रोग उपचार",
        badge_healthy: "स्वस्थ",
        badge_remedy: "उपचार",

        // Support & FAQ Center
        contact_badge: "कृषि सहायता",
        contact_title: "सहायता और मार्गदर्शन केंद्र",
        contact_desc: "रोग की पहचान, मॉडल की सटीकता या उपचार विधियों के संबंध में कोई प्रश्न हैं? हमारी सहायता टीम और FAQ गाइड आपकी सेवा में हैं।",
        form_title: "पूछताछ भेजें",
        form_subtitle: "अपने प्रश्न या परिणाम पर प्रतिक्रिया भेजें।",
        form_name_label: "आपका पूरा नाम",
        form_email_label: "ईमेल पता",
        form_topic_label: "विषय / फसल श्रेणी",
        form_select_placeholder: "विषय चुनें...",
        form_topic_acc: "मॉडल सटीकता या गलत वर्गीकरण",
        form_topic_crops: "अतिरिक्त फसल का अनुरोध",
        form_topic_treatment: "उपचार और सप्लीमेंट सलाह",
        form_topic_tech: "तकनीकी सहायता / बग रिपोर्ट",
        form_message_label: "संदेश विवरण",
        form_btn_submit: "पूछताछ सबमिट करें",
        form_success: "धन्यवाद! आपकी पूछताछ प्राप्त हो गई है। हमारी कृषि टीम शीघ्र ही इसकी समीक्षा करेगी।",
        faq_title: "सामान्य प्रश्न (FAQs)",
        faq1_q: "AI रोग निदान कितना सटीक है?",
        faq1_a: "हमारा डीप कन्वोल्यूशनल न्यूरल नेटवर्क 38 विभिन्न पत्ती रोग श्रेणियों में 95% सटीकता प्राप्त करता है।",
        faq2_q: "किस गुणवत्ता के फोटो की आवश्यकता है?",
        faq2_a: "अच्छी रोशनी में साधारण स्मार्टफोन कैमरा पर्याप्त है। सुनिश्चित करें कि पत्ती और उसके धब्बे स्पष्ट रूप से दिखाई दे रहे हों।",
        faq3_q: "क्या जैविक उपचार विकल्प प्रदान किए जाते हैं?",
        faq3_a: "हाँ। प्रत्येक निदान में जैविक उपचार, प्राकृतिक स्वच्छता विधियां और जैविक कवकनाशी उपाय बताए जाते हैं।",
        faq4_q: "क्या इसे ऑफ़लाइन उपयोग किया जा सकता है?",
        faq4_a: "मॉडल फ़ाइल डाउनलोड होने के बाद, यह बाहरी क्लाउड इंटरनेट के बिना आपके कंप्यूटर पर सीधे काम कर सकता है।",
        specs_title: "न्यूरल इंजन विनिर्देश",
        spec_arch: "आर्किटेक्चर: 4-चरणीय डीप कन्वोल्यूशनल नेटवर्क",
        spec_res: "इनपुट रिज़ॉल्यूशन: 224 × 224 RGB",
        spec_classes: "रोग श्रेणियां: 39 (38 पत्ती रोग + 1 पृष्ठभूमि)",
        spec_framework: "फ़्रेमवर्क: PyTorch • TorchVision",

        // Footer
        footer_desc: "फसल की पैदावार की रक्षा और टिकाऊ कृषि को बढ़ावा देने के लिए 38+ पौधों के रोगों की पहचान करने हेतु विकसित AI प्लेटफ़ॉर्म।",
        footer_quick_links: "त्वरित नेविगेशन",
        footer_diagnostics_title: "समर्थित क्षमताएं",
        footer_stat1: "कृषि फसलें",
        footer_stat2: "रोग श्रेणियां",
        footer_stat3: "त्वरित कृषि सलाह",
        footer_stat4: "जैविक एवं प्राकृतिक नियंत्रण",
        footer_copyright: "© 2026 फार्मअसिस्ट (FarmAssist). सर्वाधिकार सुरक्षित।",
        footer_engine_tag: "AI आधारित कृषि • मॉडल आर्किटेक्चर: डीप कन्वोल्यूशनल न्यूरल नेटवर्क"
    }
};

/**
 * Applies the selected language to the entire document.
 * @param {string} lang - Language code ('en', 'kn', 'hi')
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        lang = 'en';
    }
    
    localStorage.setItem('farmassist_lang', lang);
    localStorage.setItem('flora_lang', lang);
    document.documentElement.lang = lang;

    const dict = translations[lang];

    // Update text content for all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (dict[key]) {
            element.textContent = dict[key];
        }
    });

    // Update placeholder for elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            element.setAttribute('placeholder', dict[key]);
        }
    });

    // Update active state on language switcher buttons if present
    document.querySelectorAll('.lang-opt-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const langCurrentLabel = document.getElementById('current-lang-label');
    if (langCurrentLabel) {
        if (lang === 'kn') langCurrentLabel.textContent = 'ಕನ್ನಡ';
        else if (lang === 'hi') langCurrentLabel.textContent = 'हिन्दी';
        else langCurrentLabel.textContent = 'English';
    }
}

// Initialize language on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('farmassist_lang') || localStorage.getItem('flora_lang') || 'en';
    setLanguage(savedLang);

    // Bind click events to language switch triggers
    document.querySelectorAll('.lang-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = btn.getAttribute('data-lang');
            setLanguage(targetLang);
        });
    });
});
