import
{ useEffect, useState }
from "react";

import axios from "axios";

import { useParams }
from "react-router-dom";

function QuizPage() {

  const { id } = useParams();

  const [quiz, setQuiz] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // GENERATE QUIZ
  const generateQuiz = async () => {

    try {

      setLoading(true);

      const response = await axios.get(

        `http://localhost:5000/api/quiz/${id}`
      );

      setQuiz(response.data.quiz);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Failed to generate quiz");

      setLoading(false);
    }
  };


  useEffect(() => {

    generateQuiz();

  }, []);


  return (
    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>AI Quiz Generator</h1>

      {loading ? (

        <h4>Generating Quiz...</h4>

      ) : (

        <div
          style={{
            background: "#f4f4f4",
            padding: "20px",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >

          <h2>Generated Quiz</h2>

          <p><ReactMarkdown>{quiz}</ReactMarkdown></p>

        </div>
      )}

    </div>
  );
}

export default QuizPage;