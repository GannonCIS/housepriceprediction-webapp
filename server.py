from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.errorhandler(404)
def not_found(error):
    response = jsonify({
        'error': 'Not found'
    })
    response.status_code = 404
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()  # Populate locations to the frontend
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_home_price', methods=['GET', 'POST'])

def predict_home_price():
        sqft = float(request.form['Area'])
        location = request.form['location']
        bhk = int(request.form['No. of Bedrooms'])
        resale = int(request.form['Resale'])
        pool = int(request.form['SwimmingPool'])
        jog_track = int(request.form['JoggingTrack'])

        
        response = jsonify({
            'estimated_price': util.get_estimated_price(location, sqft, bhk, resale, pool, jog_track)
        })
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response
    


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()
