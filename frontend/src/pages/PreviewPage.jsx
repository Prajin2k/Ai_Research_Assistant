
import { useEffect, useState }
from "react";

import axios from "axios";

import { useParams }
from "react-router-dom";

function PreviewPage() {

  const { id } = useParams();

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchFile = async () => {

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
            (item) => item._id === id
          );

        setFile(selectedFile);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

    fetchFile();

  }, [id]);

  if (loading) {

    return (
      <h3 className="text-white">
        Loading...
      </h3>
    );
  }

  if (!file) {

    return (
      <h3 className="text-white">
        File Not Found
      </h3>
    );
  }

  return (

    <div className="container-fluid">

      <div className="mb-4">

        <h2
          className="fw-bold text-white"
        >

          File Preview

        </h2>

        <p
          style={{
            color: "#cbd5e1",
          }}
        >

          {file.title}

        </p>

      </div>

      {file.fileType === "pdf" ? (

       <div className="text-center">

  <a
    href={`http://localhost:5000/${file.fileUrl}`}

    target="_blank"

    rel="noreferrer"

    className="btn"

    style={{

      background:
        "linear-gradient(90deg,#38bdf8,#2563eb)",

      color: "white",

      border: "none",

      borderRadius: "12px",

      padding: "14px 24px",

      fontWeight: "600",

      textDecoration: "none",
    }}
  >

    Open PDF Preview

  </a>

</div>

      ) : (

        <div className="text-center">

          <img
            src={`http://localhost:5000/${file.fileUrl}`}

            alt={file.title}

            className="img-fluid rounded shadow"

            style={{
              maxHeight: "800px",
              objectFit: "contain",
            }}
          />

        </div>
      )}

    </div>
  );
}

export default PreviewPage;

