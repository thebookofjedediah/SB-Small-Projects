let gifList = document.querySelector('#gifList');
let searchInput = document.querySelector('#search');
let searchForm = document.querySelector('form');


searchForm.addEventListener('submit', async function(e){
    e.preventDefault();
    let searchValue = searchInput.value;
    searchInput.value = "";
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchValue,
      api_key: "q0lfGgu0xxz8PrmLuTlU5ZLCeXUILS6t",
      limit: 1
    }
  });
  appendGif(res.data);
})

function appendGif(gifs) {
    let newGif = document.createElement('IMG');
    newGif.src = gifs.data[0].images.original.url;
    gifList.append(newGif);
}

// getGif("funny");