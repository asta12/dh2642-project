import React, { useState, useEffect } from "react"
import { Form, Button } from 'react-bootstrap';

export default
    function SearchSongView(props) {

    return <div>
        <h4>Search for songs</h4>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        <input placeholder="Search Song"
            onChange={(e) => props.updateSearchString(e.target.value)} />
        <button onClick={(e) => props.search()}>Search</button>
        <button onClick={(e) => props.prevPage()}>-</button>
        <button onClick={(e) => props.nextPage()}>+</button>
    </div>
}