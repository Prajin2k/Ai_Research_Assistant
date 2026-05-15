import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

function HistoryPage() {

  const [pdfs, setPdfs] = useState([]);


  // FETCH PDFS
  const fetchPDFs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/history"
      );

      setPdfs(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchPDFs();

  }, []);


  return (
    <div>

      <h1 className="mb-4">
        Uploaded PDFs
      </h1>

      <div className="row">

        {pdfs.map((pdf) => (

          <div
            className="col-md-4 mb-4"
            key={pdf._id}
          >

            <div className="card shadow border-0">

              <div className="card-body">

                <h5 className="card-title">

                  {pdf.title}

                </h5>

                <p className="text-muted">

                  PDF Document

                </p>


                {/* BUTTONS */}

                <Link
                  to={`/summary/${pdf._id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Summary
                </Link>


                <Link
                  to={`/quiz/${pdf._id}`}
                  className="btn btn-success btn-sm me-2"
                >
                  Quiz
                </Link>


                <Link
                  to={`/chat/${pdf._id}`}
                  className="btn btn-dark btn-sm"
                >
                  Chat
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default HistoryPage;