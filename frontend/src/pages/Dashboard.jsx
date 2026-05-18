import { useEffect, useState }from "react";
import {  useTheme,} from "../context/ThemeContext";
import axios from "axios";

import { useNavigate }from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const { darkMode } =useTheme();
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
      title: "Upload Files",

      count: files.length,

      color: "primary",

      path: "/upload",
    },

    {
      title: "AI Summary",

      count: files.length,

      color: "success",

      path: "/files",
    },

    {
      title: "AI Quiz",

      count: files.length,

      color: "warning",

      path: "/files",
    },

    {
      title: "AI Chat",

      count: files.length,

      color: "dark",

      path: "/files",
    },
  ];

  return (

    <div className="container-fluid">

      {/* HEADER */}

      <div className="mb-4">

        <h1 className="fw-bold">

          AI Research Assistant

        </h1>

        <p
  style={{
    color: darkMode
      ? "#d1d5db"
      : "#6b7280",
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
            className="col-md-3 mb-4"
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
    height: "140px",
    padding: "28px",
  }}
>

                <h5
  style={{
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "16px",
  }}
>

                  {item.title}

                </h5>

                <h2
  className="fw-bold"
  style={{
    fontSize: "3rem",
    lineHeight: "1",
  }}
>

                  {item.count}

                </h2>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* RECENT FILES */}

      <div
        className="border-0 shadow"
        style={{

  background:"rgba(14, 98, 233, 0.95)",


  backdropFilter:
    "blur(12px)",
boxShadow:
  "0 10px 35px rgba(0,0,0,0.35)",
  borderRadius: "20px",

  color:"white",    

  border:
   "1px solid rgba(255,255,255,0.12)",

  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
}}
      >

        <div
  className="card-body"
  style={{
    padding: "36px",
  }}
>

        <h4
  className="fw-bold"
  style={{
    fontSize: "2rem",
    marginBottom: "30px",
  }}
>

            Recent Uploads

          </h4>

          {recentFiles.length === 0 ? (

            <p>No files uploaded.</p>

          ) : (

            recentFiles.map((file) => (

              <div
  className="d-flex justify-content-between align-items-center"
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
    fontSize: "1.4rem",
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
    "linear-gradient(90deg,#38bdf8,#2563eb)",

                    color: "white",

  border: "none",

  borderRadius: "10px",

  fontWeight: "600",

 padding: "10px 22px",
}}

                  onClick={() =>
                    navigate(
                      `/preview/${file._id}`
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