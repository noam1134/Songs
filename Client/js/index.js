url = "https://localhost:7061/";
getAllSongsApi = url + "api/Songs/GetAllSongs";

function renderAllSongs() {
  console.log("shalom");
  ajaxCall(
    "GET",
    "https://localhost:7061/api/Songs/GetAllSongs",
    "",
    GetAllSongsSuccess,
    ErrorGetAllSongs
  );
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

function GetAllSongsSuccess(data) {
  console.log(data);
  allSongs = document.getElementById("allSongs");
  data.forEach((song) => {
    allSongs.append(renderSong(song));
  });
}

function getArtistNameById(song) {
  ajaxCall(
    "GET",
    getArtistNameByIdApi + song.artistId,
    "",
    getArtistSuccess,
    getArtistError
  );
}

getArtistNameByIdApi = url + "api/Artists/GetArtistById?artistId=";

var artistName;
function getArtistSuccess(data) {
  artistName = data.name;
  console.log(artistName);
}
function getArtistError(error) {
  console.log(error);
}

function renderSong(song) {
  // Create the necessary elements
  const divCol = document.createElement("div");
  divCol.classList.add("col-xl-3", "col-lg-4", "col-md-6");

  const divGalleryItem = document.createElement("div");
  divGalleryItem.classList.add("gallery-item", "h-100");

  const img = document.createElement("img");
  img.src = "images/genericMusicPic.jpg";
  img.classList.add("img-fluid");
  img.alt = "";
  getArtistNameById(song);

  const songName = document.createElement("div");
  setTimeout(somethings, 50);
  function somethings() {
    songName.innerHTML =
      "Song Name: " + song.songName + "</br>By: " + artistName;
  }

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
    alert("hi! " + song.songId);
  };
  infoDiv.appendChild(imgInfo);

  faveDiv = document.createElement("div");
  faveDiv.className = "faveDiv";
  const imgFavorite = document.createElement("img");
  imgFavorite.setAttribute("class", "favClass");
  imgFavorite.src = "images/like.png";
  imgFavorite.onclick = function () {
    alert("shalom! " + song.songId);
  };

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
