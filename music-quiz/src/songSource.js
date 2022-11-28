import { API_KEY } from "./apiConfig.js"

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

function searchSong(searchString, page_offset) {
    let encodedSearch = encodeURI(searchString) // URL encode search string
    let per_page = 10 // entries per page
    let page = page_offset // page offset
    return fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${encodedSearch}&per_page=${per_page}&page=${page}`, options)
	        .then(response => response.json())
	        .catch(err => console.error(err));
}


export { searchSong } 