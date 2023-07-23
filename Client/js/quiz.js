url = "https://localhost:7061/";
const getLeaderBoard = url + "api/MusicUsers/GetTopFiveScoreBoard";
const getAllTheSongs = url + "api/Songs/GetAllSongs";
const getUserScoresURL = url + "api/MusicUsers/GetUserScores?userId=";
const getRandomSongURL = url + "api/Songs/GetRandomSong";
const get3ArtistsURL = url + "api/Artists/Get3RandomsArtists?artistName=";
getAllArtistsAPI = url + "api/Artists/GetAllArtists";
insertScoreURL = url + "api/MusicUsers/InsertScore";

allSongs = [];
allArtists = [];
getAllSongsFromDB();
getAllArtistsFromDB();
var questions = [];
var count = 0;
var score = 0;
var userId = JSON.parse(localStorage.getItem("user")).id;
function openQuizPage() {
  Swal.fire({
    title: "Your highest score: ",
    html: '<button class="quizBtn" id="play-now-btn" onclick="loadQuizPage()">Play now!</button><br><button class="quizBtn" id="leaderboard-btn" onclick="getLeaderBoardData()">Show leaderboard!</button>',
    showConfirmButton: false,
    allowOutsideClick: true,
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

function getUserScores() {
  ajaxCall("GET", getUserScoresURL + userId, "", gotScores, errorScores);
}
function gotScores(data) {
  if (data[0] == null) {
    document.getElementById("swal2-title").innerHTML += "0";
  } else document.getElementById("swal2-title").innerHTML += data[0].userScore;
}

function errorScores(data) {
  document.getElementById("swal2-title").innerHTML = "Quiz";
}

// Step 2: Create a function to show the custom modal
function loadQuizPage() {
  window.open("quiz.html", "_self");
}
function generateQuestion() {
  questionTypeNumber = 2; //Math.floor(Math.random() * 5) + 1;
  switch (questionTypeNumber) {
    case 1:
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

function startQuiz() {
  count = 0;
  score = 0;
  quizDiv = document.getElementById("quizDiv");
  quizDiv.innerHTML = `<div class="container"><div style="margin:5vh">
    <h1 id = "questionHeader">Quiz Form</h1></div>
    <div id="quizContainer">
      <div id="questionContainer"></div>
      <button class="quizAnswerBtn" id="answer1">NA</button>
      <button class="quizAnswerBtn" id="answer2">NA</button>
      <button class="quizAnswerBtn" id="answer3">NA</button>
      <button class="quizAnswerBtn" id="answer4">NA</button>
      <br /><button id="nextBtn" class = "nextQuizBtn" onclick="nextQuestion(questions[count])" style="visibility:hidden;">Next</button>
    </div>
    <div id="resultContainer"></div>
  </div>`;
  updatePlayerScore();
  updateQuestionCounter();
  loadQuestions();
  renderAllQuestions();
  Swal.close();
}

function loadQuestions() {
  for (var i = 0; i < 6; i++) {
    generateQuestion();
  }
  console.log(questions);
}

function startQuestionTimer() {
  const timer = setTimeout(timerOut, 10000);
}

function whoWroteTheSong() {
  randomSongNumber = Math.floor(Math.random() * allSongs.length);
  song = allSongs[randomSongNumber];
  threeArtists = get3Artists(song.artistName);
  question = {
    questionTxt: "Who wrote the song: " + song.songName,
    correctAnswer: song.artistName,
    wrongAnswers: threeArtists,
  };

  questions.push(question);
}

function renderAllQuestions() {
  renderQuestion(questions[count]);
}

function renderQuestion(question) {
  questionContainer = document.getElementById("questionContainer");
  document.getElementById("questionHeader").innerHTML = question.questionTxt;
  randomBtn = Math.floor(Math.random() * 4) + 1;
  answer = document.getElementById("answer" + randomBtn);
  answer.innerHTML = question.correctAnswer;
  answer.setAttribute("onclick", "correctAnswer(this.id)");
  wrongIdx = 0;
  for (var i = 1; i < 5; i++) {
    answer = document.getElementById("answer" + i);
    console.log(answer.innerHTML);
    if (answer.innerHTML == "NA") {
      answer.innerHTML = question.wrongAnswers[wrongIdx];
      wrongIdx++;
      answer.setAttribute("onclick", "wrongAnswer(this.id)");
    }
  }
}
function resetButtons() {
  document.getElementById("nextBtn").style.visibility = "hidden";
  for (var i = 1; i < 5; i++) {
    answer = document.getElementById("answer" + i);
    answer.setAttribute("onclick", "wrongAnswer(this.id)");
    answer.innerHTML = "NA";
    answer.style.backgroundColor = "rgb(110, 110, 110)";
    answer.disabled = false;
  }
}
function nextQuestion(question) {
  updateQuestionCounter();
  if (count >= 6) {
    document.getElementById("questionCounter").innerHTML =
      ", question number 6/6";
    nextBtn = document.getElementById("nextBtn");
    nextBtn.innerHTML = "Finish quiz!";
    nextBtn.setAttribute("onclick", "endGame()");
    endGame();
    uploadScore();
  } else {
    resetButtons();
    renderQuestion(question);
  }
}
function endGame() {
  Swal.fire({
    title: "Your score: " + score,
    html: '<button class="quizBtn" id="play-now-btn" onclick="startQuiz()">Play again?</button><br><button class="quizBtn" id="leaderboard-btn" onclick="getLeaderBoardData()">Show leaderboard!</button>',
    showConfirmButton: false,
    allowOutsideClick: true,
    showCloseButton: true,
    scrollbarPadding: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
    } else if (result.isDismissed) {
      // Handle the modal being closed without clicking the buttons (e.g., clicking outside the modal)
      console.log("Modal closed without clicking buttons.");
    }
  });
}
function uploadScore() {
  user = JSON.parse(localStorage.getItem("user"));
  ajaxCall(
    "POST",
    insertScoreURL,
    JSON.stringify(
      (scoreToInsert = {
        id: 0,
        userScore: score,
        userId: user.id,
        userName: user.userName,
      })
    ),
    uploadSuccess,
    uploadError
  );
}

function uploadSuccess(data) {
  console.log("uploaded score: ", data);
}
function uploadError(error) {
  console.log(error);
}

function whichSongIsTheLongest() {
  fourSongs = get4Songs();
  longestSong = returnTheLongestSong(fourSongs);

  question = {
    questionTxt: "Which song is the longest?",
    correctAnswer: fourSongs.splice(fourSongs[longestSong], 1),
    wrongAnswers: fourSongs,
  };
  questions.push(question);
}
function returnTheLongestSong(fourSongs) {
  songsLength = [];
  fourSongs.forEach((song) => {
    songLen = getLastFMTrackInfo(song.artistName, song.songName);
    while (songLen == 0) {
      songLen = getLastFMTrackInfo(song.artistName, song.songName);
    }
    songsLength.push(songLen);
  });
  console.log(songsLength)
  longestIndex = 0;
  for (var i = 0; i < songsLength.length; i++) {
    if (songsLength[i] > songsLength[longestIndex]) {
      longestIndex = i;
    }
  }
  return longestIndex;
}

function get4Songs() {
  fourSongs = [];
  while (fourSongs.length < 4) {
    randomSongNumber = Math.floor(Math.random() * allSongs.length);
    potentialSong = allSongs[randomSongNumber];
    if (!fourSongs.includes(potentialSong)) {
      fourSongs.push(potentialSong);
    }
  }
  return fourSongs;
}

function getSongLenth() {}

function whoHasTheMostListeners() {}
function whichArtistIsTheMostPopular() {}
function whichArtistIsTheMostPlayer() {}

function correctAnswer(buttonId) {
  score += 1;
  updatePlayerScore();
  for (var i = 1; i < 5; i++) {
    answer = document.getElementById("answer" + i);
    answer.disabled = true;
  }
  document.getElementById(buttonId).style.backgroundColor = "green";
  document.getElementById("nextBtn").style.visibility = "visible";
  count++;
}

function wrongAnswer(buttonId) {
  for (var i = 1; i < 5; i++) {
    answer = document.getElementById("answer" + i);
    answer.disabled = true;
  }
  document.getElementById(buttonId).style.backgroundColor = "red";
  document.getElementById("nextBtn").style.visibility = "visible";
  count++;
}

function timerOut() {
  Swal.fire({
    title: "Time ended!",
    text: "Get Ready For The Next Question",
    icon: "error",
    timer: 2500,
    scrollbarPadding: false,
  }).then(() => {
    count++;
  });
}

function getAllSongsFromDB() {
  ajaxCall(
    "GET",
    getAllTheSongs,
    "",
    gotAllSongsFromDB,
    ErrorGetAllSongsFromDB
  );
}

function gotAllSongsFromDB(data) {
  allSongs = data;
}

function ErrorGetAllSongsFromDB(error) {
  console.log(error);
}

function getAllArtistsFromDB() {
  ajaxCall(
    "GET",
    getAllArtistsAPI,
    "",
    gotAllArtistsFromDB,
    errorAllArtistsFromDB
  );
}

function gotAllArtistsFromDB(data) {
  allArtists = data;
}
function errorAllArtistsFromDB(error) {
  console.log(error);
}

function getRandomSong() {
  ajaxCall("GET", getRandomSongURL, "", gotSong, errorSong);
}

function gotSong(song) {}
function errorSong(error) {
  console.log(error);
}

function get3Artists(artist) {
  threeArtists = [];
  while (threeArtists.length < 3) {
    randomArtistNumber = Math.floor(Math.random() * allArtists.length);
    potentialArtist = allArtists[randomArtistNumber].name;
    if (potentialArtist != artist && !threeArtists.includes(potentialArtist)) {
      threeArtists.push(potentialArtist);
    }
  }
  return threeArtists;
}

function updatePlayerScore() {
  document.getElementById("playerScore").innerHTML = "Score: " + score;
}

function updateQuestionCounter() {
  document.getElementById("questionCounter").innerHTML =
    ", question number " + (count + 1) + "/6";
}

function getLastFMTrackInfo(artist, track) {
  const apiKey = "645890a09eebe9cd0d7bce90c41ff1f1";
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${artist}&track=${track}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);      
      // const songInfo = data.song;
      // return data.song.track.duration;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      const playCountContainer = document.getElementById("playCountContainer");
      playCountContainer.innerHTML =
        "Error fetching data. Please try again later.";
    });
}
