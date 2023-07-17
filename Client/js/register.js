const api = "https://localhost:7061/api";
$(document).ready(function () {
  $("#signup-form").submit(function (e) {
    user = {
      // Id:parseInt($("#userId").val()),
      firstName: String($("#firstName").val()),
      lastName: String($("#lastName").val()),
      email: String($("#email").val()),
      password: String($("#pass").val()),
      phone: String($("#phone").val()),
      userName: String($("#userName").val()),
    };
    ajaxCall(
      "POST",
      api + "/MusicUsers/Registration",
      JSON.stringify(user),
      successRegisterCB,
      errorRegisterCB
    );
    e.preventDefault();
  });
});
function successRegisterCB(data) {
  alert("Success " + data);
  console.log("Success " + data);
}
function errorRegisterCB(error) {
  alert("Fail " + error);
  console.log("Success " + error);
}
