import { API_KEY } from "./apiConfig.js"
import { getLyrics } from "genius-lyrics-api"

const PROXY_IP = "http://164.92.213.174/"

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

function searchSong(searchString, page_offset) {
    let encodedSearch = encodeURI(searchString) // URL encode search string
    let perPage = 5 // entries per page
    let page = page_offset // page offset
    return fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${encodedSearch}&per_page=${perPage}&page=${page}`, options)
	        .then(response => response.json())
	        .catch(err => console.error(err));
}


function getSongLyrics(songID) {
    return fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songID}`, options)
        .then(response => response.json())
        .then(json => json.response.song.url)
        .then(url => getLyrics(`${PROXY_IP}${url}`))
        .catch(err => console.error(err));
}

export { searchSong, getSongLyrics } 