const fs = require('fs');
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log("Error", err)
            return;
        }
        console.log("YOUR FILE SAYS: ", data)
    })
}


async function webCat(url) {
    let res = await axios.get(url)
    console.log(res)
}

let argument = process.argv[2]

if (argument.slice(0,4) === "http") {
    webCat(argument)
} else {
    cat(argument)
}

