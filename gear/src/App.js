import logo from './logo.svg';
import React, {useState,useEffect} from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import './App.css';


function App() {

const [listingsData, setListingsData] = useState(false);

useEffect(()=>{
    var listingsJson = require('./listings.json');
    setListingsData(listingsJson);
    console.log(listingsData);
}, [])


if (listingsData !== false){
  return (
    <div className="App">
      <header className="App-header">
       {listingsData.listings.map(listings => (
      <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Seller: {listings.seller}</Card.Title>
    <Card.Text>
{listings.year} {listings.make} {listings.model}
    </Card.Text>
    <Button variant="primary">Bid</Button>
  </Card.Body>
</Card>
))}
      </header>



    </div>
  );
}
}

export default App;
