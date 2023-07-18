url = "https://localhost:7061/";
getAllSongsApi = "";

function renderAllSongs() {
  //GET ALL SONGS WITH AJAXCALL
  ajaxCall("GET", getAllSongsApi, "", GetAllSongsSuccess, ErrorGetAllSongs);
}

function ErrorGetAllSongs(error) {
  console.log(error);
}

function GetAllSongsSuccess(data) {
  allSongs = document.getElementById("allSongs");
  data.forEach((song) => {
    allsongs.append(renderSong(song));
  });
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

  const songName = document.createElement("div");
  songName.innerHTML = song.songName;
  songName.setAttribute("class", "bi bi-arrows-angle-expand");

  const divGalleryLinks = document.createElement("div");
  divGalleryLinks.classList.add(
    "gallery-links",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );
  divGalleryLinks.id = song.songId;

  //bi bi-arrows-angle-expand

  const a = document.createElement("img");
  a.src = "images/about.jpg";
  a.classList.add("glightbox", "preview-link");

  const iExpand = document.createElement("i");
  iExpand.classList.add("bi", "bi-arrows-angle-expand");
  a.appendChild(iExpand);

  const imgFavorite = document.createElement("img");
  imgFavorite.src = "images/favorite.jpg";
  imgFavorite.classList.add("details-link");
  imgFavorite.onclick = function () {
    addToFavorite(song.songId);
  };

  const iLink = document.createElement("i");
  iLink.classList.add("bi", "bi-link-45deg");

  imgFavorite.appendChild(iLink);

  // Append the elements to their respective parents
  divGalleryLinks.appendChild(a);
  divGalleryLinks.appendChild(imgFavorite);

  divGalleryItem.appendChild(img);
  divGalleryItem.appendChild(songName);
  divGalleryItem.appendChild(divGalleryLinks);

  divCol.appendChild(divGalleryItem);

  // Append the resulting structure to the desired parent element
  const parentElement = document.getElementById("parent-element-id");
  parentElement.appendChild(divCol);
}

// '<div class="col-xl-3 col-lg-4 col-md-6">' +
//   '<div class="gallery-item h-100">' +
//   '<img src="' +
//   "images/genericMusicPic.jpg" +
//   '" class="img-fluid" alt="">' +
//   '<div class="gallery-links d-flex align-items-center justify-content-center" id = "' +
//   song.songId +
//   '">' +
//   '<a href="' +
//   "link-to-about" +
//   '" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>' +
//   '<img src="images/favorite.jpg" onclick = "addToFavorite(' +
//   song.songId +
//   ')" class="details-link"><i class="bi bi-link-45deg"></i></img>' +
//   "</div>" +
//   "</div>" +
//   "</div>";
