import { useEffect, useState }
from "react";

import axios from "axios";

import { useParams }
from "react-router-dom";

function SummaryPage() {

  const { id } = useParams();

  const [summary, setSummary] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // FETCH SUMMARY
  const generateSummary = async () => {

    try {

      setLoading(true);

      const response = await axios.get(

        `http://localhost:5000/api/ai/summary/${id}`
      );

      setSummary(
        response.data.summary
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };


  useEffect(() => {

    generateSummary();

  }, []);


  return (
    <div>

      <h1 className="mb-4">
        AI Summary
      </h1>

      {loading ? (

        <h4>Generating Summary...</h4>

      ) : (

        <div className="card shadow border-0">

          <div className="card-body">

            <p
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              <ReactMarkdown> {summary}</ReactMarkdown>
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default SummaryPage;