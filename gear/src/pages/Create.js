import { useRef, useState } from "react";
import * as React from 'react';
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import { serverUrl } from '../routes/url'

export default function Create() {
    const [vin, setVin] = useState('');
    const [description, setDescription] = useState('');
    const pictureInput = useRef(null);
    const vinNum = useRef(null);
    const year = useRef(null);
    const make  = useRef(null);
    const model = useRef(null);
    const type = useRef(null);
    const desc = useRef(null);
    const color = useRef(null);
    const odo = useRef(null)
    const trans = useRef(null);
    const startBid = useRef(null);
    const floorBid = useRef(null);
    const navigate = useNavigate();
    const [results,setResults] = useState();
    const [error,setError] = useState(false);
    const [vinDecoded, setVinDecoded] = useState(false);
    const [pics, setPics] = useState([]);


    const [startTime, setStartTime] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endTime, setEndTime] = React.useState(new Date('2014-08-18T21:11:54'));
 

    const decodeVIN = (e) => {
        console.log("Decoding vin?")

        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/" + vin +"?format=json")
        .then(response => response.json())
        .then(data => 
            {console.log(data.Results);
            setResults(data.Results);
            setVinDecoded(true);
            }
            );
      };

      const verifyVIN = (e) => {
        setVin(e.target.value);
        console.log("VIN: "+ e.target.value);
      };
      
    

    function onSubmit(event)
    {
        event.preventDefault();

        const form = new FormData();
        form.append("vin", vinNum);
        form.append("vin", year);
        form.append("vin", make);
        form.append("vin", model);
        form.append("vin", type);
        form.append("description", desc);


        for (let file of pictureInput.current.files)
        {
            formData.append("pictures", file);
        }

        console.log(vinNum.current.value)

        console.log("endtime: "+ endTime.current.value)
        



        const headers = {
            "Content-Type": "multipart/form-data"
        };a
        axios.post(`${serverUrl}create`, formData, headers)
        .then(res => {
            navigate("/")
        })
       
            
 
    }

    return (
        
        <Container className="mt-4">
            
            <form method="POST" onSubmit={onSubmit}>
                <Card>
                    <Card.Header>
                        Create a new Listing
                    </Card.Header>
                    <Card.Body>



                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="VinNumber">VIN Number</Form.Label>
                            <Form.Control name="VinNumber" value={vin} onChange={verifyVIN} ref={vinNum}/>
                            <Button variant="outline-secondary" id='vin'  onClick={e => decodeVIN(e.target.id)}>Decode VIN
            </Button>
                        </InputGroup>


                        {vinDecoded == true ?
                        
                        <>
                        <InputGroup className="mb-3">
                        <Form.Label htmlFor="Year">Year</Form.Label>
                        <Form.Control name="Year" as="textarea" value={results[10].Value} ref={year}/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                        <Form.Label htmlFor="Make">Make</Form.Label>
                        <Form.Control name="Year" as="textarea" value={results[7].Value} ref={make} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                        <Form.Label htmlFor="Model">Model</Form.Label>
                        <Form.Control name="Year" as="textarea" value={results[9].Value} ref={model}/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                        <Form.Label htmlFor="Type">Type</Form.Label>
                        <Form.Control name="Type" as="textarea" value={results[23].Value} ref={type}/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                        <Form.Label htmlFor="Type">Color</Form.Label>
                        <Form.Control name="Type" as="textarea"  ref={color}/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                        <Form.Label htmlFor="Type">Transmission</Form.Label>
                        <Form.Control name="Type" as="textarea"  ref={trans}/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                        <Form.Label htmlFor="Type">Odometer</Form.Label>
                        <Form.Control name="Type" as="textarea"  ref={odo}/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="Description">Description</Form.Label>
                            <Form.Control name="Description" as="textarea"  onChange={e => setDescription(e.target.value)} ref={desc} />
                        </InputGroup>


                        </>
                    :<></>
                        
                        }

                            <InputGroup className="mb-3">
                            <Form.Label htmlFor="StartBid">Starting Bid</Form.Label>
                            <Form.Control name="StartBid" as="textarea" defaultValue={0} ref={startBid} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="FloorBid">Floor Bid</Form.Label>
                            <Form.Control name="FloorBid" as="textarea" defaultValue={0} ref={floorBid} />
                        </InputGroup>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Auction Start Time"
        value={startTime}
        ref={startTime}
        format="YYY-MM-DD HH:MM:SS"
        onChange={(newValue) => {
          setStartTime(newValue);
        }}
      />
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Auction End Time"
        value={endTime}
        ref={endTime}
        format="YYY-MM-DD HH:MM:SS"
        onChange={(newValue) => {
          setEndTime(newValue);
        }}
      />
    </LocalizationProvider>


                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="pictures">Pictures</Form.Label>
                            <Form.Control name="pictures" type="file" ref={pictureInput} multiple />
                        </InputGroup>
                       
                    </Card.Body>
                    <Card.Footer>
                        <Button color="primary" type="submit">Create Listing</Button>
                    </Card.Footer>
                </Card>
            </form>
        </Container>
    )
}