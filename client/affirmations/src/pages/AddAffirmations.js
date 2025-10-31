
import './affirmations.css';
import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function AddAffirmations() {
    const [affirmation, setAffirmation] = useState("");
  const textareaRef = useRef(null);
  const [affirmationList, setAffirmationList] = useState([])
  const [inEditMode, setInEditMode] = useState(0)

   useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        const response = await fetch("http://localhost:3001/getAffirmationList");
        const data = await response.json();
        setAffirmationList(data);
        console.log("Loaded affirmations:", data);
      } catch (error) {
        console.error("Error fetching affirmations:", error);
      }
    };

    fetchAffirmations();
  }, []); // empty dependency array = run once on mount

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to shrink if needed
    textarea.style.height = "auto";
    
    // Set height based on scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [affirmation]);


  const submitAffirmation = () =>{

    let prevAffList = affirmationList
    if (inEditMode > 0) {
      prevAffList[inEditMode].affiramtion = affirmation
      setInEditMode(0)
    } else {
      if (prevAffList.length === 0) {
        setAffirmationList([{affirmationNumer: 1, affiramtion: affirmation}])
      } else {
        setAffirmationList([...affirmationList, {affirmationNumer: affirmationList[affirmationList.length - 1].affirmationNumer + 1, affiramtion: affirmation}])
      }
    }
      
    
  }
  const editAffirmation = (affirmationindex) => {
    console.log("Affirmation idnex: " + affirmationindex)
    setAffirmation(affirmationList[affirmationindex].affiramtion)
    setInEditMode(affirmationindex)
  }

  const deleteAffirmation = (affiramtion, indexToRemove) => {
    //let indexToRemove = affiramtion.affirmationNumer - 1
    let affirmationListCopy = [...affirmationList]
    console.log("Index to remove: " + indexToRemove)
    console.log("Here")
    let newAffirmaitonList = affirmationList.filter((_, i) => i !== indexToRemove);

    console.log(newAffirmaitonList)
    setAffirmationList((affirmationList) => affirmationList.filter((_, i) => i !== indexToRemove));
  
  }

  const saveAffirmation = async () => {
    try {
    const response = await fetch("http://localhost:3001/affirmationStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(affirmationList), // send your array here
    });

    const result = await response.text();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Error sending affirmations:", error);
  }
  }

   
    return (

        <div className = "App">
            <div className='topDiv'>
                <textarea
              
      ref={textareaRef}
      value={affirmation}
      onChange={(e) => setAffirmation(e.target.value)}
      placeholder="Type something..."
      rows={1} // Start with one line
      className="affirmatioInput resize-none overflow-hidden w-full border rounded-xl p-2 text-base leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
    /> 
            </div>
            <button onClick={() => submitAffirmation()}>Submit</button>
          <div className='option saveButton' onClick={() => saveAffirmation()}>save</div>
          <a href="/ReciteAffifirmations">Recite Affirmations</a>
           
      <div>
        <h1>Affiramtion List</h1>
        
        <div>{affirmationList.map((affirmation, affirmationindex) => (
          <>
          <div className='gridItem'>
            <div>{affirmation.affiramtion}</div>
            <div className='affirmationEditOptions'>
          <div className='option' onClick={() => deleteAffirmation(affirmation, affirmationindex)}>Delete</div>
          <div className='option' onClick={() => editAffirmation(affirmationindex)}>Edit</div>

          
        </div>
          </div>
          </>
        ))}</div>
      </div>
    </div>
    
    );
}

export default AddAffirmations;