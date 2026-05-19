import { useEffect, useState }
from "react";

import axios from "axios";

import { useParams }
from "react-router-dom";
import { useNavigate }
from "react-router-dom";


function QuizPage() {
  
  
  const navigate =
  useNavigate();

  const { id } = useParams();

  const [quiz, setQuiz] =
    useState([]);
  
  const [currentQuestion,
setCurrentQuestion] =
  useState(0);

const [score, setScore] =
  useState(0);

const [selectedAnswer,
setSelectedAnswer] =
  useState(null);

const [showResult,
setShowResult] =
    useState(false);
  
  const [difficulty,
setDifficulty] =
  useState("");

const [quizStarted,
setQuizStarted] =
    useState(false);
  
  const [loading, setLoading] =
    useState(false);

  // FETCH QUIZ

  const fetchQuiz =
  async (level) => {

  try {

    setLoading(true);

    const response =
      await axios.get(

        `http://localhost:5000/api/quiz/${id}?difficulty=${level}`
      );

    setQuiz(
      response.data.quiz
    );

    setQuizStarted(true);

    setLoading(false);

  } catch (error) {

    console.log(error);

    setLoading(false);
  }
};

  const handleAnswer =
  (option) => {

  setSelectedAnswer(option);

  if (
    option ===
    quiz[currentQuestion]
      .answer
  ) {

    setScore(score + 1);
  }
    };
  const handleNext = () => {

  setSelectedAnswer(null);

  if (
    currentQuestion + 1 <
    quiz.length
  ) {

    setCurrentQuestion(
      currentQuestion + 1
    );

  } else {

    setShowResult(true);
     saveQuizResult();
  }
  };
  const saveQuizResult =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(

        "http://localhost:5000/api/quiz-results/save",

        {

          fileId: id,

          score: score,

          total: quiz.length,
        },

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );
 await axios.post(

  "https://hook.eu1.make.com/ihxptqp67c0aip42tygjvdrjtx6u3t5e",

  {

    score,

    total: quiz.length,

    percentage:
      Math.round(
        (score / quiz.length) * 100
      ),
      email:
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    )?.email,
  }
);
    } catch (error) {

      console.log(error);
    }
    };
 
  return (

    <div className="container py-4">
<button
  className="btn mb-4"

  onClick={() =>
    navigate(-1)
  }

  style={{

    background:
      "#1e293b",

    color: "white",

    border:
      "1px solid rgba(255,255,255,0.12)",

    borderRadius: "10px",

    padding: "10px 18px",

    fontWeight: "600",
  }}
>

  ← Back

</button>
      <h2 className="fw-bold mb-4">

        AI Quiz

      </h2>

      {!quizStarted ? (

  <div
    className="p-5 rounded text-center"
    style={{
      background: "#1e293b",
      color: "white",
    }}
  >

    <h3 className="mb-4">

      Select Difficulty

    </h3>

    <div className="d-flex gap-3 justify-content-center flex-wrap">

      <button
        className="btn btn-success"

        onClick={() => {

          setDifficulty("easy");

          fetchQuiz("easy");
        }}
      >

        Easy

      </button>

      <button
        className="btn btn-warning"

        onClick={() => {

          setDifficulty("moderate");

          fetchQuiz("moderate");
        }}
      >

        Moderate

      </button>

      <button
        className="btn btn-danger"

        onClick={() => {

          setDifficulty("hard");

          fetchQuiz("hard");
        }}
      >

        Hard

      </button>

    </div>

  </div>

) : loading ? (

  <h5>Generating Quiz...</h5>

) : (

  <>
    {quiz.length > 0 &&
    !showResult && (

      <div
        className="p-4 rounded"
        style={{

          background: "#1e293b",

          border:
            "1px solid rgba(255,255,255,0.12)",

          color: "white",
        }}
      >

        <h3 className="mb-4">

          Question
          {" "}
          {currentQuestion + 1}
          {" / "}
          {quiz.length}

        </h3>

        <h4 className="mb-4">

          {
            quiz[currentQuestion]
              .question
          }

        </h4>

        <div className="d-flex flex-column gap-3">

          {quiz[currentQuestion]
            .options.map(
              (option, index) => (

                <button
                  key={index}

                  className="btn"

                  disabled={
                    selectedAnswer
                  }

                  onClick={() =>
                    handleAnswer(option)
                  }

                  style={{

                    background:
                      selectedAnswer === option

                        ? option ===
                          quiz[
                            currentQuestion
                          ].answer

                          ? "#16a34a"

                          : "#dc2626"

                        : "#0f172a",

                    color: "white",

                    border:
                      "1px solid rgba(255,255,255,0.12)",

                    padding: "14px",

                    textAlign: "left",
                  }}
                >

                  {option}

                </button>
          ))}

        </div>

        {selectedAnswer && (

          <button
            className="btn btn-primary mt-4"

            onClick={handleNext}
          >

            Next Question

          </button>
        )}

      </div>
    )}

    {showResult && (

  <div
    className="p-5 rounded text-center"
    style={{

      background:
        "linear-gradient(135deg,#0f172a,#1e293b)",

      color: "white",

      border:
        "1px solid rgba(255,255,255,0.08)",

      boxShadow:
        "0 20px 50px rgba(0,0,0,0.35)",
    }}
  >

    <h1
      style={{
        fontWeight: "700",
      }}
    >

      🎉 Quiz Completed

    </h1>

    <h2
      className="mt-4"
      style={{
        color: "#38bdf8",
      }}
    >

      {score}
      {" / "}
      {quiz.length}

    </h2>

    <h4
      className="mt-3"
      style={{
        color: "#cbd5e1",
      }}
    >

      Accuracy:
      {" "}
      {Math.round(
        (score / quiz.length) * 100
      )}
      %

    </h4>

    {/* PROGRESS BAR */}

    <div
      className="mx-auto mt-4"
      style={{

        height: "18px",

        width: "80%",

        background:
          "rgba(255,255,255,0.08)",

        borderRadius: "30px",

        overflow: "hidden",
      }}
    >

      <div
        style={{

          height: "100%",

          width:
            `${(score / quiz.length) * 100}%`,

          background:
            "linear-gradient(90deg,#38bdf8,#2563eb)",

          borderRadius: "30px",

          transition:
            "1s ease",
        }}
      ></div>

    </div>

    {/* PERFORMANCE MESSAGE */}

    <div className="mt-5">

      {(score / quiz.length)
        >= 0.8 && (

        <h3
          style={{
            color: "#4ade80",
          }}
        >

          Excellent Performance 🚀

        </h3>
      )}

      {(score / quiz.length)
        >= 0.5 &&

        (score / quiz.length)
          < 0.8 && (

        <h3
          style={{
            color: "#facc15",
          }}
        >

          Good Job 👍

        </h3>
      )}

      {(score / quiz.length)
        < 0.5 && (

        <h3
          style={{
            color: "#f87171",
          }}
        >

          Keep Practicing 📚

        </h3>
      )}

    </div>

    {/* STATS */}

    <div
      className="d-flex justify-content-center gap-5 mt-5 flex-wrap"
    >

      <div>

        <h2
          style={{
            color: "#4ade80",
          }}
        >

          {score}

        </h2>

        <p>
          Correct
        </p>

      </div>

      <div>

        <h2
          style={{
            color: "#f87171",
          }}
        >

          {quiz.length - score}

        </h2>

        <p>
          Wrong
        </p>

      </div>

    </div>

  </div>
)}
  </>
)}

    </div>
  );
}

export default QuizPage;