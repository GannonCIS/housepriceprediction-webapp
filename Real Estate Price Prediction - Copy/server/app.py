from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, origins=["http://localhost:5000"])
@app.route("/")

def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    Area = data["sqft"]
    bhk = data["bhk"]
    resale = data["resale"]
    pool = data["pool"]
    jog_track = data["jog"]
    location = data["location"]
    x = np.zeros(5)
    x[0] = Area
    x[1] = bhk
    x[2] = resale
    x[3] = pool
    x[4] = jog_track
    
    print(x)
    if location == 1:
        # Load the pre-trained machine learning model from a pickle file
        classifier = pickle.load(open('./artifacts/model_pkl_delhi', 'rb'))
    elif location == 2:
        classifier = pickle.load(open('./artifacts/model_pkl_hyd', 'rb'))
    elif location == 3:
        classifier = pickle.load(open('./artifacts/model_pkl_mumbai', 'rb'))
    elif location == 4:
        classifier = pickle.load(open('./artifacts/model_pkl_blr', 'rb'))
    # Use the pre-trained model to make a prediction
    prediction = classifier.predict([x])[0]
    print(prediction)
    # Return the prediction as a JSON response
    return jsonify({"prediction": int(prediction/80)})

if __name__ == "__main__":
    app.run(debug=True)
