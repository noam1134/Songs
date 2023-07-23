url = "https://localhost:7061/";
const getLeaderBoard = url + "api/MusicUsers/GetTopFiveScoreBoard";
const getUserScoresURL = url + "api/MusicUsers/GetUserScores?userId=";
var userId = JSON.parse(localStorage.getItem("user")).id;
function startQuiz() {
  Swal.fire({
    title: "Your highest score: ",
    html: '<button class="quizBtn" id="play-now-btn">Play now!</button><br><button class="quizBtn" id="leaderboard-btn" onclick="getLeaderBoardData()">Show leaderboard!</button>',
    showConfirmButton: false,
    allowOutsideClick: false,
    showCloseButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Game Started!", "Have fun playing the game!", "success");
    } else if (result.isDismissed) {
      // Handle the modal being closed without clicking the buttons (e.g., clicking outside the modal)
      console.log("Modal closed without clicking buttons.");
    }
  });
  console.log(getUserScoresURL);
  getUserScores();
}
const leaderboardBtn = document.getElementById("leaderboard-btn");
const playNowBtn = document.getElementById("play-now-btn");

function getLeaderBoardData() {
  ajaxCall(
    "GET",
    getLeaderBoard,
    "",
    successGetLeaderBoardCB,
    faliedGetLeaderBoardCB
  );
}

function successGetLeaderBoardCB(data) {
  var containAllLeaderBoard = "";
  var i = 1;
  data.forEach((userScore) => {
    containAllLeaderBoard +=
      `<div style="display: flex; width:80%; margin:auto; text-align: center; justify-content: space-between; margin-bottom: 5px;">` +
      `<span style="text-align: left;">` +
      i +
      ". " +
      userScore.userName +
      `</span>` +
      `<span style="text-align: center;">.........................................................</span>` +
      `<span style="text-align: right;">` +
      userScore.userScore +
      `</span></div>`;
    i++;
  });
  console.log(containAllLeaderBoard);
  Swal.fire({
    title: "Leaderboard:",
    html: containAllLeaderBoard,
    icon: "info",
  });
}

function faliedGetLeaderBoardCB(error) {
  console.log(error);
}

playNowBtn.addEventListener("click", function () {
  Swal.fire("Game Started!", "Have fun playing the game!", "success");
});

function getUserScores() {
  ajaxCall("GET", getUserScoresURL + userId, "", gotScores, errorScores);
}
function gotScores(data) {
  document.getElementById("swal2-title").innerHTML += data[0].userScore;
}

function errorScores(data) {
  document.getElementById("swal2-title").innerHTML = "NA";
}
