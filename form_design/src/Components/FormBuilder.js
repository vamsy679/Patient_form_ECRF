import React, { useState, useEffect, Children, useRef, createRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import FieldBuilder from "./FieldBuilder";
import "./styles.css";
import { useForm } from "react-hook-form";
import Helper from "../Helper";
import { useNavigate } from "react-router-dom";



function FormBuilder(props) {

	let navigate = useNavigate();

	const [formName, setFormName] = useState( localStorage.getItem('name'));
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [isPersonal, setIsPersonal] = useState(true)
	const [isHide, setIshide] = useState("Hide")
	const [questionTypeList, setQuestionTypeList] = useState([])
	const [questions, setQuestion] = useState([]);
	const [isRequired, setIsRequired] = useState([false])
	const [permissions, setPermissions] = useState('Admin');
	const [options, setOptions] = useState([]);
	const [allQuestions, setAllQuestion] = useState([{
		"number":1,
		"description": null,
		"type": null,
		"options": null,
		"validation": null,
		"dependency": null,
		"condition": null,
		"permission": null,
		"required": null
	}])

	const [newQuestion, setNewQuestion] = useState([<FieldBuilder
				questionTypeList={questionTypeList}
				setQuestionTypeList={setQuestionTypeList}
				questions={questions}
				setQuestion={setQuestion}
				isRequired={isRequired}
				setIsRequired={setIsRequired}
				allQuestions={allQuestions}
				setAllQuestion={setAllQuestion}
				localIndex={0}
		/>]);

		const TextFile = (data) => {
			const element = document.createElement("a");
			const textFile = new Blob([JSON.stringify(data,null,4)], {type: "application/json"}); //pass data from localStorage API to blob
			element.href = URL.createObjectURL(textFile);
			element.download = "survey_definition.json";
			document.body.appendChild(element); 
			element.click();
		  }

	const submit = (e) => {
		e.preventDefault();
		
		
		let prepareQuestion = [];
		let fullname = fname+' '+lname


		allQuestions.map((key,index) => {

			let temOption;			
			if(Array.isArray(key.options))
				temOption = key.options;
			else if(key.options?.name)
				temOption = [parseInt(key.options.name), parseInt(key.options.label)]
			else
				temOption = null	
			
			prepareQuestion.push({
				"number": key.number,
				"description": key.description,
				"type": Helper.replaceType (key.type),
				"options":temOption, 
				"dependency": (key?.dependency)?key?.dependency:null,
				"condition": (key?.condition)?key?.condition:null,
				"permission": key.permission,
				"required": (key.required)?key.required:false,
			})
		})

		let json ={
			"accessCode": "Form_1.json",
			"respondents": ["abc0001", "abc0002", "abc0003", "abc0004", "abc0005"],
			"pages": [
				{
					"page_number": 1,
					"name": (!fullname.includes("null"))?fullname: null,
					"questions":prepareQuestion
				}	
			]
		};

		console.log("all in one ",json)
		let file_names  = JSON.parse(localStorage.getItem('tdde41-load'));
		file_names.push(formName);
		localStorage.setItem('tdde41-load', JSON.stringify(file_names))
		navigate("/created")
		TextFile(json)
	};


	const handlePersonal  = () =>{
			setIsPersonal(!isPersonal);
			setFname(null)
			setLname(null)
			if(isPersonal)
				setIshide("Show")
			else
				setIshide("Hide") 

	}

	useEffect(() => {
		console.log("myCheck",questionTypeList.includes('Radio').length );
	},[questionTypeList])

	useEffect(() => {
		console.log("sdfs",allQuestions)
	},[allQuestions])

	const addQuestion = () => {

		allQuestions.push({
			"number": allQuestions.length+1,
			"description": null,
			"type": null,
			"options": null,
			"validation": null,
			"dependency": null,
			"condition": null,
			"permission": null,
			"required": null
		})

		setNewQuestion([...newQuestion, <FieldBuilder 
			questionTypeList={questionTypeList}
			setQuestionTypeList={setQuestionTypeList}
				newQuestion={newQuestion}
				questions={questions}
				setQuestion={setQuestion}
				isRequired={isRequired}
				setIsRequired={setIsRequired}
				options={options}
				setOptions={setOptions}
				allQuestions={allQuestions}
				setAllQuestion={setAllQuestion}
				localIndex={allQuestions.length-1}
			/>]);

			
	};

	const removeQuestion = (index) => {
		let data = [...newQuestion];
		let tempQuestions = [...allQuestions];
		data.splice(index, 1);
		tempQuestions.splice(index,1)
		setAllQuestion(tempQuestions)
		setNewQuestion(data);
	};

	return (
		<>
			<Container style={{ paddingTop: 50, width: 900 }}>
				<Row>
					<Col>
						<div
							className="card mb-4"
							style={{ boxShadow: "5px 5px 15px 5px #cfcfcf" }}
						>
							<div className="card-header header-card">{formName}</div>
							<form className="form" onSubmit={submit} style={{ padding: 20 }}>
								<div>
									

							
									<div class="input-container">
										{isPersonal && <>
											
											<div className="question-wrapper">
											<span class="input-group-addon">
												<input
													class="input-style "	
													name="fname"
													placeholder="First Name.."
													type="text"
													onChange={(e)=>{setFname( e.target.value)}}
												/>
											</span>
											<input
												class="input-style "
												style={{ flex: " 0.5	 auto" }}
												name="lname"
												placeholder="Last Name..."
												required
												type="text"
												onChange={(e)=>{setLname( e.target.value)}}
											/>
										</div>
										
										</>}
										
										<Button onClick={handlePersonal} className="btn">{isHide}</Button>
									</div>
						
									
								
									{newQuestion.map((field, index) => {
										return (
											<>
												<h3>Question {index+1}</h3>
												{ field }												
												<div className="button-container">
													{index > 0 ? (
														<Button
															onClick={() => removeQuestion(index)}
															className="btn remove"
														>
															Remove Question
														</Button>
													) : null}	
												</div>

												<hr />
											</>
										);
									})}

									<div className="button-container">
											<input class="btn submit "  type="submit" value="SUBMIT"/>
											{/* <Button onClick={submit} className="btn submit ">Submit</Button> */}
											<Button onClick={addQuestion} disabled={(allQuestions.length>6)?true:false} className="btn btn-primary">
														Add New Question
											</Button>
									</div>	
								</div>
								
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default FormBuilder;
