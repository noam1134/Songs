var expiresIn;
const clientId = "76eb58574dca4292942f6b50535fe9b9";
const clientSecret = "df624510f02e46a39a9f04d250b1cde8";

let accessToken = null;
let tokenExpirationTime = 0;

// Fetch access token using Client Credentials Flow
function getAccessToken() {
  if (Date.now() < tokenExpirationTime) {
    const secondsLeft = Math.ceil((tokenExpirationTime - Date.now()) / 1000);
    console.log(`Access token still valid. Seconds left: ${secondsLeft}`);
    return Promise.resolve(accessToken); // Token still valid, no need to refresh
  }

  const authString = `${clientId}:${clientSecret}`;
  const encodedAuth = btoa(authString);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${encodedAuth}`,
  };
  const body = "grant_type=client_credentials";

  return axios
    .post("https://accounts.spotify.com/api/token", body, { headers })
    .then((response) => {
      accessToken = response.data.access_token;
      expiresIn = response.data.expires_in;
      console.log("Access token refreshed. " + expiresIn);
      return accessToken;
    })
    .catch((error) => {
      console.log("Error occurred while getting access token:", error.message);
      return null;
    });
}

// Fetch artist information and images
function getArtistImages(artistName, accessToken) {
  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    artistName
  )}&type=artist`;

  axios
    .get(apiUrl, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((response) => {
      const artists = response.data.artists.items;
      if (artists.length > 0) {
        const artistInfo = artists[0];
        const artistImages = artistInfo.images || [];
        if (artistImages.length > 0) {
          document.getElementById("artistImg").src = artistImages[0].url;
        } else {
          console.log(`No images found for ${artistInfo.name}.`);
          document.getElementById("artistImg").src = "/images/artistImage.jpg";
        }
      } else {
        console.log(
          `Artist "${artistName}" not found in the Spotify API response.`
        );
      }
    })
    .catch((error) => {
      console.log("Error occurred:", error.message);
    });
}

// Entry point (called on page load)
function getArtistImage(artistToShow) {
  const artist = artistToShow;
  getAccessToken().then((token) => {
    if (token) {
      getArtistImages(artist, token);
    }
  });
  getArtistInfo("linkin park")
}










//GET INFO ABOUT ARTIST FROM LAST.FM

function getArtistInfo(artistName) {
  $.ajax({
    url: "http://ws.audioscrobbler.com/2.0/",
    method: "GET",
    data: {
      method: "artist.getinfo",
      artist: artistName,
      api_key: "645890a09eebe9cd0d7bce90c41ff1f1", //this is the API of lastFM website
      format: "json",
    },
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      // Handle the error
      console.error(error);
    },
  });
}