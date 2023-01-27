import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Row, Col,  Table , Button} from "react-bootstrap";
import "./styles.css";


function FormSubmission(props){

    return (
        <Container style={{ paddingTop: 50, width:1500 }}>
            <Row>
                <Col>
                    <div
                        className="card mb-4"
                        style={{ boxShadow: "5px 5px 15px 5px #cfcfcf" }}
                    >
                        <div className="card-header header-card"></div>
                        <div className="form" style={{ padding: 20 }}>
                            <div class="input-container">
                                <h1 className="centered">Form is Successfully Created!</h1>
                                <Link  className="btn btn-primary" to={'/'}> Go Back to Home Page</Link>  
                        </div>        
                      </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )          
}

export default FormSubmission;