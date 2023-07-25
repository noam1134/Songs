let term = "";

function ajaxCall(method, api, data, successCB, errorCB) {
  // Make an AJAX call using jQuery's $.ajax method
  $.ajax({
    type: method,
    url: api,
    data: data,
    cache: false,
    contentType: "application/json",
    dataType: "json",
    success: successCB,
    error: errorCB,
  });
}

const updateTerm = () => {
  term = document.getElementById("searchTerm").value;
  // check term exists
  if (!term || term === "") {
    alert("Please enter a search term");
  } else {
    const url = `https://api.music.apple.com/v1/catalog/us/search?types=song,album,artist&term=${encodeURIComponent(
      term
    )}`;

    // Rest of the code remains unchanged...

    const songContainer = document.getElementById("songs");
    while (songContainer.firstChild) {
      songContainer.removeChild(songContainer.firstChild);
    }

    // Use the ajaxCall function to fetch data from iTunes API
    ajaxCall(
      "GET",
      url,
      {},
      (data) => {
        console.log(data);
        const artists = data.results;
        artists.map((result) => {
          // Now create Html Element

          const article = document.createElement("article"),
            artist = document.createElement("p"),
            song = document.createElement("h4"),
            img = document.createElement("img"),
            audio = document.createElement("audio"),
            audioSource = document.createElement("source");

          // Now put content

          artist.innerHTML = result.artistName;
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          audioSource.src = result.previewUrl;
          audio.controls = true;

          article.appendChild(img);
          article.appendChild(artist);
          article.appendChild(song);
          article.appendChild(audio);
          audio.appendChild(audioSource);

          songContainer.appendChild(article);
        });
      },
      (error) => console.log("Request failed:", error)
    );
  }
};

const searchBtn = document.getElementById("searchTermBtn");
searchBtn.addEventListener("click", updateTerm);

document.addEventListener(
  "play",
  (event) => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
      if (audio[i] != event.target) {
        audio[i].pause();
      }
    }
  },
  true
);
function search() {
  ajaxCall(
    "GET",
    "https://api.music.apple.com/v1/catalog/us/search?term=pop&types=songs",
    "",
    s,
    e
  );
}
function s(data) {
  console.log(data);
}
function e(data) {
  console.log(data);
}
search();
