import React, { useRef, useState } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { serverUrl } from '../routes/url'

export default function Create() {
    const [vin, setVin] = useState('');
    const [description, setDescription] = useState('');
    const mainPictureInput = useRef(null);
    const pictureInput = useRef(null);
    const navigate = useNavigate();

    function onSubmit(event)
    {
        event.preventDefault();

        const form = new FormData();
        form.append("vin", vin);
        form.append("description", description);
        form.append("mainPicture", mainPictureInput.current.files[0]);

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
                            <Form.Control name="VinNumber" value={vin} onChange={e => setVin(e.target.value)} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="Description">Description</Form.Label>
                            <Form.Control name="Description" as="textarea" value={description} onChange={e => setDescription(e.target.value)} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Label htmlFor="mainPicture">Main Picture</Form.Label>
                            <Form.Control name="mainPicture" type="file" ref={mainPictureInput} />
                        </InputGroup>

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