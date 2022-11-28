import React, { useState, useEffect } from "react"

export default
    function SearchResultsView(props) {

    let res = <ul></ul>
    if (props.searchResults) {
        res = <ul>
            {props.searchResults.response.hits.map((hit, index) => {
                return <li key={index}>{hit.result.full_title}</li>
            })}
        </ul>
    }

    return <div>{res}</div>
}