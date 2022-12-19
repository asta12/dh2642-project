# Music Quiz with a Twist

## Description

Music Quiz with a Twist is a music quiz where the lyrics of a song is read out loud by an AI (text-to-speech). You will then have to guess the song by selecting the correct title of the song from a selection of titles.

You can create an account on which you can create quiz playlists and save them for you and your friends to play later. You will be able to add friends and challenge them to play a game with one of your own crafted playlists.

Link to the deployed app: https://dh2642-project-f1eca.web.app/

## Setup

The website is a react application that uses firebase for persistent storage. 
To run this game you will need [npm](https://www.npmjs.com/) installed.
Furthermore, you need a firebase project with a real-time database and
you also need to enable _Email/Password_ as a sign-in provider. The next
step is to create a _src/firebaseConfig.js_ file. The file should have
the following format (replace the empty strings with your firebase settings):

```
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

export default firebaseConfig;
```

The last file that needs to be created is the *src/apiConfig.js* file
which should contain the API key to the [Genius API](https://rapidapi.com/Glavier/api/genius-song-lyrics1).
The file should have the following format (replace the empty string with your own value):
```
export const API_KEY = "";
```

Now you should be ready to host the website. Go 
into the *music-quiz* folder and run the following commands:

`npm install`

`npm run start`

**Warning: The text-to-speech AI does not seem to work on Linux**
