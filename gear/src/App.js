import logo from './logo.svg';
import React, {useState,useEffect} from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import './App.css';
import { serverUrl } from './routes/url'

function App() {

const [listings, setListingsData] = useState([]);


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
  refreshListings()
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
    </Card.Text>
    <Button variant="primary">Bid</Button>
  </Card.Body>
</Card>
))}
      </header>
    </div>
  );
}

export default App;
