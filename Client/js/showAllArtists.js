url = "https://localhost:7061/";
const getAllArtistsAPI = url + "api/Artists/GetAllArtists";

let currentPage = 1;
const artistsPerPage = 10; // Number of artists to display per page

function getAllArtists() {
  ajaxCall("GET", getAllArtistsAPI, "", gotAllArtists, errorAllArtists);
}

function gotAllArtists(data) {
  localStorage.setItem("artists", JSON.stringify(data));
  const artists = JSON.parse(localStorage.getItem("artists"));
  console.log(artists);

  // Calculate the total number of pages
  const totalPages = Math.ceil(artists.length / artistsPerPage);

  // Get the artists to display on the current page
  const startIndex = (currentPage - 1) * artistsPerPage;
  const endIndex = startIndex + artistsPerPage;
  const artistsToDisplay = artists.slice(startIndex, endIndex);

  let htmlContent = ""; // Initialize the string to hold the HTML content

  artistsToDisplay.forEach((artist) => {
    // Add each button to the string with an HTML line break
    htmlContent +=
      '<button class="artistBtn" id="' +
      artist.name +
      '">' +
      artist.name +
      "</button><br>";
  });

  // Add pagination buttons to the modal content
  htmlContent += '<div class="pagination">';
  if (currentPage > 1) {
    htmlContent +=
      '<button class="prevBtn" onclick="goToPage(' +
      (currentPage - 1) +
      ')">Previous</button>';
  }
  if (currentPage < totalPages) {
    htmlContent +=
      '<button class="nextBtn" onclick="goToPage(' +
      (currentPage + 1) +
      ')">Next</button>';
  }
  htmlContent += "</div>";

  Swal.fire({
    title: "All Artists in Database",
    html: htmlContent, // Use the generated string as the content of the Swal modal
    showCloseButton: true,
    showConfirmButton: false,
  });

  artistsToDisplay.forEach((artist) => {
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

// Function to handle pagination
function goToPage(pageNumber) {
  currentPage = pageNumber;
  getAllArtists(); // Reload the artists with the new page number
}

