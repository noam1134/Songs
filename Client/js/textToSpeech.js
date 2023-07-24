var voice = {
  ShalomBijoi: 0,
  Bouton: 1,
  Saadon: 2,
  Wini: 3,
  Yoav: 4,
};

// Function to initiate text-to-speech
function speakText() {
  speakBtn = document.getElementById("speak");
  speakBtn.innerHTML = "Stop Reading";
  speakBtn.setAttribute("onclick", "stopSpeak()");
  // document.getElementById("speak").style.visibility = "hidden";

  var textToSpeech = document.getElementById("artistSummary").innerHTML;
  textToSpeech = textToSpeech.split("<")[0];
  const msg = new SpeechSynthesisUtterance(textToSpeech);
  msg.voice =
    speechSynthesis.getVoices()[
      voice[document.getElementById("voiceList").value]
    ];
  // Speak the text
  speechSynthesis.speak(msg);
}

function stopSpeak() {
  speakBtn = document.getElementById("speak");
  speakBtn.innerHTML = "Click To Listen!";
  speakBtn.setAttribute("onclick", "speakText()");
  speechSynthesis.cancel();
}
