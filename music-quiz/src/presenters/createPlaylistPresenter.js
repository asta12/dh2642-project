import React, { useState, useEffect } from "react"
import SearchSongView from "../views/searchSongView.js";
import resolvePromise from "../resolvePromise.js";
import { searchSong } from "../songSource.js";
import SearchResultsView from "../views/searchResultsView.js";
import promiseNoData from "../views/promiseNoData.js";
import CreatePlaylistName from "../views/createPlaylistNameView.js";
import CreatePlaylistSelectedSongs from "../views/createPlaylistSelectedSongsView.js";
import { Row, Col } from 'react-bootstrap';

export default
    function CreatePlaylist(props) {
    const [playlistName, setPlaylistName] = useState("")
    const [playlistSongs, setPlaylistSongs] = useState([])
    const [searchString, updateSearchString] = useState("")
    const [initialSearch, updateInitialSearch] = useState(false)
    const [page, updatePage] = useState(1)
    const [promiseState] = useState({})
    const [, reRender] = useState()

    useEffect(() => {
        if (initialSearch) {
            search()
        }
    }, [page])

    function search() {
        updateInitialSearch(true)
        resolvePromise(searchSong(searchString, page), promiseState, notify)
    }

    function newSearch() {
        updatePage(1)
        search()
    }

    function notify() {
        console.log(promiseState.data)
        reRender(new Object())
    }

    function nextPage() {
        updatePage(page + 1)
    }

    function prevPage() {
        if (page === 1) {
            return
        }
        updatePage(page - 1)
    }

    function updateInput(newInput) {
        updateSearchString(newInput)
    }

    function addSongToPlaylist(song) {
        setPlaylistSongs([...playlistSongs, song])
    }

    function isSongInPlaylist(songID) {
        return playlistSongs.filter(song => song.id === songID).length > 0
    }

    function removeSongFromPlaylist(songID) {
        setPlaylistSongs(playlistSongs.filter(song => song.id !== songID))
    }

    return <div>
        <CreatePlaylistName playlistNameChange={setPlaylistName} />
        <Row>
            <Col>
                <SearchSongView updateSearchString={updateInput}
                    search={newSearch}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    page={page} />
                {promiseNoData(promiseState) || <SearchResultsView
                    searchResults={promiseState.data}
                    addSongToPlaylist={addSongToPlaylist}
                    isSongInPlaylist={isSongInPlaylist}
                />}
            </Col>
            <Col>
                <CreatePlaylistSelectedSongs
                    playlistSongs={playlistSongs}
                    removeSongFromPlaylist={removeSongFromPlaylist} />
            </Col>
        </Row>
    </div>
}