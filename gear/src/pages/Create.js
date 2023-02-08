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
        this.mainPictureInput = React.createRef();
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

        const form = new FormData();
        form.append("vin", this.state.vinNumber);
        form.append("description", this.state.description);
        form.append("mainPicture", this.mainPictureInput.current.files[0]);

        for (let file of this.pictureInput.current.files)
        {
            form.append("pictures", file);
        }

        const headers = {
            "Content-Type": "multipart/form-data"
          };
        axios.post(`${serverUrl}create`, form, headers)
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
                                <Form.Label htmlFor="mainPicture">Main Picture</Form.Label>
                                <Form.Control name="mainPicture" type="file" ref={this.mainPictureInput} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Label htmlFor="pictures">Pictures</Form.Label>
                                <Form.Control name="pictures" type="file" ref={this.pictureInput} multiple />
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