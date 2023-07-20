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

  //console.log(songName);
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

  imgInfo.setAttribute("class", "infoClass");
  imgInfo.src = "images/info.png";
  imgInfo.onclick = function () {
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
  favoriteSongs = localStorage.getItem("favoriteSongs");
  if (favoriteSongs.includes(JSON.stringify(song))) {
    imgFavorite.src = "images/like.png";
  } else {
    imgFavorite.src = "images/disLike.png";
  }

  imgFavorite.onclick = function () {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    localStorage.setItem("song", JSON.stringify(song));
    ajaxCall(
      "POST",
      addToFavorite + userId + "&songId=" + song.songId,
      "",
      AddSongToFavoriteSuccess,
      AddSongToFavoriteFailed
    );
  };

  function AddSongToFavoriteSuccess(data) {
    updateFavorites();
    imgFavorite.src = "images/like.png";
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
    ajaxCall(
      "POST",
      removeFromFavorites +
        JSON.parse(localStorage.getItem("user")).id +
        "&songId=" +
        JSON.parse(localStorage.getItem("song")).songId,
      "",
      songRemoved,
      songNotRemoved
    );
    function songRemoved() {
      updateFavorites();
      imgFavorite.src = "images/disLike.png";
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
    console.log(data);
    localStorage.setItem("favoriteSongs", JSON.stringify(data));
  }
  function errorSaveAllFavoritesCB(error) {
    console.log(error);
  }

  faveDiv.appendChild(imgFavorite);
  const iLink = document.createElement("i");
  iLink.classList.add("bi", "bi-link-45deg");

  imgFavorite.appendChild(iLink);

  // Append the elements to their respective parents
  divGalleryLinks.appendChild(infoDiv);
  divGalleryLinks.appendChild(faveDiv);

  //divGalleryLinks.appendChild(imgFavorite);

  divGalleryItem.appendChild(img);
  divGalleryItem.appendChild(songName);
  divGalleryItem.appendChild(divGalleryLinks);

  divCol.appendChild(divGalleryItem);

  // Append the resulting structure to the desired parent element
  const parentElement = document.getElementById("parent-element-id");
  return divCol;
}

function getSongPopularity() {
  songId = JSON.parse(localStorage.getItem("song")).songId;
  console.log(songId);
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
