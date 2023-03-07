import { useRef, useState } from "react";
import * as React from 'react';
import {  Card, Container, Form, InputGroup, ModalBody } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { serverUrl } from '../routes/url'

export default function Create({user}) {

    console.log("logged in user is: " + user.userName)

    const [vin, setVin] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake]  = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [odo, setOdo] = useState('');
    const [trans, setTrans] = useState('');
    const [startBid, setStartBid ]= useState('');
    const [floorBid, setFloorBid] = useState('');
    const navigate = useNavigate();
    const [results,setResults] = useState();
    const [vinDecoded, setVinDecoded] = useState(false);
    const pictureInput = useRef(null);


    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 60,
      lineHeight: '60px',
      fontSize:'25px',
      paddingBottom:"150px",
      paddingLeft:"50px",
      paddingRight:"50px",
      transition: 'background-color 0.3s ease-in-out', 
      '&:hover': { 
        backgroundColor: 'lightgray',
        opacity:0.8
      }
      
    }));
    
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    

    
    const [startTime, setStartTime] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endTime, setEndTime] = React.useState(new Date('2014-08-18T21:11:54'));
    
    // Steps 
    const steps = ['Enter Vin Number', 'Car Details' ,'Create a Listing'];

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
    const isStepOptional = (step) => {
      return step === 1;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {

      // eslint-disable-next-line eqeqeq
      console.log("active step: " + activeStep)
      if (activeStep == 1)
      {
        console.log("here setting year?")
        setYear(results[10].Value)
        setMake(results[7].Value)
        setModel(results[9].Value)
        setType(results[23].Value)
        console.log("year set to: " + year)

      }
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
 
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
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
      
    

      const handleSubmit = (event) => 
    {
      console.log("here");
        event.preventDefault();

        const formData = new FormData();
        formData.append("userName", user.userName);
        formData.append("vinNum",vin);
        formData.append("year",year)
        formData.append("make",make)
        formData.append("model",model)
        formData.append("body", type)
        formData.append("color", color)
        formData.append("trans", trans)
        formData.append("odo",odo)
        formData.append("desc",description)
        formData.append("endTime" , endTime)
        formData.append("startTime", startTime)
        formData.append("startBid", startBid)
        formData.append("floorBid", floorBid)

 
        for (let file of pictureInput.current.files)
        {
          console.log("file here is: " + file)
            formData.append("pictures", file);
        }

   
              
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        axios.post(`${serverUrl}create`, formData, headers)
        .then(res => {
            navigate("/")
        })
       
            
 
    }

    return( 
        
        <Container className="mt-4">
            
            <form method="POST" onSubmit={handleSubmit}>
            <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {
            completed: undefined,
          };
          const labelProps = {
            optional: undefined,
          };
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
           Click on the create listing button to post your listing!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            
            <Button onClick={handleSubmit} type="submit">Create Listing</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 ?
          
          <>
          
          <InputGroup className="mb-3">                    
          <Typography sx={{ mt: 2, mb: 1 , pr: 3 }}>Vin Number: </Typography>       
          <Form.Label htmlFor="VinNumber"></Form.Label>
          <Form.Control name="VinNumber" value={vin} onChange={verifyVIN} />
          <Button variant="outline-secondary" id='vin'  onClick={e => decodeVIN(e.target.id)}>Decode VIN </Button>
          </InputGroup>


              </>
          :<></>
              
              }
        
        {activeStep === 1 && vinDecoded === true ? 
                        <>                    
                        <Grid container spacing={2}>
      
        <Grid item xs={6} >
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                
                p: 4,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr 1fr' },
                gap: 2,
                
              }}
            >
             <Item  key={year} elevation={4}>
                  {`Year: ${results[10].Value}` }
                </Item>
                <br/>
                <Item key={make} elevation={4}>
                  {`Make: ${results[7].Value}`}
                </Item>
                <br/>
                <Item key={model} elevation={4}>
                  {`Model: ${results[9].Value}`}
                </Item>
                <br/>
                <Item key={type} elevation={4}>
                  {`Type: ${results[23].Value}`}
                </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      
    </Grid>
                        </>
                    :<></>
                        
                        }
         {activeStep === 2 ?
                        
                        <>
                       
                       <InputGroup className="mb-3">
                            <Form.Label htmlFor="Description">Add a Description</Form.Label>
                            <Form.Control name="Description" as="textarea"  onChange={e => setDescription(e.target.value)} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="Color">Color</Form.Label>
                            <Form.Control name="Color" as="textarea"  onChange={e => setColor(e.target.value)} />
                        </InputGroup>
                       
                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="Odometer">Odometer</Form.Label>
                            <Form.Control name="Odometer" as="textarea"  onChange={e => setOdo(e.target.value)} />
                        </InputGroup>
                       
                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="Transmission">Transmission</Form.Label>
                            <Form.Control name="Transmission" as="textarea"  onChange={e => setTrans(e.target.value)} />
                        </InputGroup>
                       
                       
                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="StartBid">Starting Bid</Form.Label>
                            <Form.Control name="StartBid" as="textarea" defaultValue={0} onChange={e => setStartBid(e.target.value)} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="FloorBid">Floor Bid</Form.Label>
                            <Form.Control name="FloorBid" as="textarea" defaultValue={0} onChange={e => setFloorBid(e.target.value)} />
                        </InputGroup>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Auction Start Time"
        value={startTime}
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
                        </>
                    :<></>                 
                        }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep === steps.length - 1 ?
            <Button onClick={handleSubmit}>Confirm
            </Button>:
            <Button onClick={handleNext}>
              Next
            </Button>
}
          </Box>
        </React.Fragment>
      )}
            </form>
        </Container>
    );
}
