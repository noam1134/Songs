url = "https://localhost:7061/";
getAllSongs = url + "api/Songs/GetAllSongs";
getAllFavorites = url + "api/MusicUsers/GetFavorites?userId=";
addToFavorite = url + "api/MusicUsers/AddToFavorites?userId=";
getAllSongsApi = url + "api/Songs/GetAllSongs";
removeFromFavorites = url + "api/MusicUsers/RemoveFromFavorites?userId=";
getSongPop = url + "api/Songs/GetSongPopularityBySongId?songId=";
function clickHome() {
  localStorage.setItem("indicator", "home");
  whatToRender();
}
function clickFavorites() {
  localStorage.setItem("indicator", "favorites");
  whatToRender();
}

function whatToRender() {
  if (localStorage.getItem("indicator") == "favorites") {
    renderFavorites();
  } else if (localStorage.getItem("indicator") == "home") {
    renderAllSongs();
  }
}

function renderAllSongs() {
  if (localStorage.getItem("indicator") == "favorites") {
    renderFavorites();
    return;
  }

  document.getElementById("homeBtn").setAttribute("class", "active");
  document.getElementById("favBtn").setAttribute("class", "notActive");
  document.getElementById("searchBtn").setAttribute("class", "notActive");
  document.getElementById("artistsBtn").setAttribute("class", "notActive");
  document.getElementById("allSongs").innerHTML = "";
  document.getElementById("showing").innerHTML = "Showing All Songs";
  ajaxCall("GET", getAllSongs, "", GetAllSongsSuccess, ErrorGetAllSongs);
}

function ErrorGetAllSongs(error) {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Oops!\nCan't read all songs!",
    showConfirmButton: false,
    scrollbarPadding: false,
    timer: 2500,
  });
}

function renderFavorites() {
  document.getElementById("searchBtn").setAttribute("class", "notActive");
  document.getElementById("artistsBtn").setAttribute("class", "notActive");
  document.getElementById("favBtn").setAttribute("class", "active");
  document.getElementById("homeBtn").setAttribute("class", "notActive");
  document.getElementById("showing").innerHTML = "Showing All Favorite Songs";
  document.getElementById("allSongs").innerHTML = "";
  ajaxCall(
    "POST",
    getAllFavorites + JSON.parse(localStorage.getItem("user")).id,
    "",
    GetAllSongsSuccess,
    ErrorGetAllSongs
  );
}

function GetAllSongsSuccess(data) {
  allSongs = document.getElementById("allSongs");
  allSongs.innerHTML = "";
  data.forEach((song) => {
    allSongs.append(renderSong(song));
  });
}

function renderSong(song) {
  // Create the necessary elements
  const divCol = document.createElement("div");
  divCol.classList.add("col-xl-2", "col-lg-4", "col-md-6");

  const divGalleryItem = document.createElement("div");
  divGalleryItem.classList.add("gallery-item", "h-100");

  const img = document.createElement("img");
  img.src = "images/genericMusicPic.jpg";
  img.classList.add("img-fluid");
  img.alt = "";

  const songName = document.createElement("div");
  songName.innerHTML = song.songName + "<br/>By: " + song.artistName;

  songName.setAttribute("class", "songText");

  const divGalleryLinks = document.createElement("div");
  divGalleryLinks.classList.add(
    "gallery-links",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );
  divGalleryLinks.id = song.songId;

  infoDiv = document.createElement("div");
  infoDiv.className = "infoDiv";
  const imgInfo = document.createElement("img");
  infoDiv.setAttribute(
    "onclick",
    "searchVideo(`" + song.songName + " " + song.artistName + "`)"
  );

  imgInfo.setAttribute("class", "infoClass");
  imgInfo.src = "images/info.png";
  imgInfo.onclick = function () {
    event.stopPropagation();
    song = {
      songId: song.songId,
      name: song.songName,
      lyrics: song.lyrics,
      link: song.link,
      artistName: song.artistName,
    };
    localStorage.setItem("song", JSON.stringify(song));
    getSongPopularity();
  };
  infoDiv.appendChild(imgInfo);
  faveDiv = document.createElement("div");
  faveDiv.className = "faveDiv";
  const imgFavorite = document.createElement("img");
  imgFavorite.setAttribute("class", "favClass");
  imgFavorite.setAttribute("id", "song_" + song.songId);
  favoriteSongs = localStorage.getItem("favoriteSongs");
  if (favoriteSongs.includes(JSON.stringify(song))) {
    imgFavorite.src = "images/like.png";
  } else {
    imgFavorite.src = "images/disLike.png";
  }
  imgFavorite.setAttribute("onclick", "favoriteFunction(" + song.songId + ")");

  faveDiv.appendChild(imgFavorite);
  const iLink = document.createElement("i");
  iLink.classList.add("bi", "bi-link-45deg");

  imgFavorite.appendChild(iLink);

  // Append the elements to their respective parents
  infoDiv.appendChild(faveDiv);
  divGalleryLinks.appendChild(infoDiv);

  divGalleryItem.appendChild(img);
  infoDiv.appendChild(songName);
  divGalleryItem.appendChild(divGalleryLinks);

  divCol.appendChild(divGalleryItem);

  // Append the resulting structure to the desired parent element
  return divCol;
}

function favoriteFunction(songId) {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  var songElement = document.getElementById("song_" + songId);
  var songSrc = songElement.src;
  var fileName = songSrc.substring(songSrc.lastIndexOf("/") + 1);

  if (fileName == "like.png") {
    removeFavorite(userId, songId);
    setTimeout(updateFavorites, 200);
  }
  if (fileName == "disLike.png") {
    addFavorite(userId, songId);
    setTimeout(updateFavorites, 200);
  }
  event.stopPropagation();
}
function removeFavorite(userId, songId) {
  ajaxCall(
    "POST",
    removeFromFavorites + userId + "&songId=" + songId,
    "",
    songRemoved(songId),
    songNotRemoved
  );
}

function addFavorite(userId, songId) {
  ajaxCall(
    "POST",
    addToFavorite + userId + "&songId=" + songId,
    "",
    AddSongToFavoriteSuccess(songId),
    AddSongToFavoriteFailed
  );
}
function AddSongToFavoriteSuccess(songId) {
  document
    .getElementById("song_" + songId)
    .setAttribute("src", "images/like.png");
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Song added to favorites!",
    showConfirmButton: false,
    scrollbarPadding: false,
    heightAuto: false,
    timer: 2500,
  });
}
function AddSongToFavoriteFailed(error) {
  console.log(error);
}
function songRemoved(songId) {
  document
    .getElementById("song_" + songId)
    .setAttribute("src", "images/disLike.png");
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Song removed from favorites!",
    showConfirmButton: false,
    scrollbarPadding: false,
    heightAuto: false,
    timer: 2500,
  });
}

function songNotRemoved() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Song not removed from favorites!",
    showConfirmButton: false,
    scrollbarPadding: false,
    heightAuto: false,
    timer: 2500,
  });
}

function updateFavorites() {
  ajaxCall(
    "POST",
    getAllFavorites + JSON.parse(localStorage.getItem("user")).id,
    "",
    successSaveAllFavoritesCB,
    errorSaveAllFavoritesCB
  );
}
function successSaveAllFavoritesCB(data) {
  localStorage.setItem("favoriteSongs", JSON.stringify(data));
  console.log(data.length);
}
function errorSaveAllFavoritesCB(error) {
  console.log(error);
}

function getSongPopularity() {
  songId = JSON.parse(localStorage.getItem("song")).songId;
  ajaxCall(
    "GET",
    getSongPop + songId,
    "",
    gotSongPopularity,
    errorSongPopularity
  );
}

function gotSongPopularity(data) {
  song = JSON.parse(localStorage.getItem("song"));
  Swal.fire({
    title: song.name,
    html:
      "Song popularity: " +
      data +
      "<br>" +
      "Lyrics:<br>" +
      song.lyrics.replace(/\n/g, "<br>") +
      "\n",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Info about " + song.artistName,
    cancelButtonText: "Close Info",
    showCloseButton: true,
    scrollbarPadding: false,
  }).then((result) => {
    if (result.isConfirmed) {
      // Handle the action when "Show More Info" is clicked
      window.open("about.html", "_self");
    }
  });
}
function errorSongPopularity(error) {
  console.log(error);
}
