import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Table, Row, Col, Image, Container, InputGroup, Form, Button, Card, Spinner } from 'react-bootstrap';
import { StopwatchFill, Coin } from 'react-bootstrap-icons';
import './Root.css';
import { serverUrl } from '../routes/url'
import NavBar from '../Navbar';


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
      //refreshListings()
      getListingInfo();

      setInterval(() => {
        var today = new Date().toISOString();
        setDate(today);
      }, 1000); 

    }, [])

    return (
      <div className="App">
      
      
      <div style={{ width: '100%' }}>
      <NavBar/>
      <Container>
      <Button href={`/create`}>Create a Listing</Button>
          <Row xs={1} md={3} lg={3} >
          {listings.map(listings => (
            <Card className='m-2' style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{listings.Year} {listings.Make} {listings.Model}</Card.Title>
            <Image thumbnail src={listings.mainPicture}  
            style={{minWidth: 220,maxWidth: 220,minHeight: 180,maxHeight: 180,}}/>
            {listings.pictures.map(picture => (
              <Image thumbnail src={picture}  
              style={{minWidth: 110,maxWidth: 110,minHeight: 90,maxHeight: 90}}/>
            ))}

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
            <Button variant="outline-secondary" id={listings.Seller}  onClick={e => submitCustomBid(e.target.id)}>
            Bid
            </Button>
            <Button variant="outline-secondary" id={listings.Seller+'100'}  onClick={e => submitCustomBid(e.target.id)}>
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
