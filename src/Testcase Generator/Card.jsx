import React from 'react';
import "./Card.css";

const Card = ({ index, item, onStatusChange, onCommentChange, onDevCommentChange }) => {
  const handleStatusChange = (testCaseIndex, stepIndex, event) => {
    const isPassed = event.target.value === 'true';
    onStatusChange(testCaseIndex, stepIndex, isPassed);
  };

  const handleCommentChange = (testCaseIndex, stepIndex, event) => {
    const comment = event.target.value;
    onCommentChange(testCaseIndex, stepIndex, comment);
  };

  const handleDevCommentChange = (testCaseIndex, stepIndex, event) => {
    const devComment = event.target.value;
    onDevCommentChange(testCaseIndex, stepIndex, devComment);
  };

  return (
    <div key={index} className='card'>
      <h3>{item.testCase}</h3>
      <ul>
        {item.steps.map((step, idx) => (
          <li key={idx} className={step.isPassed ? 'pass' : 'fail'}>
            <p><b>Step {idx + 1}</b> : {step.action}</p>
            <p><b>Expected Result:</b> {step.expectedOutcome}</p>
            <label htmlFor={`status-${index}-${idx}`}>Status: </label>
            <select
              id={`status-${index}-${idx}`}
              value={step.isPassed ? 'true' : 'false'}
              onChange={(e) => handleStatusChange(index, idx, e)}
            >
              <option value="true">Pass</option>
              <option value="false">Fail</option>
            </select>
            {!step.isPassed && (
              <>
                <textarea
                  className="comment"
                  placeholder="Add a comment"
                  value={step.comment}
                  onChange={(e) => handleCommentChange(index, idx, e)}
                />
                <textarea
                  className="dev-comment"
                  placeholder="Add a developer comment"
                  value={step.devComment}
                  onChange={(e) => handleDevCommentChange(index, idx, e)}
                />
              </>
            )}
            {step.isPassed && (
              <textarea
                className="dev-comment"
                placeholder="Add a developer comment"
                value={step.devComment}
                onChange={(e) => handleDevCommentChange(index, idx, e)}
                style={{ display: 'none' }} // Hide the developer comment textarea when the step is passed
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
