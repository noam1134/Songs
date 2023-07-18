const api = "https://localhost:7061/api";
var user;
$(document).ready(function () {
  $("#signup-form").submit(function (e) {
    e.preventDefault();

    // Get the form values
    const userName = $("#userName").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const email = $("#email").val();
    const phoneNumber = $("#phone").val();
    const password = $("#pass").val();

    // Perform validations
    if (userName.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter a valid user name",
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
        timer: 2500,
      });
      return;
    }

    if (firstName.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter a valid first name",
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
        timer: 2500,
      });
      return;
    }

    if (lastName.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter a vali last name",
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
        timer: 2500,
      });
      return;
    }

    if (email.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter a valid email address",
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
        timer: 2500,
      });
      return;
    } else if (!validateEmail(email)) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter a valid email address.",
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
        timer: 2500,
      });
      return;
    }

    if (phoneNumber.trim() === "") {
      alert("Please enter your phone number.");
      return;
    } else if (!validatePhoneNumber(phoneNumber)) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter a valid 10-digit phone number...",
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
        timer: 2500,
      });
      return;
    }

    if (password.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter a password...",
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
        timer: 2500,
      });
      return;
    }
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
  Swal.fire({
    position: "center",
    icon: "success",
    title: "User added successfully!",
    showConfirmButton: false,
    scrollbarPadding: false,
    heightAuto: false,
    timer: 2500,
  });

  saveUserData();

  // Delay the redirect by 1.5 seconds

  setTimeout(function () {
    window.open("index.html", "_self");
  }, 1000);
}

function errorRegisterCB(error) {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "A user with that username/email already exists!",
    showConfirmButton: false,
    scrollbarPadding: false,
    heightAuto: false,
    timer: 2500,
  });
}

function saveUserData() {
  console.log(user);
  localStorage.setItem("user", JSON.stringify(user));
}
