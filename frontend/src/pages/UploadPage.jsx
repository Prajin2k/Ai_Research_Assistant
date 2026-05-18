import { useState } from "react";
import { toast } from "react-toastify";
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

      const token =
        localStorage.getItem("token");

      const response = await axios.post(

        "http://localhost:5000/api/upload/pdf",

        formData,

        {
          headers: {

            "Content-Type":
              "multipart/form-data",

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      toast.success(
        "File Uploaded Successfully"
      );

      setPdf(null);

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error("Upload Failed");

      setLoading(false);
    }
  };

  return (

    <div className="container py-5">

      <div
        className="shadow-lg border-0 p-4"
        style={{

          maxWidth: "650px",

          margin: "auto",

          borderRadius: "24px",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(14px)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          color: "white",

          boxShadow:
            "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >

        <h2
          className="text-center"
          style={{
            marginBottom: "30px",
            fontWeight: "700",
          }}
        >

          Upload Study Material

        </h2>

        <input
          type="file"

          className="form-control"

          accept=".pdf,image/*"

          onChange={handleFileChange}

          style={{

            background:
              "rgba(255,255,255,0.08)",

            color: "white",

            border:
              "1px solid rgba(255,255,255,0.1)",

            padding: "14px",

            borderRadius: "12px",
          }}
        />

        {pdf && (

          <div
            className="mt-4"
            style={{

              background:
                "rgba(255,255,255,0.06)",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: "14px",

              padding: "20px",
            }}
          >

            <p
              style={{
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >

              Selected File

            </p>

            <p
              style={{
                color: "#38bdf8",
                fontWeight: "600",
              }}
            >

              {pdf.name}

            </p>

            <small
              style={{
                color: "#cbd5e1",
              }}
            >

              Size:
              {" "}
              {(pdf.size / 1024 / 1024).toFixed(2)}
              {" "}MB

            </small>

          </div>
        )}

        <button
          className="btn w-100 mt-4"

          onClick={handleUpload}

          disabled={loading}

          style={{

            background:
              "linear-gradient(90deg,#38bdf8,#2563eb)",

            color: "white",

            border: "none",

            borderRadius: "12px",

            fontWeight: "600",

            padding: "14px",
          }}
        >

          {loading
            ? "Uploading..."
            : "Upload File"}

        </button>

        {loading && (

          <div className="text-center mt-4">

            <div
              className="spinner-border text-info"
              role="status"
            ></div>

            <p
              className="mt-3"
              style={{
                color: "#cbd5e1",
              }}
            >

              Processing File...

            </p>

          </div>
        )}

      </div>

    </div>
  );
}
export default UploadPage;