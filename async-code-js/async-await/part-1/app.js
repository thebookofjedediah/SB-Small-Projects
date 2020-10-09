let baseURL = "http://numbersapi.com";
let favoriteNumber = 19;


// 1.
async function getFavoriteNumber() {
    let res = await axios.get(`${baseURL}/${favoriteNumber}?json`)
    console.log(res.data);
}
getFavoriteNumber()
  
// 2.
async function getMultipleNumbers() {
    let favNumbers = [7,4,19]
    let res = await axios.get(`${baseURL}/${favNumbers}?json`)
    console.log(res.data)
}
getMultipleNumbers()
  
// 3.
async function getFourFacts() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favoriteNumber}?json`))
    )
    console.log(facts)
    facts.forEach((fact) => {
        $('body').append(`<p>${fact.data.text}</p>`);
    })
}
getFourFacts()
