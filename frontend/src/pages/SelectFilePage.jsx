import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

function SelectFilePage() {

  const navigate =
    useNavigate();

  const { feature } =
    useParams();

  const [files, setFiles] =
    useState([]);

  useEffect(() => {

    const fetchFiles =
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

          setFiles(
            response.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchFiles();

  }, []);

  const openFeature =
    (id) => {

      if (
        feature === "summary"
      ) {

        navigate(
          `/summary/${id}`
        );
      }

      if (
        feature === "quiz"
      ) {

        navigate(
          `/quiz/${id}`
        );
      }

      if (
        feature === "chat"
      ) {

        navigate(
          `/chat/${id}`
        );
      }

      if (
        feature ===
        "flashcards"
      ) {

        navigate(
          `/flashcards/${id}`
        );
      }
    };

  return (

    <div
      className="container py-4"
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
        className="fw-bold mb-4"
        style={{
          color: "white",
        }}
      >

        Select File for
        {" "}
        {feature
          ?.toUpperCase()}

      </h2>

      <div className="row">

        {files.map((file) => (

          <div
            className="col-12 col-md-6 col-lg-4 mb-4"
            key={file._id}
          >

            <div

              onClick={() =>
                openFeature(
                  file._id
                )
              }

              style={{

                background:
                  "rgba(30,41,59,0.95)",

                border:
                  "1px solid rgba(255,255,255,0.1)",

                borderRadius:
                  "20px",

                padding: "24px",

                color: "white",

                cursor: "pointer",

                transition:
                  "0.3s ease",

                height: "100%",
              }}

              onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                  "translateY(-5px)";
              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >

              <h5
                style={{
                  fontWeight: "600",
                }}
              >

                {file.title}

              </h5>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "12px",
                }}
              >

                Uploaded:
                {" "}

                {new Date(
                  file.createdAt
                ).toLocaleDateString()}

              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SelectFilePage;