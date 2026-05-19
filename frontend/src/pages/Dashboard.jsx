import { useEffect, useState }from "react";
import axios from "axios";

import { useNavigate }from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const [files, setFiles] =
    useState([]);

  useEffect(() => {

    const fetchFiles = async () => {

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

        setFiles(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchFiles();

  }, []);

  const recentFiles =
    files.slice(0, 5);

  const features = [

    {
      title: "AI Flashcards",

      count: files.length,

      color: "primary",

     path: "/select-file/flashcards",
    },

    {
      title: "AI Summary",

      count: files.length,

      color: "success",

      path: "/select-file/summary",
    },

    {
      title: "AI Quiz",

      count: files.length,

      color: "warning",

      path: "/select-file/quiz",
    },

    {
      title: "AI Chat",

      count: files.length,

      color: "dark",

      path: "/select-file/chat",
    },
  ];

  return (

    <div className="container-fluid px-lg-4 px-2">

      {/* HEADER */}

      <div className="mb-4">

      <h1
  className="fw-bold"
  style={{
    fontSize: "clamp(2rem,5vw,3.2rem)",
  }}
>

          AI Research Assistant

        </h1>

        <p
  style={{
    color: "#d1d5db",
  }}
>

  Manage files and interact
  with AI tools.

</p>

      </div>

      {/* STATS CARDS */}

      <div className="row">

        {features.map((item, index) => (

          <div
            className="col-12 col-sm-6 col-lg-3 mb-4"
            key={index}
          >

            <div
              className="border-0 shadow-lg"
              style={{

  borderRadius: "20px",

  cursor: "pointer",

  background:"rgba(30,41,59,0.95)",

  backdropFilter:
    "blur(12px)",
boxShadow:
  "0 10px 35px rgba(0,0,0,0.35)",
  border:
   "1px solid rgba(255,255,255,0.12)",

 color: "white",


  transition: "0.3s",
              }}
              

              onClick={() =>
                navigate(item.path)
              }
              onMouseEnter={(e) => {

  e.currentTarget.style.transform =
    "translateY(-5px)";
}}

onMouseLeave={(e) => {

  e.currentTarget.style.transform =
    "translateY(0px)";
}}
            >

              <div
  className="card-body d-flex flex-column justify-content-center"
  style={{
    minHeight: "170px",
    padding: "28px",
  }}
>

                <h5
  style={{
    fontSize: "clamp(1rem,2vw,1.2rem)",
    fontWeight: "600",
    marginBottom: "16px",
  }}
>

                  {item.title}

                </h5>
              <p
  style={{
    color: "#cbd5e1",
    fontSize: "clamp(0.9rem,2vw,1rem)",
    fontWeight: "500",
    lineHeight: "1.6",
  }}
>

  {item.title === "AI Flashcards" &&
    "Revise concepts with AI flashcards"}

  {item.title === "AI Summary" &&
    "Generate smart AI-powered summaries"}

  {item.title === "AI Quiz" &&
    "Practice with interactive quizzes"}

  {item.title === "AI Chat" &&
    "Chat intelligently with documents"}

</p>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* RECENT FILES */}

      <div
        className="border-0 shadow"
        style={{

 background:
  "rgba(30,41,59,0.95)",


  backdropFilter:
    "blur(12px)",
boxShadow:
  "0 10px 35px rgba(0,0,0,0.35)",
  borderRadius: "20px",
overflow: "hidden",
  color:"white",    

  border:
   "1px solid rgba(255,255,255,0.12)",

  boxShadow:
  "0 10px 35px rgba(0,0,0,0.35)",
}}
      >

        <div
  className="card-body"
  style={{
    padding: "clamp(18px,4vw,36px)",
  }}
>

        <h4
  className="fw-bold mb-4"
  style={{

    fontSize: "clamp(1.4rem,4vw,2rem)",

    background:
      "linear-gradient(90deg,#38bdf8,#2563eb)",

    WebkitBackgroundClip:
      "text",

    WebkitTextFillColor:
      "transparent",
  }}
>

  Recent Uploads

</h4>

          {recentFiles.length === 0 ? (

            <p>No files uploaded.</p>

          ) : (

            recentFiles.map((file) => (

              <div
  className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
  style={{
    padding: "24px 10px",

    borderBottom:
     "1px solid rgba(255,255,255,0.12)",
  }}
>

                <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >

                 <h6
  style={{
    fontSize: "clamp(1rem,3vw,1.4rem)",
    fontWeight: "600",
    marginBottom: "6px",
  }}
>

                    {file.title}

                  </h6>

                  <small style={{
  color: "#94a3b8",
  fontSize: "1rem",
}}>

                    {new Date(
                      file.createdAt
                    ).toLocaleDateString()}

                  </small>

                </div>

                <button
                  className="btn btn-sm"
                  style={{

  background:
    "rgba(15,23,42,0.85)",

  color: "#38bdf8",

  border:
    "1px solid rgba(56,189,248,0.25)",

  borderRadius: "12px",

  fontWeight: "600",

  padding: "8px 18px",

  transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {

  e.currentTarget.style.background =
    "#2563eb";

  e.currentTarget.style.color =
    "white";
}}

onMouseLeave={(e) => {

  e.currentTarget.style.background =
    "rgba(15,23,42,0.85)";

  e.currentTarget.style.color =
    "#38bdf8";
}}

                  onClick={() =>
                   navigate(
  `/file/${file._id}`
)
                  }
                >

                  Open

                </button>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;