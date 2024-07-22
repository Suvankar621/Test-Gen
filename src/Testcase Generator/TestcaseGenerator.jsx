import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "./Testcasegenerator.css"
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const TestcaseGenerator = () => {
  const [xmlContent, setXmlContent] = useState(null);
  const [text, setText] = useState(null);
  const [isLoading, setisLoading] = useState(false);  // State to store generated text response
  const genAi = new GoogleGenerativeAI('AIzaSyCDlCpViCC3QgPCThe0A2YmAXd4Mo8VgtM');
  const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash'
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const xml = e.target.result;
      setXmlContent(xml); // Store XML content in state
    };
    reader.readAsText(file);
  };

  const generate = async () => {
    setisLoading(true)
    const prompt = `${xmlContent} use this data and write testcases and steps and write it into array,and add one more attribute for teststep and testcases "isPassed" by default false. and add one comment attribute and dev comment by defauls blank also. do not write anything other. and do not write backtick and json or any other comments. follow this format only : [
  {
    "testCase": "User navigates to Upcoming Cars Section",
    "steps": [
      {
        "action": "Click on the 'Upcoming Cars' link",
        "expectedOutcome": "The page should navigate to the Upcoming Cars section"
      }
    ]
  },
  {
    "testCase": "User selects a car manufacturer from the dropdown",
    "steps": [
      {
        "action": "Click on the 'Manufacturers' dropdown",
        "expectedOutcome": "The dropdown should expand showing the list of manufacturers"
      },
      {
        "action": "Select a specific manufacturer from the list",
        "expectedOutcome": "The selected manufacturer should be displayed in the dropdown"
      }
    ]
  },
  {
    "testCase": "User loads more upcoming car results",
    "steps": [
      {
        "action": "Click on the 'View More Cars' button",
        "expectedOutcome": "Additional upcoming car results should be loaded and displayed"
      }
    ]
  }
]`;
    
    const res = await model.generateContent(prompt);
    const responseText = res.response.text();
    setText(responseText);
    setisLoading(false)
  };

  const handleDownload = () => {
    if (text) {
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_test_cases.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
if(isLoading){
    return <Loader/>
}
  return (
    <div className='t_Container'>
      <label>Upload Scanned XML File.........</label>
      <input type="file" accept=".xml" onChange={handleFileUpload} />
      <div className="button">
      <button className='generate' onClick={generate}>Generate</button>
      <Link to={"/testcases"}><button className='tc'>See Test Cases</button></Link>
      
      </div>
     
      
      {text && (
        <div className='generated_testcases'>
          <h3>Generated Test Cases in JSON</h3>
          <pre>{text}</pre>
          <button onClick={handleDownload}>Download JSON</button>
        </div>
      )}
    </div>
  );
};

export default TestcaseGenerator;
