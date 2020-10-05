let baseURL = "http://numbersapi.com";
let favoriteNumber = 19;


// 1.
$.getJSON(`${baseURL}/${favoriteNumber}?json`).then(data => {
    console.log(data);
  });
  
  // 2.
  let favNumbers = [7, 11, 22];
  $.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
    console.log(data);
  });
  
  // 3.
  Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${baseURL}/${favoriteNumber}?json`);
    })
  ).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
  });