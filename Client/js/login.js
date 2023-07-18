const api = "https://localhost:7061/api";
$(document).ready(function () {
  $("#signin-form").submit(function (e) {
    ajaxCall(
      "POST",
      api +
        "/MusicUsers/LogIn?emailOrUserNameToLogin=" +
        $("#email").val() +
        "&passwordToLogin=" +
        $("#pass").val(),
      "",
      successLoginCB,
      errorLoginCB
    );
    e.preventDefault();
  });
});
function successLoginCB(data) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Welcome back!",
    showConfirmButton: false,
    timer: 2500,
  });

  saveUserData(data); // Pass the data as an argument to the saveUserData function

  // Delay the redirect by 1.5 seconds
  setTimeout(function () {
    window.open("index.html", "_self");
  }, 1000);
}

function saveUserData(data) {
  console.log(data);
  localStorage.setItem("user", JSON.stringify(data));
}

function errorLoginCB(error) {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Oops! something went wrong!\nCheck the details please!",
    showConfirmButton: false,
    timer: 2500,
  });
}
