const api = "https://proj.ruppin.ac.il/cgroup16/test2/tar1/";
const loginURL = api + "api/MusicUsers/LogIn?emailOrUserNameToLogin=";
const getAllFavorites = api + "api/MusicUsers/GetFavorites?userId=";
$(document).ready(function () {
  $("#signin-form").submit(function (e) {
    logIn();
    e.preventDefault();
  });
});
function successLoginCB(data) {
  localStorage.setItem("indicator", "home");
  //add all favorites songs to chach
  ajaxCall(
    "POST",
    getAllFavorites + data.id,
    "",
    successSaveAllFavoritesCB,
    errorSaveAllFavoritesCB
  );
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Welcome back!",
    showConfirmButton: false,
    scrollbarPadding: false,
    heightAuto: false,
    timer: 2500,
  });
  saveUserData(data); // Pass the data as an argument to the saveUserData function
  // Delay the redirect by 1.5 seconds
  setTimeout(function () {
    window.open("index.html", "_self");
  }, 1000);
}
function successSaveAllFavoritesCB(data) {
  console.log(data);
  localStorage.setItem("favoriteSongs", JSON.stringify(data));
}
function errorSaveAllFavoritesCB(error) {
  console.log(error);
}
