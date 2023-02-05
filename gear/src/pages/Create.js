import React from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import axios from 'axios';

import { serverUrl } from '../routes/url'

export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onVinNumberChange = this.onVinNumberChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.pictureInput = React.createRef();
        this.state = { 
            vinNumber: '',
            description: ''
        }
    }

    onVinNumberChange(event) 
    {    
        this.setState({vinNumber: event.target.value});  
    }

    onDescriptionChange(event) 
    {    
        this.setState({description: event.target.value});  
    }

    onSubmit(event)
    {
        event.preventDefault();
        console.log(arguments);
        console.log(this.pictureInput)

        const form = new FormData();
        form.append("vinNumber", this.state.vinNumber);
        form.append("description", this.state.description);

        var picture =  this.pictureInput.current.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(picture);

        form.append("pictures", picture);

        const headers = {
            "Content-Type": "multipart/form-data"
          };
        axios.post(`${serverUrl}create`, form, headers)


        // axios.post(`${serverUrl}create`, {
        //     vinNumber: this.state.vinNumber,
        //     description: this.state.description,
        //     pictures: this.pictureInput.current.files
        // })
    }

    render (){
        return (
            <Container>
                <form method="POST" encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <Card>
                        <Card.Header>
                            Create a new Listing
                        </Card.Header>
                        <Card.Body>
                            <InputGroup className="mb-3">
                                <Form.Label htmlFor="VinNumber">VIN Number</Form.Label>
                                <Form.Control name="VinNumber" value={this.state.vinNumber} onChange={this.onVinNumberChange} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Label htmlFor="Description">Description</Form.Label>
                                <Form.Control name="Description" as="textarea" value={this.state.description} onChange={this.onDescriptionChange} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Label htmlFor="Pictures">Pictures</Form.Label>
                                <Form.Control name="Pictures" type="file" ref={this.pictureInput} />
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
}