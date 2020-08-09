from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)

responses = []

app.config["SECRET_KEY"] = "hihihi333"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route('/')
def get_home():
    return render_template('home.html', survey=survey)

@app.route("/start", methods=["POST"])
def start_survey():
    responses.clear()
    return redirect("/questions/0")

@app.route("/questions/<int:qid>")
def show_question(qid):
    """Display current question."""

    if (responses is None):
        # trying to access question page too soon
        return redirect("/")

    if (len(responses) == len(survey.questions)):
        # They've answered all the questions! Thank them.
        return redirect("/complete")

    if (len(responses) != qid):
        # Trying to access questions out of order.
        flash(f"Invalid question id: {qid}.")
        return redirect(f"/questions/{len(responses)}")

    question = survey.questions[qid]
    return render_template(
        "question.html", question_num=qid, question=question)

@app.route("/answer", methods=["POST"])
def handle_question():
    """Save response and redirect to next question."""

    # get the response choice
    choice = request.form['answer']
    print(choice)

    # add this response to the session
    responses.append(choice)
    print(responses)

    if (len(responses) == len(survey.questions)):
        # They've answered all the questions! Thank them.

        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")

@app.route("/complete")
def complete():
    """Survey complete. Show completion page."""

    return render_template("completed.html")