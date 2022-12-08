import React, { useState, useEffect } from "react";
import SearchSongView from "../views/searchSongView.js";
import resolvePromise from "../resolvePromise.js";
import { searchSong } from "../songSource.js";
import SearchSongResultsView from "../views/searchSongResultsView.js";
import promiseNoData from "../views/promiseNoData.js";

export default function SearchSongPresenter(props) {
  const [searchString, updateSearchString] = useState("");
  const [initialSearch, updateInitialSearch] = useState(false);
  const [page, updatePage] = useState(1);
  const [promiseState] = useState({});
  const [, reRender] = useState();

  useEffect(() => {
    if (initialSearch) {
      search();
    }
  }, [page]);

  function search() {
    updateInitialSearch(true);
    resolvePromise(searchSong(searchString, page), promiseState, notify);
  }

  function newSearch() {
    updatePage(1);
    search();
  }

  function notify() {
    reRender(new Object());
  }

  function nextPage() {
    updatePage(page + 1);
  }

  function prevPage() {
    if (page === 1) {
      return;
    }
    updatePage(page - 1);
  }

  function updateInput(newInput) {
    updateSearchString(newInput);
  }

  return (
    <div>
      <SearchSongView
        updateSearchString={updateInput}
        search={newSearch}
        nextPage={nextPage}
        prevPage={prevPage}
        page={page}
      />
      {promiseNoData(promiseState) || (
        <SearchSongResultsView
          searchResults={promiseState.data}
          addSongToPlaylist={props.addSongToPlaylist}
          isSongInPlaylist={props.isSongInPlaylist}
          isPlaylistFull={props.isPlaylistFull}
        />
      )}
    </div>
  );
}
