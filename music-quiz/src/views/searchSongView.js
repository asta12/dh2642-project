import { Button, Pagination, Form } from 'react-bootstrap';

export default
    function SearchSongView(props) {

    return <div>
        <h4>Search for a song</h4>
        <Form className="d-flex mb-3">
            <Form.Control
                type="search"
                placeholder="Search song"
                className="me-2"
                aria-label="Search"
                onChange={(e) => props.updateSearchString(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        props.search()
                    }
                }}
            />
            <Button variant="outline-primary me-2" onClick={(e) => props.search()}>Search</Button>
            <Pagination className='mb-0'>
                <Pagination.Prev onClick={(e) => props.prevPage()} disabled={props.page === 1} />
                <Pagination.Item>{props.page}</Pagination.Item>
                <Pagination.Next onClick={(e) => props.nextPage()} />
            </Pagination>
        </Form>
    </div>
}