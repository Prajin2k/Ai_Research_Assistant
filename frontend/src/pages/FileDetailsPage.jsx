import { useEffect, useState }
from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function FileDetailsPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [file, setFile] =
    useState(null);

  useEffect(() => {

    const fetchFile =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:5000/api/history",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const selectedFile =
          response.data.find(
            (item) =>
              item._id === id
          );

        setFile(selectedFile);

      } catch (error) {

        console.log(error);
      }
    };

    fetchFile();

  }, [id]);

  if (!file) {

    return (
      <h3 className="text-white">
        Loading...
      </h3>
    );
  }

  return (

    <div className="container py-4">

      <button
        className="btn mb-4"

        onClick={() =>
          navigate(-1)
        }

        style={{
          background: "#1e293b",
          color: "#f8fafc",
        }}
      >

        ← Back

      </button>

     <div
  className="p-4 p-md-5"
  style={{

    borderRadius: "28px",

    background:
     "linear-gradient(135deg,#0f172a,#111827,#020617)",

    backdropFilter:
      "blur(18px)",

    border:
    "1px solid rgba(56,189,248,0.12)",

    color: "#f8fafc",

    boxShadow:
      "0 20px 60px rgba(0,0,0,0.45)",
    minHeight: "85vh",
    overflow: "hidden",
  }}
>

  {/* HEADER */}

  <div className="text-center mb-5">

    <div
      style={{
        fontSize: "80px",
      }}
    >

      📄

    </div>

    <h1
      className="fw-bold mt-3"
      style={{

        fontSize:
          "clamp(2rem,5vw,3rem)",

        background:
          "linear-gradient(90deg,#38bdf8,#2563eb)",

        WebkitBackgroundClip:
          "text",

        WebkitTextFillColor:
          "transparent",
      }}
    >

      {file.title}

    </h1>

    <p
      style={{
        color: "#cbd5e1",
      }}
    >

      Select an AI feature
      to continue

    </p>

  </div>

  {/* ACTION CARDS */}

  <div className="row g-4">

    {/* PREVIEW */}

    <div className="col-md-6">

      <div
        onClick={() =>
          navigate(
            `/preview/${file._id}`
          )
        }

        style={{

          background:
            "rgba(15,23,42,0.85)",

          border:
            "1px solid rgba(56,189,248,0.15)",

          borderRadius: "22px",

          padding: "32px",

          cursor: "pointer",

          transition: "0.3s",
        }}

        onMouseEnter={(e) => {

          e.currentTarget.style.transform =
            "translateY(-8px)";
        }}

        onMouseLeave={(e) => {

          e.currentTarget.style.transform =
            "translateY(0px)";
        }}
      >

       <h2
  style={{
    color: "#38bdf8",
    fontWeight: "700",
  }}
>
  👁 Preview
</h2>

        <p
  className="mt-3"
  style={{
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.7",
  }}
>

          Open and preview
          uploaded document

        </p>

      </div>

    </div>

    {/* SUMMARY */}

    <div className="col-md-6">

      <div
        onClick={() =>
          navigate(
            `/summary/${file._id}`
          )
        }

        style={{

          background:
             "rgba(15,23,42,0.85)",

          border:
          "1px solid rgba(56,189,248,0.12)",

          borderRadius: "22px",

          padding: "32px",

          cursor: "pointer",

          transition: "0.3s",
        }}

        onMouseEnter={(e) => {

          e.currentTarget.style.transform =
            "translateY(-8px)";
        }}

        onMouseLeave={(e) => {

          e.currentTarget.style.transform =
            "translateY(0px)";
        }}
      >

        <h2
  style={{
    color: "#4ade80",
    fontWeight: "700",
  }}
>
  📝 AI Summary
</h2>

        <p
  className="mt-3"
  style={{
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.7",
  }}
>

          Generate concise AI
          summaries instantly

        </p>

      </div>

    </div>

    {/* QUIZ */}

    <div className="col-md-6">

      <div
        onClick={() =>
          navigate(
            `/quiz/${file._id}`
          )
        }

        style={{

          background:
            "rgba(15,23,42,0.85)",

          border:
          "1px solid rgba(56,189,248,0.12)",

          borderRadius: "22px",

          padding: "32px",

          cursor: "pointer",

          transition: "0.3s",
        }}

        onMouseEnter={(e) => {

          e.currentTarget.style.transform =
            "translateY(-8px)";
        }}

        onMouseLeave={(e) => {

          e.currentTarget.style.transform =
            "translateY(0px)";
        }}
      >

        <h2>❓ AI Quiz</h2>

        <p
  className="mt-3"
  style={{
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.7",
  }}
>

          Test knowledge with
          AI-generated MCQs

        </p>

      </div>

    </div>

    {/* CHAT */}

    <div className="col-md-6">

      <div
        onClick={() =>
          navigate(
            `/chat/${file._id}`
          )
        }

        style={{

          background:
            "rgba(15,23,42,0.85)",

          border:
          "1px solid rgba(56,189,248,0.12)",

          borderRadius: "22px",

          padding: "32px",

          cursor: "pointer",

          transition: "0.3s",
        }}

        onMouseEnter={(e) => {

          e.currentTarget.style.transform =
            "translateY(-8px)";
        }}

        onMouseLeave={(e) => {

          e.currentTarget.style.transform =
            "translateY(0px)";
        }}
      >

       <h2
  style={{
    color: "#c084fc",
    fontWeight: "700",
  }}
>
  💬 AI Chat
</h2>

        <p
  className="mt-3"
  style={{
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.7",
  }}
>

          Ask questions directly
          from uploaded files

              </p>
              

      </div>

          </div>
          
{/* FLASHCARDS */}

<div className="col-md-6">

  <div
    onClick={() =>
      navigate(
        `/flashcards/${file._id}`
      )
    }

    style={{

      background:
        "rgba(15,23,42,0.85)",

      border:
        "1px solid rgba(56,189,248,0.12)",

      borderRadius: "22px",

      padding: "32px",

      cursor: "pointer",

      transition: "0.3s",
    }}

    onMouseEnter={(e) => {

      e.currentTarget.style.transform =
        "translateY(-8px)";
    }}

    onMouseLeave={(e) => {

      e.currentTarget.style.transform =
        "translateY(0px)";
    }}
  >

    <h2
      style={{
        color: "#facc15",
        fontWeight: "700",
      }}
    >
      🧠 AI Flashcards
    </h2>

    <p
      className="mt-3"
      style={{
        color: "#cbd5e1",
        fontSize: "1rem",
        lineHeight: "1.7",
      }}
    >

      Study quickly with
      AI-generated flashcards

    </p>

  </div>

</div>
  </div>

</div>

    </div>
  );
}

export default FileDetailsPage;