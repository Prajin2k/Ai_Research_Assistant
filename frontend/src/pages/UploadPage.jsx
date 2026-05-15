import { useState } from "react";

import axios from "axios";

function UploadPage() {

  const [pdf, setPdf] = useState(null);

  const [loading, setLoading] =
    useState(false);

  // HANDLE FILE CHANGE

  const handleFileChange = (e) => {

    setPdf(e.target.files[0]);
  };

  // HANDLE UPLOAD

  const handleUpload = async () => {

    if (!pdf) {

      alert("Please select a file");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("pdf", pdf);

      const response = await axios.post(

        "http://localhost:5000/api/upload/pdf",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert(
        "File Uploaded Successfully"
      );

      setPdf(null);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

      setLoading(false);
    }
  };

  return (

    <div className="container py-5">

      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: "600px",
          margin: "auto",
          borderRadius: "20px",
        }}
      >

        <h2 className="mb-4 text-center">

          Upload Study Material

        </h2>

        {/* FILE INPUT */}

        <input
          type="file"

          className="form-control"

          accept=".pdf,image/*"

          onChange={handleFileChange}
        />

        {/* FILE DETAILS */}

        {pdf && (

          <div
            className="mt-3 p-3 bg-light rounded"
          >

            <p className="mb-1">

              <strong>Selected File:</strong>

            </p>

            <p className="text-primary">

              {pdf.name}

            </p>

            <p
              style={{
                fontSize: "14px",
                color: "gray",
              }}
            >

              Size:
              {" "}
              (
              {(
                pdf.size /
                1024 /
                1024
              ).toFixed(2)}
              {" "}MB)

            </p>

          </div>
        )}

        {/* UPLOAD BUTTON */}

        <button
          className="btn btn-primary mt-4"

          onClick={handleUpload}

          disabled={loading}
        >

          {loading
            ? "Uploading..."
            : "Upload File"}

        </button>

        {/* LOADING */}

        {loading && (

          <div
            className="text-center mt-3"
          >

            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <p className="mt-2">

              Processing File...

            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default UploadPage;