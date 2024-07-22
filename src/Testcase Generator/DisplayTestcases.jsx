import React, { useState } from 'react';
import Card from './Card';
import "./DisplayTestcases.css";

const DisplayTestcases = () => {
  const [jsonContent, setJsonContent] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = e.target.result;
      try {
        const parsedJson = JSON.parse(json);
        setJsonContent(parsedJson); // Store parsed JSON content in state
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        // Handle error if JSON parsing fails
      }
    };
    reader.readAsText(file);
  };

  const handleStatusChange = (testCaseIndex, stepIndex, isPassed) => {
    const updatedContent = jsonContent.map((testCase, i) => {
      if (i === testCaseIndex) {
        const updatedSteps = testCase.steps.map((step, j) => {
          if (j === stepIndex) {
            return { ...step, isPassed };
          }
          return step;
        });
        return { ...testCase, steps: updatedSteps };
      }
      return testCase;
    });
    setJsonContent(updatedContent);
  };

  const handleCommentChange = (testCaseIndex, stepIndex, comment) => {
    const updatedContent = jsonContent.map((testCase, i) => {
      if (i === testCaseIndex) {
        const updatedSteps = testCase.steps.map((step, j) => {
          if (j === stepIndex) {
            return { ...step, comment };
          }
          return step;
        });
        return { ...testCase, steps: updatedSteps };
      }
      return testCase;
    });
    setJsonContent(updatedContent);
  };

  const handleDevCommentChange = (testCaseIndex, stepIndex, devComment) => {
    const updatedContent = jsonContent.map((testCase, i) => {
      if (i === testCaseIndex) {
        const updatedSteps = testCase.steps.map((step, j) => {
          if (j === stepIndex) {
            return { ...step, devComment };
          }
          return step;
        });
        return { ...testCase, steps: updatedSteps };
      }
      return testCase;
    });
    setJsonContent(updatedContent);
  };

  const handleDownload = () => {
    const fileData = JSON.stringify(jsonContent, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'updated_test_cases.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='d_container'>
      <input id='uploadJson' type="file" accept=".json" onChange={handleFileUpload} />
      {jsonContent.length > 0 && (
        <div>
          <h3>Generated Test Cases</h3>
          {jsonContent.map((item, index) => (
            <Card
              key={index}
              index={index}
              item={item}
              onStatusChange={handleStatusChange}
              onCommentChange={handleCommentChange}
              onDevCommentChange={handleDevCommentChange}
            />
          ))}
          <button onClick={handleDownload}>Download Updated JSON</button>
        </div>
      )}
    </div>
  );
};

export default DisplayTestcases;
