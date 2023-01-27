import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Dropdown from "./Dropdown.js";
import "./styles.css";
import Switch from "react-switch";
import PropTypes from 'prop-types'
import { Trash, PlusCircle } from "phosphor-react";
import Helper from "../Helper";

FieldBuilder.propTypes = {
    setQuestionTypeList: PropTypes.func,
	questionTypeList: PropTypes.array,
	newQuestion:PropTypes.array,
	questions:PropTypes.array,
	setQuestion:PropTypes.func,
	isRequired:PropTypes.array,
	setIsRequired:PropTypes.func,
	allQuestions:PropTypes.array,
	setAllQuestion:PropTypes.func
}


function FieldBuilder({
				questionTypeList,
				setQuestionTypeList,
				newQuestion,
				questions,
				setQuestion,
				isRequired,
				setIsRequired,
				allQuestions,
				setAllQuestion,
				localIndex
			}) 
{
	const [inputType, setInputType] = useState('Teaxtarea');
	const [inputFields, setInputFields] = useState([ { name:"", label: ""}]);
	const [showButton, setShowButton] = useState('');
	const [toggleFlag, setToggleFlag] = useState(false);
	const [isDependent, setIsDependent] = useState(false)
	const [thisOptions, setThisOptions] = useState([]);
	const [permissions, setPermissions] = useState('Admin');
	const [local_Index , setLocalIndex] = useState(localIndex)
	

	const handleQtype = (data) => {
		if(data){
			let tempOptions = allQuestions[data-1]?.options;
			setThisOptions(tempOptions)
			setIsDependent(true)
		}else{
			setIsDependent(false)
		}
		const temQues = [...allQuestions]; 
		temQues[allQuestions.length -1].number = allQuestions.length ; 
		temQues[allQuestions.length -1].dependency = data; 

		setAllQuestion(temQues)

	};
	
	const optionHandler = (data) => {
		const temQues = [...allQuestions]; 
		temQues[allQuestions.length -1].condition = data; 
		setAllQuestion(temQues)
	};

	const handlePermission = (data) =>{
		console.log(data)
		setPermissions(data)
		const temQues = [...allQuestions]; 
		temQues[allQuestions.length-1].permission = data;
		setAllQuestion(temQues)
	}
	

	const eventhandler = (data) => {
			removeFields(1, inputFields.length);
			console.log("check")

			if (data === "Textarea") {
				setShowButton('');
			}
			else if(data === 'Radio' || data === 'Checkbox'){
				setShowButton('Radio');
				console.log("check")
			}else{
				setShowButton('Range')
			}

			setInputType(data);
			setQuestionTypeList([...questionTypeList,data])
			const temQues = [...allQuestions]; 
			temQues[allQuestions.length -1].type = data; 
			setAllQuestion(temQues)
	};

	const handleChange =  () => {
		
		setToggleFlag(!toggleFlag)
		setIsRequired([...isRequired, toggleFlag])

		const temQues = [...allQuestions]; 
		temQues[allQuestions.length -1].required = !toggleFlag; 
		setAllQuestion(temQues)
	}

	useEffect(() =>{
		setQuestion([...questions ,inputFields])
	}, [inputFields])
	

	const handleFormChange = (index, e) => {
		let data = [...inputFields];

		if(inputType === "Range"){
			if(e.target.name ===  'name')
				data[index][e.target.name] = e.target.value;
			else 
				data[index]['label'] = e.target.value;
		}
		else if(inputType === "Radio"){	
			data[index]['label'] = e.target.value;
			
		} else if(inputType === "Checkbox"){
			data[index]['label'] = e.target.value;
		}
		
		setInputFields(data);
		const temQues = [...allQuestions]; 
		temQues[allQuestions.length -1].options = (inputType==='Range')?data[0]: data.map(a=> a.label); 

		setAllQuestion(temQues);
		
	};

	const addFields = () => {
		let newfield = { name:"" ,label: ""};
		setInputFields([...inputFields, newfield])
	};

	const removeFields = (index, count) => {
		let data = [...inputFields];
		data.splice(index, count);
		setInputFields(data);
	};

	return (
		<>
			<div className="input-container">
				<div className="question-wrapper">
					<input
						style={{ flex: " 0.9 auto" }}
						class="input-style"
						type="text"
						name="question"
						required
						placeholder="Enter your Question here..."
						onChange={(e) => {
										const temQues = [...allQuestions]; 
										temQues[allQuestions.length-1].description = e.target.value; 
										setAllQuestion(temQues)
									}
								}
					/>
					<Dropdown dataItem={Helper.FieldTypes()} initial={"Textarea"} onChange={eventhandler} />
					{(showButton === 'Radio' ) && (
						<div>
							<PlusCircle size={30} onClick={addFields} />
						</div>
					)}
				</div>
				{inputFields.map((input, index) => {
					return (
						<div key={index}>
							<div class="input-group  details-container">
								{(showButton === 'Radio')? 
								(
									<div className="wrapper">
										<span class="input-group-addon">
											<input
												class="input-style "	
												name="name"
												placeholder="Enter your name.."
												disabled
												value={input.name}
												type={inputType}
												onChange={(Event) => handleFormChange(index, Event)}
											/>
										</span>
										<input
											class="input-style "
											style={{ flex: " 0.5	 auto" }}
											name="label"
											placeholder="Option"
											required
											value={input.label}
											checked={input.name}
											type="text"
											onChange={(Event) => handleFormChange(index, Event)}
										/>
										<div>
											<Trash size={30} onClick={() => removeFields(index, 1)} />
										</div>
									</div>
								): ( (showButton === 'Range') && 
									<div className="wrapper">
										<span class="input-group-addon">
											<input
												class="input-style "	
												name="name"
												placeholder="Min Number. . . "
												value={input.name}
												required
												type="text"
												onChange={(Event) => handleFormChange(index, Event)}
											/>
										</span>
										<input
											class="input-style "
											style={{ flex: " 0.5	 auto" }}
											name="label"
											placeholder="Max Number"
											required
											value={input.label}
											type="text"
											onChange={(Event) => handleFormChange(index, Event)}
										/>
									</div>
									)
								}
							</div>
						</div>
					);
				})}
				<div>
					<label>
						<span>Required</span>
							<Switch onChange={handleChange} checked={toggleFlag} />
					</label>

					{(questionTypeList.includes('Radio') && questionTypeList.length > 0  )
						&&
						 <div><Dropdown array={questionTypeList}  onChange={handleQtype}/></div>	
					}

					{
						(isDependent)
						&& <Dropdown options={thisOptions} onChange={optionHandler} />
					}
					{
						<Dropdown dataItem={Helper.permission()} initial={"Admin"} onChange={handlePermission}/>
					}
					
				</div>
			</div>
		</>
	);
}

export default FieldBuilder;
