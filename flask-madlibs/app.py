from flask import Flask, request, render_template
from stories import story_one, story_two, story_three
from random import choice
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config["SECRET_KEY"] = "hihihi333"
debug = DebugToolbarExtension(app)

story_options = [story_one, story_two, story_three]

story = choice(story_options)

@app.route('/')
def get_form():
    prompts = story.prompts
    return render_template('form.html', prompts=prompts)

@app.route('/story')
def get_story():
    text = story.generate(request.args)
    return render_template("story.html", text=text)
