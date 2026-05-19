import { useEffect, useState }
from "react";

import axios from "axios";

import { useParams }
from "react-router-dom";

import { useNavigate }
from "react-router-dom";

function FlashcardPage() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [flashcards,
  setFlashcards] =
    useState([]);

  const [currentCard,
  setCurrentCard] =
    useState(0);

  const [flipped,
  setFlipped] =
    useState(false);

  const [loading,
  setLoading] =
    useState(true);

  useEffect(() => {

    const fetchFlashcards =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axios.get(

              `http://localhost:5000/api/flashcards/${id}`,

              {
                headers: {

                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setFlashcards(
            response.data.flashcards
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    fetchFlashcards();

  }, [id]);

  const nextCard = () => {

    setFlipped(false);

    if (
      currentCard + 1 <
      flashcards.length
    ) {

      setCurrentCard(
        currentCard + 1
      );
    }
  };

  const prevCard = () => {

    setFlipped(false);

    if (currentCard > 0) {

      setCurrentCard(
        currentCard - 1
      );
    }
  };

  if (loading) {

    return (
      <h3 className="text-white p-5">
        Generating Flashcards...
      </h3>
    );
  }

  return (

   <div
  className="container-fluid py-5"
  style={{

    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",

    paddingInline: "20px",
  }}
>

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

      <h2
        className="fw-bold text-center mb-5 text-white"
      >

        AI Flashcards

      </h2>

      {flashcards.length > 0 && (

        <div
          className="mx-auto"
          style={{
            maxWidth: "700px",
          }}
        >

          <div
  style={{
    perspective: "1200px",
  }}
>

  <div

    onClick={() =>
      setFlipped(!flipped)
    }

    style={{

      position: "relative",

      width: "100%",

      minHeight: "420px",

      transformStyle:
        "preserve-3d",

      transition:
        "transform 0.8s",

      transform: flipped

        ? "rotateY(180deg)"

        : "rotateY(0deg)",

      cursor: "pointer",
    }}
  >

    {/* FRONT SIDE */}

    <div
      style={{

        position: "absolute",

        width: "100%",

        minHeight: "420px",

        backfaceVisibility:
          "hidden",

        borderRadius: "30px",

        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",

        border:
          "1px solid rgba(255,255,255,0.08)",

        boxShadow:
          "0 25px 60px rgba(0,0,0,0.45)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        padding: "50px",

        textAlign: "center",

        color: "white",
      }}
    >

      <div>

        <p
          style={{
            color: "#38bdf8",
            fontWeight: "700",
            marginBottom: "25px",
            fontSize: "1.1rem",
          }}
        >

          Question

        </p>

        <h2
          style={{
            lineHeight: "1.8",
            fontWeight: "700",
            fontSize:
              "clamp(1.4rem,3vw,2rem)",
          }}
        >

          {
            flashcards[currentCard]
              .question
          }

        </h2>

      </div>

    </div>

    {/* BACK SIDE */}

    <div
      style={{

        position: "absolute",

        width: "100%",

        minHeight: "420px",

        backfaceVisibility:
          "hidden",

        transform:
          "rotateY(180deg)",

        borderRadius: "30px",

        background:
          "linear-gradient(135deg,#1e293b,#0f172a)",

        border:
          "1px solid rgba(255,255,255,0.08)",

        boxShadow:
          "0 25px 60px rgba(0,0,0,0.45)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        padding: "50px",

        textAlign: "center",

        color: "white",
      }}
    >

      <div>

        <p
          style={{
            color: "#4ade80",
            fontWeight: "700",
            marginBottom: "25px",
            fontSize: "1.1rem",
          }}
        >

          Answer

        </p>

        <h2
          style={{
            lineHeight: "1.8",
            fontWeight: "700",
            fontSize:
              "clamp(1.2rem,3vw,1.8rem)",
          }}
        >

          {
            flashcards[currentCard]
              .answer
          }

        </h2>

      </div>

    </div>

  </div>

</div>

          <div
            className="d-flex justify-content-between mt-4"
          >

            <button
              className="btn"

style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

  border: "none",

  color: "white",

  borderRadius: "14px",

  padding: "12px 24px",

  fontWeight: "600",

  boxShadow:
    "0 10px 25px rgba(37,99,235,0.35)",
}}

              onClick={prevCard}
            >

              Previous

            </button>

            <button
              className="btn"

style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

  border: "none",

  color: "white",

  borderRadius: "14px",

  padding: "12px 24px",

  fontWeight: "600",

  boxShadow:
    "0 10px 25px rgba(37,99,235,0.35)",
}}

              onClick={nextCard}
            >

              Next

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default FlashcardPage;