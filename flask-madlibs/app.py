from flask import Flask, request, render_template
from stories import story
# from random import randint, choice, sample
# from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

# app.config["SECRET_KEY"] = "hihihi333"
# debug = DebugToolbarExtension(app)

@app.route('/')
def get_form():
    return render_template('form.html')

@app.route('/story')
def get_story():
    return render_template("story.html")
