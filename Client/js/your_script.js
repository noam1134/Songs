var apiKey = "AIzaSyCaLLAUvgSI-GALQw25F3sGGzv823WSbZM"; // Replace with your actual API key
var player;

function onYouTubeIframeAPIReady() {
  // Create the YouTube player with zero dimensions and autoplay disabled
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0, // Autoplay disabled
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady() {
  // The player is ready to use
  // Call the searchVideo function here
  var searchInput = "in the end"; // Replace with your search query
  searchVideo(searchInput);
}

function searchVideo(searchInput) {
  // Make the API call to search for videos
  var query = searchInput;
  var request = gapi.client.youtube.search.list({
    q: query,
    part: "snippet",
    type: "video",
    maxResults: 1,
    key: apiKey,
  });

  // Process the response and get the video ID
  request.execute(function (response) {
    var videoId = response.items[0].id.videoId;
    playVideoById(videoId);
  });
}

function playVideoById(videoId) {
  // Play the video with the specified video ID
  player.loadVideoById(videoId);
  player.playVideo();
}
