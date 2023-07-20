url = "https://localhost:7061/";

const getAllArtistsAPI = url + "api/Artists/GetAllArtists";

function getAllArtists() {
  ajaxCall("GET", getAllArtistsAPI, "", gotAllArtists, errorAllArtists);
}
function gotAllArtists(data) {
  localStorage.setItem("artists", JSON.stringify(data));
  const artists = JSON.parse(localStorage.getItem("artists"));
  console.log(artists);

  let htmlContent = ""; // Initialize the string to hold the HTML content

  artists.forEach((artist) => {
    // Add each button to the string with an HTML line break
    htmlContent +=
      '<button class="artistBtn" id="' +
      artist.name +
      '">' +
      artist.name +
      "</button><br>";
  });

  Swal.fire({
    title: "Artist Details",
    html: htmlContent, // Use the generated string as the content of the Swal modal
    showCloseButton: true,
    showConfirmButton: false,
  });

  artists.forEach((artist) => {
    // Set onclick for each button after the SweetAlert2 modal is shown
    document.getElementById(artist.name).onclick = function () {
      song = {
        artistName: artist.name,
      };
      localStorage.setItem("song", JSON.stringify(song));
      window.open("about.html", "_self");
    };
  });
}
function errorAllArtists(error) {
  console.log(error);
}
