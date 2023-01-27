import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Row, Col,  Table , Button} from "react-bootstrap";
import "./styles.css";
import { useForm } from "react-hook-form";
  

function CreateForm (props) {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [formName, setFormName] = useState('myForm')
    const [formList, setFormList] = useState(JSON.parse(localStorage?.getItem('tdde41-load')))
    const onSubmit = data => {
        //console.log(data)
        window.open("http://localhost:3000/create")
    };


    const dir = 'C:/Users/lenovo/Downloads/tdde4_json' 


    useEffect(() => {
        localStorage.setItem('name', formName);
        console.log("sdf")
      }, [formName]);

    
    return (
        <Container style={{ paddingTop: 50, width:1500 }}>
            <Row>
                <Col>
                    <div
                        className="card mb-4"
                        style={{ boxShadow: "5px 5px 15px 5px #cfcfcf" }}
                    >
                        <div className="card-header header-card">Form List</div>
							<form className="form" style={{ padding: 20 }}>
                            <div class="input-container">
								<div className="question-wrapper">
									<input
                                        class="input-style "
                                        style={{ flex: " 0.5	 auto" }}
                                        name="name"
                                        placeholder="Form Name. . . "
                                        type="text"
                                        {...register("name", { required: "This is required." })}
                                         onChange={(e) => setFormName(e.target.value)}
                                    />
                                     {errors.name && <p style={{color:'red'}}>Please write form name</p>}

                                        {/* <input type="submit" className="btn btn-primary" value="Create New" /> */}
                                         <Link target="_blank" className="btn btn-primary" to={'/create'} onClick={handleSubmit(onSubmit)}> Create From</Link> 
                                        
										</div>
									</div>
                            </form>  
                        <hr></hr> 
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Form Name</th>
                                    <th>Edit</th>      
                                </tr>
                            </thead>
                            <tbody>
                            {formList.map((key, i) => {
                               
                                return (
                                    <tr>
                                         <td>{i+1}</td>
                                         <td>{key}</td>
                                         <td>Edit</td>
                                    </tr>
                                )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    
                </Col>
            </Row>
        </Container>
	);
}

export default CreateForm;