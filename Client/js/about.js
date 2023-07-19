var artist;
var song;

url = "https://localhost:7061/";
getArtistInfoByName = url + "api/Artists/GetArtistInfoByName?artistName=";
getAllSongsOfArtist = url + "api/Songs/GetAllSongsByArtistName?artistName=";

$(document).ready(function () {
  song = JSON.parse(localStorage.getItem("song"));
  artist = JSON.parse(localStorage.getItem("song")).artistName;
  renderArtistInfo();
  document.getElementById("popularity").innerHTML = artist.popularity;
});

function renderArtistInfo() {
  link = document.getElementById("linkToLyricsFreak");
  link.setAttribute(
    "href",
    "https://www.lyricsfreak.com/" + song.link.split("/").slice(1, 3).join("/")
  );
  link.setAttribute("target", "_blank");
  getArtistInfo();
  getLastFMInfo();
  getAllSongsByArtist();
}

function getAllSongsByArtist() {
  ajaxCall(
    "GET",
    getAllSongsOfArtist + artist,
    "",
    gotAllSongsCB,
    errorAllSongsCB
  );
}
var swiper;

function gotAllSongsCB(data) {
  var counter = 1;
  document.getElementById("songsInDb").innerHTML = data.length;
  data.forEach((song) => {
    // Create the main container div
    var containerDiv = document.createElement("div");
    containerDiv.className = "swiper-slide";
    containerDiv.setAttribute("role", "group");
    containerDiv.setAttribute("aria-label", "3 / 5");
    containerDiv.style.width = "696px";
    containerDiv.style.marginRight = "40px";
    containerDiv.setAttribute("data-swiper-slide-index", counter);
    counter++;
    // Create the testimonial item div
    var testimonialItemDiv = document.createElement("div");
    testimonialItemDiv.className = "testimonial-item";

    testimonialItemDiv.setAttribute(
      "style",
      "background-image: url('images/genericMusicPic.jpg')"
    );

    // Create the paragraph element
    var paragraph = document.createElement("p");
    paragraph.setAttribute("class", "songText");

    paragraph.textContent = song.songName;

    // Create the profile div
    var profileDiv = document.createElement("div");
    profileDiv.className = "profile mt-auto";

    // Create the image element
    var image = document.createElement("img");
    image.src = "assets/img/testimonials/testimonials-3.jpg";
    image.className = "testimonial-img";
    image.alt = "";

    // Create the h3 element for the name
    var nameHeading = document.createElement("h3");
    nameHeading.textContent = song.artistName;

    // Append all the elements in the appropriate hierarchy
    profileDiv.appendChild(image);
    profileDiv.appendChild(nameHeading);

    testimonialItemDiv.appendChild(paragraph);
    testimonialItemDiv.appendChild(profileDiv);

    containerDiv.appendChild(testimonialItemDiv);

    // Add the container div to the document body or any other desired parent element
    var divWrapper = document.getElementById("allSongs");
    divWrapper.appendChild(containerDiv);
  });
}

function errorAllSongsCB(error) {
  console.log(error);
}

function getArtistInfo() {
  ajaxCall(
    "GET",
    getArtistInfoByName + artist,
    "",
    gotArtistInfoCB,
    errorArtistInfoCB
  );
}

function gotArtistInfoCB(data) {
  document.getElementById("popularity").innerHTML = data.popularity;
  document.getElementById("aboutArtist").innerHTML += data.name;
  console.log(data);
}
function errorArtistInfoCB(error) {
  console.log("failed to get info " + error);
}

function getLastFMInfo() {
  const apiKey = "645890a09eebe9cd0d7bce90c41ff1f1";
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
      artist
    )}&api_key=${apiKey}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      const artistInfo = data.artist;

      if (artistInfo.stats && artistInfo.stats.playcount) {
        const playCount = artistInfo.stats.playcount;
        console.log(artistInfo.stats.playcount);
        document.getElementById("playCount").innerHTML = `${playCount}`;
      } else {
        document.getElementById("playCount").innerHTML =
          "Play count data not available.";
      }

      if (artistInfo.stats && artistInfo.stats.listeners) {
        const listeners = artistInfo.stats.listeners;
        console.log(artistInfo.stats.listeners);
        document.getElementById("listeners").innerHTML = `${listeners}`;
      } else {
        document.getElementById("listeners").innerHTML =
          "Listeners data not available.";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      const playCountContainer = document.getElementById("playCountContainer");
      playCountContainer.innerHTML =
        "Error fetching data. Please try again later.";
    });
}