import { useState } from "react";
import "./reciteQuestion.css";

export default function ReciteQuestion({ affirmationInput, moveOntoNextAffirmation }) {
  const [userInputedAffirmation, setAffirmation] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isUserSubmissionCorrect, setIsUserSubmissionCorrect] = useState(null);

  const onSubmit = () => {
    const submittedAffirmation = userInputedAffirmation.trim().toLowerCase();
    const correctAffirmation = affirmationInput.affiramtion.trim().toLowerCase();

    if (submittedAffirmation === correctAffirmation) {
      setIsUserSubmissionCorrect(true);
    } else {
      setIsUserSubmissionCorrect(false);
    }

    setHasSubmitted(true);
  };

  const retry = () => {
    // placeholder for retry logic
  };

  const next = () => {
    // placeholder for next logic
    moveOntoNextAffirmation(isUserSubmissionCorrect, userInputedAffirmation)
    setIsUserSubmissionCorrect(undefined)
    setHasSubmitted(false)
};

  return (
    <div className="reciteQuestionDiv">
      <div className="questionHeader">
        <h2>
          Affirmation number{" "}
          <span className="highlight">{affirmationInput.affirmationNumer}</span>
        </h2>
      </div>

      {!hasSubmitted ? (
        <>
          <div className="questionText">
            Please type affirmation number{" "}
            <span className="highlight">{affirmationInput.affirmationNumer}</span> below:
          </div>

          <div className="inputSection">
            <textarea
              className="affirmationTextbox"
              value={userInputedAffirmation}
              onChange={(e) => setAffirmation(e.target.value)}
              placeholder="Type your affirmation here..."
              rows={3}
            />

            <button onClick={onSubmit} className="submitButton">
              Submit
            </button>
          </div>
        </>
      ) : (
        <div className="resultSection">
          {isUserSubmissionCorrect ? (
            <div className="result correct">✅ Correct!</div>
          ) : (
            <>
              <div className="result incorrect">❌ Incorrect</div>
              <div className="correctAnswer">
                Correct affirmation:{" "}
                <span className="highlight">
                  {affirmationInput.affiramtion}
                </span>
                
              </div>
              
              <div className="yourAnswer">
                <div className="yourAnswerDiv">Your affirmation:{" "}{userInputedAffirmation}</div></div>
            </>
          )}

          <div className="buttonGroup">
            <button onClick={retry} className="retryButton">
              Retry
            </button>
            <button onClick={next} className="nextButton">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
