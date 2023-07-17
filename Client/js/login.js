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
function successLoginCB(data){
    alert("Success "+data)
    console.log("Success "+data);
}
function errorLoginCB(error){
    alert("Fail "+error)
    console.log("Success "+error);
}
