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

    <div className="container-fluid px-lg-4 px-2">
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
      <div className="mb-4">

        <h2
  className="fw-bold"
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

  onClick={() =>
    navigate(`/file/${file._id}`)
  }
  style={{

  borderRadius: "20px",
    minHeight: "460px",
    overflow: "hidden",

position: "relative",

transition:
  "all 0.35s ease",
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
    "translateY(-10px)";

  e.currentTarget.style.boxShadow =
    "0 20px 40px rgba(37,99,235,0.25)";

  e.currentTarget.style.border =
    "1px solid rgba(56,189,248,0.4)";
}}

onMouseLeave={(e) => {

  e.currentTarget.style.transform =
    "translateY(0px)";

  e.currentTarget.style.boxShadow =
    "0 10px 30px rgba(0,0,0,0.25)";

  e.currentTarget.style.border =
    "1px solid rgba(255,255,255,0.08)";
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
    fontSize: "1.35rem",

fontWeight: "700",

minHeight: "60px",
    marginBottom: "12px",
    lineHeight: "1.3",
  }}
>

                    {file.title.length > 22

  ? file.title.slice(0, 22) + "..."

  : file.title}

                  </h5>

                  <div className="mb-3">

  <span
    style={{

      background:
        file.fileType === "pdf"

          ? "rgba(239,68,68,0.2)"

          : "rgba(34,197,94,0.2)",

      color:
        file.fileType === "pdf"

          ? "#f87171"

          : "#4ade80",

      padding: "6px 14px",

      borderRadius: "30px",

      fontSize: "0.85rem",

      fontWeight: "600",
    }}
  >

    {file.fileType.toUpperCase()}

  </span>

</div>

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

                        onClick={(e) => {

  e.stopPropagation();

  deleteFile(file._id);
}}
                      style={{

  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",

  color: "white",

  border: "none",

  borderRadius: "10px",

                        fontWeight: "600",
  padding: "12px 18px",

width: "100%",
}}
                        >

                        Delete

                              </button>
                              <button
                            className="btn btn-sm"

                           onClick={(e) => {

  e.stopPropagation();

  navigate(
    `/preview/${file._id}`
  );
}}
                      style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

  color: "white",

  border: "none",

  borderRadius: "14px",

  fontWeight: "700",

  padding: "12px 18px",

  width: "100%",

  transition: "0.3s",
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