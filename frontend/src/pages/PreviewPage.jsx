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

        const response =
          await axios.get(
            "http://localhost:5000/api/history"
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

    return <h3>Loading...</h3>;
  }

  if (!file) {

    return <h3>File Not Found</h3>;
  }

  return (

    <div className="container-fluid">

      <div className="mb-4">

        <h2 className="fw-bold">

          File Preview

        </h2>

        <p className="text-muted">

          {file.title}

        </p>

      </div>

      {/* PDF PREVIEW */}

      {file.fileType === "pdf" ? (

        <iframe
          src={`http://localhost:5000/${file.fileUrl}`}

          title="PDF Preview"

          width="100%"

          height="700px"

          style={{
            border: "none",
            borderRadius: "10px",
          }}
        ></iframe>

      ) : (

        /* IMAGE PREVIEW */

        <div className="text-center">

          <img
            src={`http://localhost:5000/${file.fileUrl}`}

            alt={file.title}

            className="img-fluid rounded shadow"
          />

        </div>
      )}

    </div>
  );
}

export default PreviewPage;