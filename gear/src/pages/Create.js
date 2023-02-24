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
    const startBid = useRef(null);
    const floorBid = useRef(null);
    const navigate = useNavigate();
    const [results,setResults] = useState();
    const [error,setError] = useState(false);
    const [vinDecoded, setVinDecoded] = useState(false);


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
      
    

    function onSubmit(event)
    {
        event.preventDefault();
  
        const form = new FormData();
        form.append("vinNum",vinNum.current.value);
        form.append("year",year.current.value)
        form.append("make",make.current.value)
        form.append("model",model.current.value)
        form.append("body", type.current.value)
        form.append("description", description);
        form.append("startBid", startBid.current.value)
        form.append("floorBid", floorBid.current.value)
  
        for (let file of pictureInput.current.files)
        {
            form.append("pictures", file);
        }

        const headers = {
            "Content-Type": "multipart/form-data"
        };
        axios.post(`${serverUrl}create`, form, headers)
        .then(res => {
            navigate("/")
        })
    }

    return( 
        
        <Container className="mt-4">
            
            <form method="POST" onSubmit={onSubmit}>
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
            
            <Button onClick={handleReset} type="submit">Create Listing</Button>
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
        <Form.Control name="VinNumber" value={vin} onChange={verifyVIN} ref={vinNum}/>
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
                  {`Year: ${results[10].Value}`}
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
                            <Form.Control name="Description" as="textarea"  onChange={e => setDescription(e.target.value)} ref={desc} />
                        </InputGroup>
                       
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
            </form>
        </Container>
    );
}
