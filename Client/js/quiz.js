url = "https://localhost:7061/";
const getLeaderBoard = url + "api/MusicUsers/GetTopFiveScoreBoard";
const getAllTheSongs = url + "api/Songs/GetAllSongs";
const getUserScoresURL = url + "api/MusicUsers/GetUserScores?userId=";
var userId = JSON.parse(localStorage.getItem("user")).id;
function openQuizPage() {
  Swal.fire({
    title: "Your highest score: ",
    html: '<button class="quizBtn" id="play-now-btn" onclick="startGame()">Play now!</button><br><button class="quizBtn" id="leaderboard-btn" onclick="getLeaderBoardData()">Show leaderboard!</button>',
    showConfirmButton: false,
    allowOutsideClick: false,
    showCloseButton: true,
    scrollbarPadding: false,
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
      `<div class="dotsFather" style="display: flex; width:80%; margin:auto; text-align: center; justify-content: space-between; margin-bottom: 5px;">` +
      `<span style="text-align: left;">` +
      i +
      ". " +
      userScore.userName +
      `</span>` +
      `<span class="dots"></span>` +
      `<span style="text-align: right;">` +
      userScore.userScore +
      `</span></div>`;
    i++;
  });

  // Add the "Back" button to the content
  containAllLeaderBoard += `<button class="quizBtn" onclick="openQuizPage()" style="margin: 20px auto; display: block;">Back</button>`;

  console.log(containAllLeaderBoard);

  Swal.fire({
    title: "Top 5 - Leaderboard:",
    html: containAllLeaderBoard,
    icon: "info",
    showConfirmButton: false,
    scrollbarPadding: false, // Set this to false to remove the OK button
  });
}

function faliedGetLeaderBoardCB(error) {
  console.log(error);
}

// function startGame() {
//     ajaxCall("GET", getAllTheSongs, "", gotAllSongsCB, errorGotAllSongs);
// }

function getUserScores() {
  ajaxCall("GET", getUserScoresURL + userId, "", gotScores, errorScores);
}
function gotScores(data) {
  console.log(data);
  document.getElementById("swal2-title").innerHTML += data[0].userScore;
}

function errorScores(data) {
  document.getElementById("swal2-title").innerHTML = "CYKA";
}

// Step 2: Create a function to show the custom modal
function startGame() {
  Swal.fire({
    title: "Custom Modal",
    html: "",
    scrollbarPadding: false,
  });

  // Step 3: Call the function to show the custom modal when needed
  // For example, you can trigger the modal using a button click event
  const btnShowModal = document.getElementById("btnShowModal");
  btnShowModal.addEventListener("click", showCustomModal);
}
var score = 0;
var qCount = 0;
function generateQuestion() {
  questionTypeNumber = Math.floor(Math.random() * 5) + 1;
  switch (randomNum) {
    case 1:
      //who wrote the song?
      whoWroteTheSong();
      break;
    case 2:
      //which song is the longest?
      whichSongIsTheLongest();
      break;
    case 3:
      //which artist has the most listeners?
      whoHasTheMostListeners();
      break;
    case 4:
      //which artist is the most popular?
      whichArtistIsTheMostPopular();
      break;
    case 5:
      //which artist was played the most?
      whichArtistIsTheMostPlayer();
      break;
    default:
      console.log("Invalid number generated.");
      break;
  }
}
function startQuestionTimer() {
  const timer = setTimeout(timerOut, 10000);
}
function whoWroteTheSong() {}
function whichSongIsTheLongest() {}
function whoHasTheMostListeners() {}
function whichArtistIsTheMostPopular() {}
function whichArtistIsTheMostPlayer() {}

function correctAnswer() {
  Swal.fire({
    title: "Correct Answer!",
    text: "Get Ready For The Next Question",
    icon: "success",
    timer: 2500,
    scrollbarPadding: false,
  }).then(() => {
    count++
    score += 1  
    generateQuestion();
})
}
function wrongAnswer() {
  Swal.fire({
    title: "Wrong Answer!",
    text: "Get Ready For The Next Question",
    icon: "error",
    timer: 2500,
    scrollbarPadding: false,
  }).then(() => {
    count++;
    generateQuestion();
  });
}

function timerOut(){
  Swal.fire({
    title: "Time ended!",
    text: "Get Ready For The Next Question",
    icon: "error",
    timer: 2500,
    scrollbarPadding: false,
  }).then(() => {    
    count++;
    generateQuestion();
  });
}