# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def add_func():
    a = int(request.args["a"])
    b = int(request.args["b"])
    added = add(a,b)
    return str(added)

@app.route('/mult')
def mult_func():
    a = int(request.args["a"])
    b = int(request.args["b"])
    multiplied = mult(a,b)
    return str(multiplied)

@app.route('/sub')
def sub_func():
    a = int(request.args["a"])
    b = int(request.args["b"])
    subbed = sub(a,b)
    return str(subbed)

@app.route('/div')
def div_func():
    a = int(request.args["a"])
    b = int(request.args["b"])
    divided = div(a,b)
    return str(divided)

#Start failed test here

operators = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route("/math/<oper>")
def do_math(oper):
    """Do math on a and b."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = operators[oper](a, b)

    return str(result)
