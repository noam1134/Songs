url = "https://localhost:7061/";
getAllSongs = url + "api/Songs/GetAllSongs";
getAllFavorites = url + "api/MusicUsers/GetFavorites?userId=";
addToFavorite = url + "api/MusicUsers/AddToFavorites?userId=";
getAllSongsApi = url + "api/Songs/GetAllSongs";
updateUser = url + "api/MusicUsers/UpdateUserDetails";
removeFromFavorites = url + "api/MusicUsers/RemoveFromFavorites?userId=";

var favoriteID;

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
      id: song.songId,
      name: song.songName,
      lyrics: song.lyrics,
      link: song.link,
      artistName: song.artistName,
    };
    localStorage.setItem("song", JSON.stringify(song));
    Swal.fire({
      title: JSON.parse(localStorage.getItem("song")).name,
      html: "Lyrics:<br>" + song.lyrics.replace(/\n/g, "<br>") + "\n",
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
  };
  infoDiv.appendChild(imgInfo);
  faveDiv = document.createElement("div");
  faveDiv.className = "faveDiv";
  const imgFavorite = document.createElement("img");
  imgFavorite.setAttribute("class", "favClass");
  //imgFavorite.setAttribute("id", "song_" + song.songId);
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
