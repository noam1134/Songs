function homeAll() {
  localStorage.setItem("indicator", "home");
  window.open("index.html", "_self");
}

function homeFavorites() {
  localStorage.setItem("indicator", "favorites");
  window.open("index.html", "_self");
}
function logOut() {
  localStorage.removeItem("user");
  window.open("login.html", "_self");
}
function clickHome() {
  localStorage.setItem("indicator", "home");
  whatToRender();
}
function clickFavorites() {
  localStorage.setItem("indicator", "favorites");
  whatToRender();
}
function logIn() {
  ajaxCall(
    "POST",
    loginURL + $("#email").val() + "&passwordToLogin=" + $("#pass").val(),
    "",
    successLoginCB,
    errorLoginCB
  );
}
function errorLoginCB(error) {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Oops! something went wrong!\nCheck the details please!",
    showConfirmButton: false,
    scrollbarPadding: false,
    heightAuto: false,
    timer: 2500,
  });
}

function saveUserData(data) {
  console.log(data);
  localStorage.setItem("user", JSON.stringify(data));
}
