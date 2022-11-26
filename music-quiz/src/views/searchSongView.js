import React, { useState, useEffect } from "react"

export default 
function SearchSongView(props) {

    return  <div>
                <input  placeholder="Search Song"
                        onChange={(e) => props.updateSearchString(e.target.value)}/>
                <button onClick={(e) => props.search()}>Search</button>
                <button onClick={(e) => props.prevPage()}>-</button>
                <button onClick={(e) => props.nextPage()}>+</button>
            </div>
}