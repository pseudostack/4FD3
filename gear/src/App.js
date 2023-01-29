import logo from './logo.svg';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Table , Image, InputGroup, Form, Button, Card, Spinner } from 'react-bootstrap';
import './App.css';
import { serverUrl } from './routes/url'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  const [listings, setListingsData] = useState([]);
  const [bid,setBid] = useState([]);
  const [bidResponse,setBidResponse] = useState([]);
  const [date,setDate] = useState([]);


  async function getListingInfo() {
    while (true) {
      try {
              const response = await axios.get('http://localhost:3001', { timeout: 1000 })
              setListingsData(response.data);
      }

      catch (error) {
          console.log('There was an error: ', error);
          throw new Error(error);
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

      setInterval(() => {
        var today = new Date().toISOString();
        setDate(today);
      }, 1000); 

    }, [])

    return (
      <div className="App">
      <Button onClick={refreshListings}>Refresh Listings</Button>
      <header className="App-header">
      <div style={{ width: '100%' }}>

      <Container>
          <Row xs={1} md={3} lg={3} >
          {listings.map(listings => (
            <Card className='m-2' style={{ width: '18rem' }}>
            <Card.Body>
            <Image thumbnail src={'https://auctionlistingpics.s3.amazonaws.com/'+listings.mainpic+'.jpg'}/>
            <Card.Title>{listings.Year} {listings.Make} {listings.Model}</Card.Title>
            <Card.Text>
            <Table striped bordered hover>
            <tr>
    {Math.round((Date.parse(listings.auctionEnd)-Date.parse(date))/ (1000 * 3600 * 24)) > 0  && Math.round((Date.parse(listings.auctionEnd)-Date.parse(date))/ (1000 * 3600 * 24)) < 2 ?
    "Ends in" +  Math.round((Date.parse(listings.auctionEnd)-Date.parse(date))/(1000 * 3600 * 24)) + ' day' :
    Math.round((Date.parse(listings.auctionEnd)-Date.parse(date))/(1000 * 3600 * 24)) > 1  ?
    "Ends in " +  Math.round((Date.parse(listings.auctionEnd)-Date.parse(date))/(1000 * 3600 * 24)) + ' days':
    Math.round((Date.parse(listings.auctionEnd)-Date.parse(date))/ (1000 * 3600 * 24)) < 1 && Math.round((Date.parse(listings.auctionEnd)-Date.parse(date))/ (60 * 60*1000)) > 0?
    "Ends in " + new Date((Date.parse(listings.auctionEnd)-Date.parse(date))).getTime() : null
          }

<tr>{Math.floor((((new Date(listings.auctionEnd).getTime())-new Date(date).getTime())% 86400000) / 3600000)}</tr> {/* hours */ }
<tr>{Math.floor((((new Date(listings.auctionEnd).getTime()-new Date(date).getTime()) % 86400000) % 3600000) / 60000)}</tr> {/* minutes */ }
<tr>{Math.floor((((((new Date(listings.auctionEnd).getTime()-new Date(date).getTime()) % 86400000) % 3600000) / 60000)%1)*60)}</tr> {/* seconds */ }


    </tr>
    <tr>Current Bid: {listings.currentBid}</tr>
  <tr>Seller: {listings.Seller}</tr>
  </Table>
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
          </Row>
        </Container>
 </div>

      </header>
      </div>
    );
  }

  export default App;
