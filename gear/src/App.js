import logo from './logo.svg';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {InputGroup, Form, Button, Card, Spinner } from 'react-bootstrap';
import './App.css';
import { serverUrl } from './routes/url'

function App() {

  const [listings, setListingsData] = useState([]);
  const [bid,setBid] = useState([]);
  const [bidResponse,setBidResponse] = useState([]);

  async function getListingInfo() {
      while (true) {
          var error = false;
          await axios.get('http://localhost:3001', { timeout: 1000 })
              .then(function (response) {
                  console.log(response.data);
                  setListingsData(response.data);
              })
              .catch(function (error) {
                  console.log('There was an error: ', error);
                  error = true;
              });
          if (error) {
              break;
          }
      }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setBid(e.target.value);
    console.log("bid input: "+ e.target.value);
  };

  const submitCustomBid = (e) => {
    console.log(e)
    console.log("about to submit custom bid to server...")


    axios.post('http://localhost:3001/listingBid', {'seller': e, 'bid': bid})
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
    //  refreshListings()
      getListingInfo();
    }, [])

    return (
      <div className="App">
      <Button onClick={refreshListings}>Refresh Listings</Button>
      <header className="App-header">
      {listings.map(listings => (
        <Card className='mb-3' style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Title>Seller: {listings.Seller}</Card.Title>
        <Card.Text>
        {listings.Year} {listings.Make} {listings.Model}
        Auction End: {listings.auctionEnd}
        Auction Start: {listings.auctionStart}
        Current bid: {listings.currentBid}
        </Card.Text>
        <Button variant="primary">Bid +100</Button>
        <InputGroup className="mb-3">
        <Form.Control
        placeholder="Custom Bid"
        aria-label="Custom Bid"
        aria-describedby="basic-addon2"
        onChange={handleChange}
        />
        <Button variant="outline-secondary" id={listings.Seller}  onClick={e => submitCustomBid(e.target.id)}>
        Bid
        </Button>
        </InputGroup>
        </Card.Body>
        </Card>
      ))}
      </header>
      </div>
    );
  }

  export default App;
