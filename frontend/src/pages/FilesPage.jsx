import { useEffect, useState } from "react";
import {
  useTheme,
} from "../context/ThemeContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FilesPage() {
  const { darkMode } =
  useTheme();
const deleteFile = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this file?"
    );

  if (!confirmDelete) return;

  try {
const token =
  localStorage.getItem("token");

await axios.delete(

  `http://localhost:5000/api/history/${id}`,

  {
    headers: {

      Authorization:
        `Bearer ${token}`,
    },
  }
);

    // REMOVE FROM UI

    setFiles((prev) =>
      prev.filter(
        (file) => file._id !== id
      )
    );

    toast.success("File Deleted");

  } catch (error) {

    console.log(error);

    toast.error("Delete Failed");
  }
};
  const [files, setFiles] =
    useState([]);
    const [search, setSearch] =
  useState("");
  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  // FETCH FILES

    useEffect(() => {

        const fetchFiles = async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                console.log(token);

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

                setLoading(false);

            } catch (error) {

                console.log(
                    error.response?.data
                );

                setLoading(false);
            }
        };
        fetchFiles();
    }, []);
const filteredFiles =
  files.filter((file) =>

    file.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );
  return (

    <div className="container-fluid">

      <div className="mb-4">

        <h2 className="fw-bold">

          Uploaded Files

        </h2>

        <p style={{
  color: darkMode
  ? "#cbd5e1"
  : "#475569",
}}>

          View and interact with
          uploaded documents.

        </p>
    {/* SEARCH BAR */}

<div className="mb-4">

  <input
    type="text"

    className="form-control"

    placeholder="Search files..."

    value={search}

    onChange={(e) =>
      setSearch(e.target.value)
    }
            style={{

  background:
    "rgba(255,255,255,0.08)",

  color: "white",

  border:
    "1px solid rgba(255,255,255,0.08)",

              borderRadius: "12px",
  padding: "14px",
}}
  />

              </div>
              <p style={{
 color: darkMode
  ? "#cbd5e1"
  : "#475569",
}}>

  Total Files:
  {" "}
  {filteredFiles.length}

</p>
      </div>

      {loading ? (

        <h5>Loading...</h5>

      ) : (

        <div className="row">

          {filteredFiles.map((file) => (

            <div
             className="col-lg-4 col-md-6 mb-5"
              key={file._id}
            >

              <div
  className="border-0 shadow h-100"
  style={{

  borderRadius: "20px",
    minHeight:"520px",
  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(12px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

 color: "white",

  transition: "0.3s",

    cursor: "pointer",
  boxShadow:
  "0 10px 30px rgba(0,0,0,0.25)",
}}

  onMouseEnter={(e) => {

    e.currentTarget.style.transform =
      "translateY(-8px) scale(1.02)";
  }}

  onMouseLeave={(e) => {

    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>
                

               <div
                  className="card-body"
                  style={{
                    padding: "24px",
                  }}
>
                    {/* FILE PREVIEW */}

<div className="text-center mb-3">

  {file.fileType === "image" ? (

    <img
  src={`http://localhost:5000/${file.fileUrl}`}

  alt={file.title}

  className="img-fluid rounded"

  style={{
    height: "180px",
    objectFit: "cover",
    width: "100%",
  }}

    />

  ) : (

    <div
      className="d-flex justify-content-center align-items-center rounded"
      style={{

  height: "180px",

  background:
    "rgba(255,255,255,0.06)",

  border:
    "1px solid rgba(255,255,255,0.08)",
}}
    >

      <h1
        style={{
          fontSize: "70px",
        }}
      >

        📄

      </h1>

    </div>
  )}

</div>
                <h5
  className="fw-bold"
  style={{
    fontSize: "1.6rem",
    marginBottom: "12px",
    lineHeight: "1.3",
  }}
>

                    {file.title.length > 22

  ? file.title.slice(0, 22) + "..."

  : file.title}

                  </h5>

                  <p
  style={{
    color: darkMode
      ? "#cbd5e1"
      : "#475569",

    fontSize: "1rem",

    marginBottom: "14px",
  }}
>

                    {file.fileType}
                   
                  </p>

                  <p
                    style={{
                      fontSize: "1rem",

color: "#94a3b8",

marginBottom: "22px",
                    }}
                  >

                    Uploaded:
                    {" "}
                    {new Date(
                      file.createdAt
                    ).toLocaleDateString()}

                  </p>

                  {/* ACTION BUTTONS */}

                  <div className="d-flex flex-wrap"
                 style={{
  gap: "12px",
}} >

                    <button
                      className="btn btn-sm"

                      onClick={() =>
                        navigate(
                          `/summary/${file._id}`
                        )
                      }
                      style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

  color: "white",

  border: "none",

  borderRadius: "10px",

                        fontWeight: "600",
  padding: "10px 18px",
}}
                    >

                      Summary

                    </button>

                    <button
                      className="btn btn-sm"

                      onClick={() =>
                        navigate(
                          `/quiz/${file._id}`
                        )
                      }
                      style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

  color: "white",

  border: "none",

  borderRadius: "10px",

                        fontWeight: "600",
  padding: "10px 18px",
}}
                    >

                      Quiz

                    </button>

                    <button
                      
                      className="btn btn-sm"

                      onClick={() =>
                        navigate(
                          `/chat/${file._id}`
                        )
                      }
                      style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

  color: "white",

  border: "none",

  borderRadius: "10px",

                        fontWeight: "600",
  padding: "10px 18px",
}}
                    >

                      Chat

                    </button>
                    <button
                        className="btn btn-sm"

                        onClick={() =>
                            deleteFile(file._id)
                        }
                      style={{

  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",

  color: "white",

  border: "none",

  borderRadius: "10px",

                        fontWeight: "600",
  padding: "10px 18px",
}}
                        >

                        Delete

                              </button>
                              <button
                            className="btn btn-sm"

                            onClick={() =>
                                navigate(
                                `/preview/${file._id}`
                                )
                            }
                      style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

color: "white",

  border: "none",

  borderRadius: "10px",

                        fontWeight: "600",
  padding: "10px 18px",
}}
                            >

                            Preview

                            </button>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default FilesPage;