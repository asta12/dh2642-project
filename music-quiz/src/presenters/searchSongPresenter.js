import React, { useState, useEffect } from "react"
import SearchSongView from "../views/searchSongView.js";
import resolvePromise from "../resolvePromise.js";
import { searchSong } from "../songSource.js";
import SearchResultsView from "../views/searchResultsView.js";
import promiseNoData from "../views/promiseNoData.js";

export default
function SeachSongPresenter(props) {
    const [searchString, updateSearchString] = useState("Alan Walker")
    const [page, updatePage] = useState(1)
    const [promiseState] = useState({})
    const [, reRender] = useState()

    function search() {
        resolvePromise(searchSong(searchString, page), promiseState, notify)
    }

    function notify() {
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

    useEffect(search, [page])

    return  <div>
                <SearchSongView updateSearchString={updateInput} 
                                search={search}
                                nextPage={nextPage}
                                prevPage={prevPage}/>
                {promiseNoData(promiseState) || <SearchResultsView searchResults={promiseState.data}/>}
            </div>
}