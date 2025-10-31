import "./reciteResults.css";

export default function ReciteResults({ affirmations, affirmationIsAnswerCorrectList }) {
  // Calculate score
  const total = affirmationIsAnswerCorrectList.length;
  const correct = affirmationIsAnswerCorrectList.filter(a => a.wasCorrect).length;

  return (
    <div className="resultsContainer">
      <h2 className="resultsTitle">
        Your Score: {correct} / {total}
      </h2>

      <div className="resultsList">
        {affirmationIsAnswerCorrectList.map((result, i) => (
          <div
            key={i}
            className={`resultItem ${result.wasCorrect ? "correctItem" : "wrongItem"}`}
          >
            <div className="resultHeader">
              <span className="status">
                {result.wasCorrect ? "✅ Correct" : "❌ Incorrect"}
              </span>
            </div>

            <div className="resultContent">
              <div className="affirmationInfo">
                <strong>Affirmation #{affirmations[i].affirmationNumer}</strong>
              </div>

              <div className="userAnswer">
                <span className="label">Your answer:</span>{" "}
                <span className="answerText">{result.userAnswer}</span>
              </div>

              {!result.wasCorrect && (
                <div className="correctAnswerSection">
                  <span className="label">Right answer:</span>
                  <div className="correctAnswerBox">
                    {affirmations[i].affiramtion}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
