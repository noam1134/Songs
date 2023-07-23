url = "https://localhost:7061/";
const getLeaderBoard = url + "api/MusicUsers/GetTopFiveScoreBoard";
const getAllTheSongs = url + "api/Songs/GetAllSongs";
const getUserScoresURL = url + "api/MusicUsers/GetUserScores?userId=";
var userId = JSON.parse(localStorage.getItem("user")).id;
function startQuiz() {
  Swal.fire({
    title: "Your highest score: ",
    html: '<button class="quizBtn" id="play-now-btn" onclick="startGame()">Play now!</button><br><button class="quizBtn" id="leaderboard-btn" onclick="getLeaderBoardData()">Show leaderboard!</button>',
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

function startGame() {
    ajaxCall("GET", getAllTheSongs, "", gotAllSongsCB, errorGotAllSongs);
}


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

;
// Step 2: Create a function to show the custom modal
function showCustomModal() {
  Swal.fire({
    title: "Custom Modal",
    html: `
        <div class="container-fluid bg-info">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3><span class="label label-warning" id="qid">2</span> THREE is CORRECT</h3>
              </div>
              <div class="modal-body">
                <div class="col-xs-3 col-xs-offset-5">
                  <div id="loadbar" style="display: none;">
                    <div class="blockG" id="rotateG_01"></div>
                    <div class="blockG" id="rotateG_02"></div>
                    <div class="blockG" id="rotateG_03"></div>
                    <div class="blockG" id="rotateG_04"></div>
                    <div class="blockG" id="rotateG_05"></div>
                    <div class="blockG" id="rotateG_06"></div>
                    <div class="blockG" id="rotateG_07"></div>
                    <div class="blockG" id="rotateG_08"></div>
                  </div>
                </div>
                <div class="quiz" id="quiz" data-toggle="buttons">
                  <label class="element-animation1 btn btn-lg btn-primary btn-block">
                    <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>
                    <input type="radio" name="q_answer" value="1">1 One
                  </label>
                  <label class="element-animation2 btn btn-lg btn-primary btn-block">
                    <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>
                    <input type="radio" name="q_answer" value="2">2 Two
                  </label>
                  <label class="element-animation3 btn btn-lg btn-primary btn-block">
                    <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>
                    <input type="radio" name="q_answer" value="3">3 Three
                  </label>
                  <label class="element-animation4 btn btn-lg btn-primary btn-block">
                    <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>
                    <input type="radio" name="q_answer" value="4">4 Four
                  </label>
                </div>
              </div>
              <div class="modal-footer text-muted">
                <span id="answer"></span>
              </div>
            </div>
          </div>
        </div>
      `,
  });

  // Step 3: Call the function to show the custom modal when needed
  // For example, you can trigger the modal using a button click event
  const btnShowModal = document.getElementById("btnShowModal");
  btnShowModal.addEventListener("click", showCustomModal);
}

showCustomModal();
