import './App.css';
import Hero from './Hero/Hero';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './Navbar/Navbar';
import TestcaseGenerator from './Testcase Generator/TestcaseGenerator';
import DisplayTestcases from './Testcase Generator/DisplayTestcases';


function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Hero/>}/>
        <Route path="/test" element={<TestcaseGenerator/>}/>
        <Route path="/testcases" element={<DisplayTestcases/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
