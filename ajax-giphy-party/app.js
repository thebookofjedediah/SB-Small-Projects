console.log("Let's get this party started!");
let gifList = document.querySelector('#gifList');

async function getGif(search) {
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: search,
      api_key: "q0lfGgu0xxz8PrmLuTlU5ZLCeXUILS6t",
      limit: 1
    }
  });
  appendGif(res.data);
}

function appendGif(gifs) {
    let newGif = document.createElement('IMG');
    newGif.src = gifs.data[0].images.original.url;
    gifList.append(newGif);
}

getGif("funny");