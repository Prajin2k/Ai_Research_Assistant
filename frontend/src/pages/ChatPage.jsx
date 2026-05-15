import { useState, useEffect, useRef } from "react";

import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

function ChatPage() {

  const { id } = useParams();

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // AUTO SCROLL

  const chatEndRef = useRef(null);
useEffect(() => {

  const fetchChatHistory =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/chat/${id}`
          );

        setMessages(response.data);

      } catch (error) {

        console.log(error);
      }
    };

  fetchChatHistory();

}, [id]);
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // SEND QUESTION

  const sendQuestion = async () => {

    if (!question.trim()) {

      alert("Enter Question");

      return;
    }

    try {

      setLoading(true);

      // USER MESSAGE

      const userMessage = {

        sender: "user",

        text: question,

        time:
          new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      // API CALL

      const response = await axios.post(

        `http://localhost:5000/api/chat/${id}`,

        {
          question,
        }
      );

      // AI MESSAGE

      const aiMessage = {

        sender: "ai",

        text: response.data.answer,

        time:
          new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setQuestion("");

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Chat Failed");

      setLoading(false);
    }
  };

  return (

    <div className="container py-4">

      <h2 className="mb-4">
        AI Chat with PDF
      </h2>

      {/* CHAT BOX */}

      <div
        className="border rounded shadow-sm p-3 bg-light"
        style={{
          height: "500px",
          overflowY: "auto",
        }}
      >

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`d-flex mb-3 ${
              msg.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >

            <div
              style={{
                maxWidth: "75%",
              }}
            >

              <div
                style={{
                  background:
                    msg.sender === "user"
                      ? "#0d6efd"
                      : "#ffffff",

                  color:
                    msg.sender === "user"
                      ? "white"
                      : "black",

                  padding: "12px",

                  borderRadius: "12px",

                  boxShadow:
                    "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >

                <ReactMarkdown>{msg.text}</ReactMarkdown>

              </div>

              <div
                style={{
                  fontSize: "12px",

                  marginTop: "5px",

                  color: "gray",

                  textAlign:
                    msg.sender === "user"
                      ? "right"
                      : "left",
                }}
              >

                {msg.time}

              </div>

            </div>

          </div>
        ))}

        {/* LOADING */}

        {loading && (

          <div className="text-muted">

            AI is thinking...

          </div>
        )}

        {/* AUTO SCROLL */}

        <div ref={chatEndRef}></div>

      </div>

      {/* INPUT AREA */}

      <div className="d-flex mt-3">

        <input
          type="text"

          className="form-control"

          placeholder="Ask a question..."

          value={question}

          onChange={(e) =>
            setQuestion(e.target.value)
          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              sendQuestion();
            }
          }}
        />

        <button
          className="btn btn-primary ms-2"

          onClick={sendQuestion}

          disabled={loading}
        >

          {loading
            ? "Thinking..."
            : "Send"}

        </button>

      </div>

    </div>
  );
}

export default ChatPage;