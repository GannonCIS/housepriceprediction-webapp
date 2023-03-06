import plotly.express as px
import pandas as pd
from flask_cors import CORS
import pickle
import numpy as np
from functools import wraps
from pprint import pprint

from flask import Flask, request, jsonify, render_template, redirect, url_for, make_response

from helpers.auth import get_token, verify_token, expire_token, create_user, confirm_user, forgot_password, confirm_forgot_password

app = Flask(__name__, template_folder='templates', static_url_path='/static')

# CORS(app)
CORS(app, origins=[
     "http://ec2-35-78-242-82.ap-northeast-1.compute.amazonaws.com:8080/"])


def private():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            logged_in = verify_token(request.cookies.get('authToken'))
            if logged_in:
                return fn(*args, **kwargs)
            else:
                return redirect(url_for('login'))

        return decorator

    return wrapper


def public():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            logged_in = verify_token(request.cookies.get('authToken'))
            if logged_in:
                return redirect(url_for('index'))
            else:
                return fn(*args, **kwargs)

        return decorator

    return wrapper


@app.route("/forgot", methods=["GET", "POST"])
@public()
def forgot():
    if request.method == "POST":
        email = request.form.get("email")
        code = request.form.get("code")
        password = request.form.get("password")
        if code and password:
            try:
                confirm_forgot_password(email, password, code)
                return redirect(url_for('login'))
            except Exception as e:
                try:
                    error = str(e).split(':')[1]
                    return render_template('forgot.html', error=error, code=True)
                except:
                    return render_template('forgot.html', error=e, code=True)

        try:
            forgot_password(email)
            return render_template('forgot.html', code=True)

        except Exception as e:
            try:
                error = str(e).split(':')[1]
                return render_template('forgot.html', error=error)
            except:
                return render_template('forgot.html', error=e)

    return render_template("forgot.html")


@app.route("/verify", methods=["GET", "POST"])
@public()
def verify():
    if request.method == "POST":
        email = request.form.get("email")
        code = request.form.get("code")
        try:
            confirm_user(email, code)
            return redirect(url_for('login'))

        except Exception as e:
            try:
                error = str(e).split(':')[1]
                return render_template('verify.html', error=error)
            except:
                return render_template('verify.html', error=e)

    return render_template("verify.html")


@app.route("/register", methods=["GET", "POST"])
@public()
def register():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        try:
            create_user(email, password)
            return redirect(url_for('login'))

        except Exception as e:
            try:
                error = str(e).split(':')[1]

                return render_template('register.html', error=error)
            except:
                return render_template('register.html', error=e)

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
@public()
def login():

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        try:
            access_token = get_token(email, password)['AccessToken']
            resp = make_response(redirect(url_for('index')))
            resp.set_cookie('authToken', access_token, httponly=True)
            return resp
        except Exception as e:
            try:
                error = str(e).split(':')[1]
                if 'UserNotConfirmedException' in str(e):
                    return render_template('login.html', error=error, verify=True)
                return render_template('login.html', error=error)
            except:
                return render_template('login.html', error=e)

    return render_template("login.html")


@app.route("/logout")
def logout():
    token = request.cookies.get('authToken')
    expire_token(token)
    resp = make_response(redirect(url_for('login')))
    resp.set_cookie('authToken', '', expires=0, httponly=True)
    return resp


@app.route("/")
@private()
def index():

    return render_template("index.html")


@app.route("/predict", methods=["POST"])
@private()
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
        classifier = pickle.load(open('data/model_pkl_delhi', 'rb'))
    elif location == 2:
        classifier = pickle.load(open('data/model_pkl_hyd', 'rb'))
    elif location == 3:
        classifier = pickle.load(open('data/model_pkl_mumbai', 'rb'))
    elif location == 4:
        classifier = pickle.load(open('data/model_pkl_blr', 'rb'))
    # Use the pre-trained model to make a prediction

    prediction = classifier.predict([x])[0]
    print(prediction)
    # Return the prediction as a JSON response
    return jsonify({"prediction": int(prediction/80)})


@app.route("/countplot/<int:location>")
@private()
def countplot(location):
    try:
        location = int(location)
        if location == 1:
            data = pd.read_csv("data/Delhi.csv")
        elif location == 2:
            data = pd.read_csv("data/Hyderabad.csv")
        elif location == 3:
            data = pd.read_csv("data/Mumbai.csv")
        elif location == 4:
            data = pd.read_csv("data/Bangalore.csv")
        # Add additional elif clauses for other locations here
        else:
            return "Invalid location"
    except Exception as e:
        return f"An error occurred: {str(e)}"
    #data = pd.read_csv("Bangalore.csv")
    # Plot the countplot using Plotly
    #data = pd.read_csv("Bangalore.csv")
    # Plot the countplot using Plotly
    top_10_new = data[data["Resale"] == 0].groupby(
        "Location").size().reset_index(name="Count").nlargest(10, "Count")
    top_10_resale = data[data["Resale"] == 1].groupby(
        "Location").size().reset_index(name="Count").nlargest(10, "Count")

    fig = px.bar(top_10_new, x="Count", y="Location",
                 color="Location", title="Count of New Properties")
    fig2 = px.bar(top_10_resale, x="Count", y="Location",
                  color="Location", title="Count of Resale Properties")

    fig3 = px.scatter(data, x="No. of Bedrooms", y="Price",
                      color="Location", title="Number of Bedrooms vs Price")
    fig4 = px.scatter(data, x="Area", y="Price", color="Location",
                      title="Area in square feet vs Price")
    return render_template("graph.html", plot=fig.to_html(full_html=False), plot2=fig2.to_html(full_html=False), plot3=fig3.to_html(full_html=False), plot4=fig4.to_html(full_html=False))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
