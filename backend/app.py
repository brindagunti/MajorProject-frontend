# from flask import Flask, render_template, request
# import numpy as np
# import pickle
# import speech_recognition as sr
# import wikipedia
# app = Flask(__name__)

# # Load trained model and symptom list
# model = pickle.load(open('model/disease_model.pkl', 'rb'))
# symptom_list = pickle.load(open('model/symptom_list.pkl', 'rb'))

# # Optional disease descriptions
# disease_info = {
#     "Fungal infection": "Fungal infections affect the skin, nails or respiratory tract.",
#     "Allergy": "Allergies are hypersensitive immune responses to allergens.",
#     # Add more...
# }

# @app.route('/')
# def index():
#     return render_template('index.html', symptoms=symptom_list)

# @app.route('/predict', methods=['POST'])
# def predict():
#     selected_symptoms = request.form.getlist('symptoms')
#     input_vector = [1 if symptom in selected_symptoms else 0 for symptom in symptom_list]
#     prediction = model.predict([input_vector])[0]
#     confidence = max(model.predict_proba([input_vector])[0]) * 100
#     try:
#         # Wikipedia sometimes can't find exact matches, so you can tweak the search term if needed
#         info = wikipedia.summary(prediction, sentences=2, auto_suggest=False)
#     except wikipedia.exceptions.DisambiguationError as e:
#         # If multiple pages match, pick the first option
#         info = wikipedia.summary(e.options[0], sentences=2)
#     except wikipedia.exceptions.PageError:
#         info = "No Wikipedia page found for this disease."
#     except Exception as ex:
#         info = "An error occurred while retrieving information."
#     return render_template('result.html', disease=prediction, confidence=round(confidence, 2), info=info)

# @app.route('/voice_input')
# def voice_input():
#     recognizer = sr.Recognizer()
#     mic = sr.Microphone()
#     with mic as source:
#         recognizer.adjust_for_ambient_noise(source)
#         print("Listening...")
#         audio = recognizer.listen(source)
#     try:
#         text = recognizer.recognize_google(audio).lower()
#         matched = [s for s in symptom_list if s.replace("_", " ") in text]
#         return {"symptoms": matched}
#     except:
#         return {"error": "Voice recognition failed."}

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
import numpy as np
import pickle
import speech_recognition as sr
import wikipedia
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Load trained model and symptom list
model = pickle.load(open('model/disease_model.pkl', 'rb'))
symptom_list = pickle.load(open('model/symptom_list.pkl', 'rb'))

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify(symptom_list.tolist())

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    selected_symptoms = data.get("symptoms", [])
    
    input_vector = [1 if symptom in selected_symptoms else 0 for symptom in symptom_list]
    prediction = model.predict([input_vector])[0]
    confidence = max(model.predict_proba([input_vector])[0]) * 100
    
    try:
        info = wikipedia.summary(prediction, sentences=2, auto_suggest=False)
    except:
        info = "Information not available."

    return jsonify({
        "disease": prediction,
        "confidence": round(confidence, 2),
        "info": info
    })

if __name__ == "__main__":
    app.run(debug=True)
