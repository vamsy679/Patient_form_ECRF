import {render} from 'react-dom';
import { BrowserRouter,Routes,Route, } from "react-router-dom";
import './index.css';
import App from './App';
import FormBuilder from './Components/FormBuilder';
import FormSubmission from './Components/FormSubmission';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<FormBuilder />} />
      <Route path="/created" element={<FormSubmission />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);