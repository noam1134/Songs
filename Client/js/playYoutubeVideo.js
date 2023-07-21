var apiKey = "AIzaSyCSrPK-MmRJ0tSC4e9pRH4VrwSLBHBtfLg";
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  });
}

function searchVideo(searchInput) {
  // Make the API call to search for videos
  query = searchInput;
  var request = gapi.client.youtube.search.list({
    q: query,
    part: "snippet",
    type: "video",
    maxResults: 1,
    key: apiKey,
  });

  // Process the response and display the player in a Fancybox modal
  request.execute(function (response) {
    var videoId = response.items[0].id.videoId;
    var videoURL = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
    $.fancybox.open({
      src: videoURL,
      type: "iframe",
      iframe: {
        preload: false,
      },
      opts: {
        iframe: {
          css: {
            maxWidth: "800px",
            maxHeight: "450px",
          },
        },
      },
    });
  });
}

function init() {
  gapi.client.setApiKey(apiKey);
  gapi.client.load("youtube", "v3", function () {
    // API is ready
  });
}
