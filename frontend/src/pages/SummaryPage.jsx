import { useEffect, useState }
from "react";

import axios from "axios";

import { useParams }
from "react-router-dom";

import ReactMarkdown
from "react-markdown";

function SummaryPage() {

  const { id } = useParams();

  const [summary, setSummary] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // FETCH SUMMARY

  useEffect(() => {

    const fetchSummary =
      async () => {

        try {

          const response =
            await axios.get(
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

    fetchSummary();

  }, [id]);

  return (

    <div className="container py-4">

      <h2 className="fw-bold mb-4">

        AI Summary

      </h2>

      {loading ? (

        <h5>Generating Summary...</h5>

      ) : (

        <div
          className="shadow border-0 p-4"
         style={{
  borderRadius: "20px",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(12px)",

  color: "white",

  border:
    "1px solid rgba(255,255,255,0.08)",
}}
        >

          <ReactMarkdown>

            {summary}

          </ReactMarkdown>

        </div>
      )}

    </div>
  );
}

export default SummaryPage;