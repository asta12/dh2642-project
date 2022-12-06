# Music Quiz with a Twist

## Setup
If you would like to test our game, install this plugin [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) to allow CORS. 
Visit our deployed site at: https://dh2642-project-f1eca.web.app/

**Don't forget to disable the plugin after you are testing our website!! By default the browser restricts CORS for security reasons.**

## Description
Music Quiz with a Twist is a music quiz where the lyrics of a song is read out loud by an AI (text-to-speech). You will then have to guess the song by selecting the correct title of the song from a selection of titles.
 
You can create an account on which you can create quiz playlists and save for you and your friends to play later. You will be able to add friends and challenge them to play a game with one of your own crafted playlist.
 
## What we have done
- We have created a register/login page that authenticates the user to firebase.
- We have a navbar that navigates between the different pages
- If you navigate to /profile/create-playlist you are able to search for songs and add them to a playlist.
/profile displays your playlists.
- The ability to search for a user and send friend request on /profile/add-friend
 
## What we still plan to do
- A friend profile page where you can browse their created playlists
- A view over your friends and the ability to “challenge” a friend to play a game with one of your playlists
- Improve the game to enhance the user experience.
- A home page where you can search for playlists, view the top rated playlists, and your friends playlist.
 
## Project file structure

### src/models

- *firebaseModel*:
FirebaseModel communicates with firebase and ensures that data is loaded into the model from firebase and vice versa. Works like in the lab.

- *model*:
This is the model in our model-view-presenter architecture. The purpose of this file is to handle the model, which is passed down to each presenter. Also works like in the lab with observers so that when the model is updated, the components that are observing it are sent a notification.

### src/presenters

- *createPlayListPresenter*:
Responsible for creating new playlists. This presenter uses the *createPlaylistView*, which in turn uses the *searchSongPresenter* (to search for new songs to add) and the *selectedSongsPresenter* to show the list of selected songs.

- *editPlayListPresenter*:
Responsible for editing playlists. This presenter uses the *editPlaylistView*, which in turn uses the *searchSongPresenter* (to search for new songs to add) and the *selectedSongsPresenter* to show the list of selected songs. 

- *searchSongPresenter*:
Responsible for taking an input query from the user and fetching songs from the genius API. This presenter uses the *searchSongView*, which has an input for the search query, and *searchSongResultsView* which displays all the search results. We also use *promiseNoData* in the presenter in order to display a spinner while we are waiting for the search promise to resolve. 

- *selectedSongsPresenter*: 
Responsible for displaying a list of selected songs. This presenter uses the *selectedSongsView* which displays a list of songs.

- *gamePresenter*:
Presenter that keeps the game state as component state and handles the logic for the views that make up the game. Contains the views *guessSongView*, *settingsView*, *scoreView* and *choosePlaylistView*. Sends the alternatives down to *guessSongView* which sends up information via custom events when the user clicks on a song title and makes their guess. This view is also conditionally styled via props after a user has made a guess. 
The presenter manages the game settings and updates them via *settingsView*. Displays the score of the game via *scoreView* and lets the user select a playlist to play using *choosePlaylistView*.

- *headerNavbarPresenter*:
Presenter that handles the logic for the *headerView* and *navbarView*. Receives the model as a props and adds an observer to it. Receives the current user from the model and sends it as a prop to the *navbarView*.

- *addFriendPresenter*:
Presenter that handles the logic for searching for users and sending friend requests. Contains the view: *addFriendView*.

- *loginPresenter*:
Presenter that handles the logic for signing in a user. Contains the view: *loginView*.

- *registerPresenter*:
Presenter that handles the logic to register a new user. Contains the view: *registerView*.

- *userProfilePresenter*:
Responsible for showing the profile of a logged-in user. The presenter uses the *userInfoView* which displays the username and the email. In addition, the presenter uses the *showPlaylistView* to display all playlists of the user. Lastly, the presenter uses the *createPlaylistButtonView* to show a button that can redirect the user to the *createPlayListPresenter*.

### src/views

All views are in this directory. Most views are tied to a presenter, and are therefore described under the presenter they belong to.   

- *app*:
Sets up routing and displays all components of the application.

- *loadingView*:
Shows the spinner when loading. Is used when waiting for promises to be resolved in the application.

### src/settings

Includes application specific settings. 
For now we have a file named *playlistSettings.js* which contains two constants for the minimum and maximum number of songs in a playlist.

### src/images

Contains images used in the app.

### src/firebaseAuthentication

Contains functions used when authenticating against firebase.
