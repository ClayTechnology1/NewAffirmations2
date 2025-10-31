import { useState, useEffect } from "react";
import ReciteQuestion from "./components/ReciteQuestion";
import ReciteResults from "./components/ReciteResults";

export default function ReciteAffifirmations() {
  const [affirmations, setAffirmations] = useState([]);
  const [currentAffirmationQuestionNumber, setCurrentAffirmationQuestionNumber] = useState(0);
  const [affirmationIsAnswerCorrectList, setAffirmationIsAnswerCorrectList] = useState([]);

  const moveOntoNextAffirmation = (wasCorrect, answer) => {
    const newList = [
      ...affirmationIsAnswerCorrectList,
      { wasCorrect, userAnswer: answer },
    ];

    setAffirmationIsAnswerCorrectList(newList);

    if (currentAffirmationQuestionNumber + 1 < affirmations.length) {
      setCurrentAffirmationQuestionNumber(currentAffirmationQuestionNumber + 1);
    } else {
      setCurrentAffirmationQuestionNumber(-1); // Quiz finished
    }
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    fetch("http://localhost:3001/getAffirmationList")
      .then((res) => res.json())
      .then((data) => setAffirmations(shuffleArray(data)))
      .catch((err) => console.error("Error fetching affirmations:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Affirmations</h1>

      {affirmations.length === 0 ? (
        <p>
          No affirmations found, please add some <a href="/">here</a>.
        </p>
      ) : currentAffirmationQuestionNumber === -1 ? (
        <ReciteResults
          affirmations={affirmations}
          affirmationIsAnswerCorrectList={affirmationIsAnswerCorrectList}
        />
      ) : (
        <ReciteQuestion
          affirmationInput={affirmations[currentAffirmationQuestionNumber]}
          moveOntoNextAffirmation={moveOntoNextAffirmation}
        />
      )}
    </div>
  );
}
