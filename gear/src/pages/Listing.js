import React, {useState,useEffect,useCallback, useLayoutEffect} from 'react';
import axios from 'axios';
import {Table, Row, Col, Image, Container, InputGroup, Form, Button, Card, Spinner } from 'react-bootstrap';
import { StopwatchFill, Coin } from 'react-bootstrap-icons';
import { serverUrl } from '../routes/url'
import { Link , useLocation } from 'react-router-dom';
import ImageViewer from "react-simple-image-viewer";
import { render } from 'react-dom';

function Listing({listingData}) {


  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [bid,setBid] = useState([]);
  const [bidResponse,setBidResponse] = useState([]);
  const [date,setDate] = useState([]);

  const location = useLocation();
  const data = location.state?.listingData;

  var pics = location.state?.listingData.pictures ?? [];

  const [combPics, setCombPics] = useState([]);

  const [imagesReady, setImagesReady] = useState(false);
   
 

  const submitCustomBid = (e) => {
    console.log(e)
    console.log("about to submit custom bid to server...")

    axios.post('http://localhost:3001/listingBid', {'seller': e, 'bid': bid})
           .then(response => setBidResponse(response.data.id));
 };

 const handleChange = (e) => {
  e.preventDefault();
  setBid(e.target.value);
  console.log("bid input: "+ e.target.value);
};


const openImageViewer = useCallback((index) => {
  setCurrentImage(index);
  setIsViewerOpen(true);
}, []);


const closeImageViewer = () => {
  setCurrentImage(0);
  setIsViewerOpen(false);
};


useLayoutEffect (() => {

  setCombPics(pics);
  setImagesReady(true);

  
  console.log("I've been fired");
  //onsole.log(mainpic);
  console.log(combPics)


}, [])


    return (
      imagesReady ?
      <div className="Listing">
      
      
      <div style={{ width: '100%' }}>
      <Container>
        <div className='d-flex justify-content-center mt-4'>
          <Link to={'/create'}>
            <Button>Create a Listing</Button>
          </Link>
        </div>
        <Row>
          {data.Year} {data.Make} {data.Model}
          <Row>           
<Col>
        <img
          src={combPics[0]}
          onClick={() => openImageViewer(0)}
          width="300"
          key='0'
          style={{ margin: "2px" }}
          alt=""
        /></Col>
        <Col> 
        <div className="gallery-grid">
                   {combPics.map((src, index) => (             
index > 0 ? 
<img
src={src}
onClick={() => openImageViewer(index)}
width="300"
key={index}
style={{ margin: "2px" }}
alt=""
/>
        :<></>
          
      ))}
      </div></Col>

{isViewerOpen && ((
        <ImageViewer
          src={combPics}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
          closeOnClickOutside={true}
        />
      ) )}
         </Row>
              <td>
            <InputGroup className="mb-3">
            <Form.Control
            placeholder={"min $" + (parseInt(data)+100)}
            aria-label="Custom Bid"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            />
            <Button variant="outline-secondary" id={data}  onClick={e => submitCustomBid(e.target.id)}>
            Bid
            </Button>
            <Button variant="outline-secondary" id={data+'100'}  onClick={e => submitCustomBid(e.target.id)}>
            +100
            </Button>
            </InputGroup>
            </td>
         

          </Row>
        </Container>
 </div>
      
      </div>
      :
      <></>
    )
  }

  export default Listing;
