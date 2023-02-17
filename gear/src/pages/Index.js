import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Table, Row, Col, Image, Container, InputGroup, Form, Button, Card, Spinner } from 'react-bootstrap';
import { StopwatchFill, Coin } from 'react-bootstrap-icons';
import { serverUrl } from '../routes/url'
import { Link, useParams, BrowserRouter,Route, Navigate, Routes } from 'react-router-dom';


function App() {

  const [status, setStatus] = useState("idle");
  const [listings, setListingsData] = useState([]);
  const [bid,setBid] = useState([]);
  const [bidResponse,setBidResponse] = useState([]);
  const [date,setDate] = useState([]);

  const [ listening, setListening ] = useState(false);

   function getListingInfo() {
          console.log("requesting initial data on load");
          setStatus("idle");
              fetch('http://localhost:3001', {method: "GET"}) 
              .then((res) => (res.status === 200 ? res.json():
              setStatus("rejected")))
              .then((result) => 
              {
                setListingsData(result.data)
                console.log("data received and set to: " + result.data)
              })
              .catch ((err) => 
              {
              setStatus("rejected")
              console.log('There was an error: ', err)
              }
              );

      }

const updateListingInfo = (data) => {
  const parsedData = JSON.parse(data);
  setListingsData((listings) =>
    [...listings].map((listing) => {
      if (listing.id === parsedData.id) {
        return parsedData;
      }
      return listing;
    })
  );
};

  const handleChange = (e) => {
    e.preventDefault();
    setBid(e.target.value);
    console.log("bid input: "+ e.target.value);
  };

  const submitCustomBid = (e) => {
    console.log(e)
    console.log("about to submit custom bid to server...")

    axios.post('http://localhost:3001/listingBid', {'id': e, 'bid': bid})
           .then(response => setBidResponse(response.data.id));
 };

  function refreshListings()
  {
    setListingsData([])
    fetch(serverUrl + 'listings')
    .then(data => data.json())
    .then(data =>
      {
        setListingsData(data);
      })
    }

    useEffect(() => {
      
      if (!listening) {
     
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = (event) => {
        console.log("new event received!");
    
        var parsedData = JSON.parse(event.data);
        console.log(parsedData);
        setListingsData(parsedData);
      };

      setListening(true);
    }
  }, [listening, listings]);

    return (
      
      <div className="App">
     
      
      <div style={{ width: '100%' }}>
      <Container>
        <div className='d-flex justify-content-center mt-4'>
         
        </div>
          <Row xs={1} md={3} lg={3} >
          {listings.map(listings => (
            <Card className='m-2' style={{ width: '18rem' }}>
            <Card.Body>
            <Link to={'/Listing/:'+listings.listingID} state = {{listingData: listings}}>
            <Card.Title>{listings.Year} {listings.Make} {listings.Model}</Card.Title>
            <Image thumbnail src={listings.mainPicture}  
            style={{minWidth: 220,maxWidth: 220,minHeight: 180,maxHeight: 180,}}/>
            </Link>

            <Card.Text>
            <Table striped bordered hover>
            <tr><td>
            <StopwatchFill color="red" size="40" /></td><td>{listings.timeDiff} {listings.timeFormat}</td>
            </tr>
    <tr><td><Coin color="blue" size="40" /></td><td>${listings.currentBid}</td></tr>
  </Table>
            </Card.Text>
            <tr><td>
            <InputGroup className="mb-3">
            <Form.Control
            placeholder={"min $" + (parseInt(listings.currentBid)+100)}
            aria-label="Custom Bid"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            />
            <Button variant="outline-secondary" id={listings.listingID}  onClick={e => submitCustomBid(e.target.id)}>
            Bid
            </Button>
            <Button variant="outline-secondary" id={listings.listingID}  onClick={e => submitCustomBid(e.target.id)}>
            +100
            </Button>
            </InputGroup>
            </td>
            </tr>
            </Card.Body>
            </Card>
          ))}

          </Row>
        </Container>
 </div>
      
      </div>
    );
  }

  export default App;
