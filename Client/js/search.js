var url = "https://localhost:7061/";
const fullUrl = url + "api/Songs/";
const showing = document.getElementById("showing");
function searchClick() {
  Swal.fire({
    title: "What do you want to search by?",
    showDenyButton: true,
    confirmButtonText: "Search",
    denyButtonText: "Cancel",
    showCloseButton: true,
    html: `<div class="swal2-radio">
            <input type="radio" id="searchByArtist" name="searchOption" checked="checked" value="GetAllSongsByArtistName?artistName=">
            <label for="searchByArtist">Search by Artist Name</label>
          </div>
          <div class="swal2-radio">
            <input type="radio" id="searchBySong" name="searchOption" value="GetSongsByName?songName=">
            <label for="searchBySong">Search by Song Name</label>
          </div>
          <div class="swal2-radio">
            <input type="radio" id="searchByLyrics" name="searchOption" value="GetAllSongsByLyrics?lyrics=">
            <label for="searchByLyrics">Search by Song Lyrics</label>
          </div>
          <input type="text" id="swal-input1" class="swal2-input" placeholder="Enter your search...">
          `,
    showLoaderOnConfirm: true,
    scrollbarPadding: false,
    heightAuto: false,
    preConfirm: () => {
      document.getElementById("homeBtn").setAttribute("class", "notActive");
      document.getElementById("favBtn").setAttribute("class", "notActive");
      document.getElementById("searchBtn").setAttribute("class", "active");
      return new Promise((resolve) => {
        const searchOption = document.querySelector(
          'input[name="searchOption"]:checked'
        ).value;
        const searchValue = document.getElementById("swal-input1").value;
        switch (searchOption) {
          case "GetAllSongsByArtistName?artistName=":
            showing.innerHTML = "Showing all songs by Artist: " + searchValue;
            break;
          case "GetSongsByName?songName=":
            showing.innerHTML = "Showing all songs by name: " + searchValue;
            break;
          case "GetAllSongsByLyrics?lyrics=":
            showing.innerHTML =
              "Showing all songs that contain the words: " + searchValue;
            break;
          default:
            break;
        }

        console.log(`Searching by ${searchOption}: ${searchValue}`);
        ajaxCall(
          "GET",
          fullUrl + searchOption + searchValue,
          "",
          GetAllSongsSuccess,
          ErrorGetSong
        );
        resolve();
      });
    },
  });
}

function ErrorGetSong(error) {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Oops!\nSongs not found!",
    showConfirmButton: false,
    timer: 2500,
  });
  allSongs = document.getElementById("allSongs");
  allSongs.innerHTML = "";
  showing.innerHTML = "No songs found";
}
