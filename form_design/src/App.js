import React,{useState,useEffect} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FormSubmission from './Components/FormSubmission'
import CreateForm from './Components/CreateForm';
function App() {
  //localStorage.setItem('tdde41-load',JSON.stringify(['intial']))

  return (
    <div className="App">
      <CreateForm/>
    </div>
  );
}

export default App;
