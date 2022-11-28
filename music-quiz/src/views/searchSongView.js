import Button from 'react-bootstrap/Button';
import arrowRight from "../images/arrow-right.png";
import arrowLeft from "../images/arrow-left.png";

export default 
function SearchSongView(props) {

    return  <div>
                <input  placeholder="Search Song"
                        onChange={(e) => props.updateSearchString(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                props.search()
                            }
                        }}
                        style={{
                            borderRadius: "10px",
                            borderStyle: "solid",
                            "height": "35px"
                        }}/>
                
                <Button onClick={(e) => props.search()} 
                        style={{
                            "margin": "5px"
                        }}>Search</Button>
                <Button onClick={(e) => props.prevPage()}>
                    <img src={arrowLeft} alt="add item" width="25" />
                </Button>
                <Button onClick={(e) => props.nextPage()}>
                    <img src={arrowRight} alt="add item" width="25" />
                </Button>
            </div>
}