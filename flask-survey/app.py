from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config["SECRET_KEY"] = "hihihi333"
debug = DebugToolbarExtension(app)

@app.route('/')
def get_home():
    return render_template('home.html')
