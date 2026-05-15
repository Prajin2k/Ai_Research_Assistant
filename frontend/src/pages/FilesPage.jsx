import { useEffect, useState }
from "react";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

function FilesPage() {
const deleteFile = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this file?"
    );

  if (!confirmDelete) return;

  try {

    await axios.delete(

      `http://localhost:5000/api/history/${id}`
    );

    // REMOVE FROM UI

    setFiles((prev) =>
      prev.filter(
        (file) => file._id !== id
      )
    );

    alert("File Deleted");

  } catch (error) {

    console.log(error);

    alert("Delete Failed");
  }
};
  const [files, setFiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  // FETCH FILES

  useEffect(() => {

    const fetchFiles = async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/history"
          );

        setFiles(response.data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

    fetchFiles();

  }, []);

  return (

    <div className="container-fluid">

      <div className="mb-4">

        <h2 className="fw-bold">

          Uploaded Files

        </h2>

        <p className="text-muted">

          View and interact with
          uploaded documents.

        </p>

      </div>

      {loading ? (

        <h5>Loading...</h5>

      ) : (

        <div className="row">

          {files.map((file) => (

            <div
              className="col-md-4 mb-4"
              key={file._id}
            >

              <div
                className="card shadow border-0 h-100"
                style={{
                  borderRadius: "15px",
                }}
              >

                <div className="card-body">

                  <h5 className="fw-bold">

                    {file.title}

                  </h5>

                  <p className="text-muted">

                    {file.fileType}

                  </p>

                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >

                    Uploaded:
                    {" "}
                    {new Date(
                      file.createdAt
                    ).toLocaleDateString()}

                  </p>

                  {/* ACTION BUTTONS */}

                  <div className="d-flex gap-2 mt-3">

                    <button
                      className="btn btn-primary btn-sm"

                      onClick={() =>
                        navigate(
                          `/summary/${file._id}`
                        )
                      }
                    >

                      Summary

                    </button>

                    <button
                      className="btn btn-success btn-sm"

                      onClick={() =>
                        navigate(
                          `/quiz/${file._id}`
                        )
                      }
                    >

                      Quiz

                    </button>

                    <button
                      className="btn btn-dark btn-sm"

                      onClick={() =>
                        navigate(
                          `/chat/${file._id}`
                        )
                      }
                    >

                      Chat

                    </button>
                    <button
                        className="btn btn-danger btn-sm"

                        onClick={() =>
                            deleteFile(file._id)
                        }
                        >

                        Delete

                              </button>
                              <button
                            className="btn btn-secondary btn-sm"

                            onClick={() =>
                                navigate(
                                `/preview/${file._id}`
                                )
                            }
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