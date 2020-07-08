// 1. 
8
1864

// 2.
{
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
}

// 3. 
"Your name is Alejandro and you like green"
"Your name is Melissa and you like green"
"Your name is undefined and you like green"

// 1.  
"Maya"
"Marisa"
"Chi"

// 2.
"Raindrops on roses"
"whiskers on kittens"
{
    "Bright copper kettles",
    "warm woolen mittens",
    "Brown paper packages tied up with strings"
}

// 3.
10, 30, 20

// refactoring

let {numbers: { a, b } } = obj;

[1, 2] = [2, 1]

let raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest});