function renderAllSongs() {
  //GET ALL SONGS WITH AJAXCALL
}

function GetAllSongsSuccess(data) {
  data.forEach((song) => {
    allSongs = document.getElementById("allSongs");
    allsongs.append(renderSong(song));
  });
}

function renderSong(song) {
   '<div class="col-xl-3 col-lg-4 col-md-6">' +
     '<div class="gallery-item h-100">' +
     '<img src="' +
     "images/genericMusicPic.jpg" +
     '" class="img-fluid" alt="">' +
     '<div class="gallery-links d-flex align-items-center justify-content-center">' +
     '<a href="' +
     imageData.src +
     '" title="' +
     imageData.title +
     '" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>' +
     '<a href="gallery-single.html" class="details-link"><i class="bi bi-link-45deg"></i></a>' +
     "</div>" +
     "</div>" +
     "</div>"; 
}
