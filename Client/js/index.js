url = "https://localhost:7061/";
addToFavorite = url + "api/MusicUsers/AddToFavorites?userId=";
getAllSongsApi = url + "api/Songs/GetAllSongs";
updateUser = url + "api/MusicUsers/UpdateUserDetails";

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
  divCol.classList.add("col-xl-2", "col-lg-4", "col-md-6");

  const divGalleryItem = document.createElement("div");
  divGalleryItem.classList.add("gallery-item", "h-100");

  const img = document.createElement("img");
  img.src = "images/genericMusicPic.jpg";
  img.classList.add("img-fluid");
  img.alt = "";
  getArtistNameById(song);

  const songName = document.createElement("div");
  songName.innerHTML = song.songName;

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
      id: song.songId,
      name: song.songName,
      lyrics: song.lyrics,
      link: song.link,
      artistId: song.artistId,
    };
    localStorage.setItem("song", JSON.stringify(song));
  };
  infoDiv.appendChild(imgInfo);

  faveDiv = document.createElement("div");
  faveDiv.className = "faveDiv";
  const imgFavorite = document.createElement("img");
  imgFavorite.setAttribute("class", "favClass");
  imgFavorite.src = "images/like.png";
  imgFavorite.onclick = function () {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    ajaxCall(
      "POST",
      addToFavorite + userId + "&songId=" + song.songId,
      "",
      AddSongToFavoriteSuccess,
      AddSongToFavoriteFailed
    );
  };

  function AddSongToFavoriteSuccess(data) {
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
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Song is already in favorites!",
      showConfirmButton: false,
      scrollbarPadding: false,
      heightAuto: false,
      timer: 2500,
    });
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

function logOut() {
  localStorage.removeItem("user");
  window.open("login.html", "_self");
}
var user;
function showDetails() {
  var firstName;
  var lastName;
  var email;
  var phone;
  var userName;
  var password;
  Swal.fire({
    title: "Update User Details",
    html:
      "<table>Please fill in all fields" +
      '<tr><td>First Name:</td><td><input id="changeFirstName" class="swal2-input" placeholder="First Name..."></td></tr>' +
      '<tr><td>Last Name:</td><td><input id="changeLastName" class="swal2-input" placeholder="Last Name..."></td></tr>' +
      '<tr><td>Email:</td><td><input id="changeEmail" class="swal2-input" placeholder="Email..."></td></tr>' +
      '<tr><td>Phone Number:</td><td><input id="changePhoneNumber" class="swal2-input" placeholder="Phone Number..."></td></tr>' +
      '<tr><td>User Name:</td><td><input id="changeUserName" class="swal2-input" placeholder="User Name..."></td></tr>' +
      '<tr><td>Password:</td><td><input id="changePassword" class="swal2-input" placeholder="Password..."></td></tr>' +
      "</table>",
    focusConfirm: false,
    preConfirm: () => {
      var errorMsg = "";
      firstName = Swal.getPopup()
        .querySelector("#changeFirstName")
        .value.trim();
      lastName = Swal.getPopup().querySelector("#changeLastName").value.trim();
      email = Swal.getPopup().querySelector("#changeEmail").value.trim();
      phone = Swal.getPopup().querySelector("#changePhoneNumber").value.trim();
      userName = Swal.getPopup().querySelector("#changeUserName").value.trim();
      password = Swal.getPopup().querySelector("#changePassword").value.trim();

      if (email !== "" && !isValidEmail(email)) {
        errorMsg += "Please enter a valid email address</br>";
      }
      if (phone !== "" && !isValidPhoneNumber(phone)) {
        errorMsg += "Please enter a valid phone number</br>";
      }
      if (
        email == "" ||
        password == "" ||
        phone == "" ||
        lastName == "" ||
        firstName == "" ||
        userName == ""
      ) {
        errorMsg = "Please fill in all fields";
      }

      // Display error message if there is one
      if (errorMsg !== "") {
        Swal.showValidationMessage(errorMsg);
        return false;
      }

      return {
        id: JSON.parse(localStorage.getItem("user")).id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        userName: userName,
        password: password,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      user = {
        id: JSON.parse(localStorage.getItem("user")).id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        userName: userName,
        password: password,
      };
      ajaxCall(
        "POST",
        updateUser,
        JSON.stringify(user),
        updateSuccess,
        updateFail
      );
      console.log(result.value);
    }
  });
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate the phone number format
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phoneNumber);
  }
  function updateSuccess(data) {
    localStorage.setItem("user", JSON.stringify(user));
    Swal.fire("User Updated!", "", "success");
    document.getElementById("userFirstName").innerHTML = user.firstName;
  }
  function updateFail(error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email/UserName already taken.",
    });
  }
}
