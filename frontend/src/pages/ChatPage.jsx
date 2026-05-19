import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  FaPaperPlane,
} from "react-icons/fa";
import {
  FaMicrophone,
} from "react-icons/fa";
import { useNavigate }
from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import {
  useTheme,
} from "../context/ThemeContext";
function ChatPage() {
const { darkMode } =
  useTheme();
  const { id } = useParams();

  const [question, setQuestion] =
    useState("");
  const [listening,
setListening] =
  useState(false);
  const navigate =
  useNavigate();
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
const typeMessage = (
  text,
  callback
) => {

  let index = 0;

  let currentText = "";

  const interval = setInterval(() => {

    currentText += text[index];

    callback(currentText);

    index++;

    if (index >= text.length) {

      clearInterval(interval);
    }

  }, 15);
};
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

  text: "",

  time:
    new Date().toLocaleTimeString(),
};

// TYPE MESSAGE

typeMessage(
  response.data.answer,

  (typedText) => {

    setMessages((prev) => {

      const updated = [...prev];

      updated[
        updated.length - 1
      ].text = typedText;

      return [...updated];
    });
  }
);

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setQuestion("");

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error("Chat Failed");

      setLoading(false);
    }
  };
const startListening = () => {

  const SpeechRecognition =

    window.SpeechRecognition ||

    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert(
      "Speech Recognition not supported"
    );

    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  setListening(true);

  recognition.onresult =
    (event) => {

      const transcript =

        event.results[0][0]
          .transcript;

      setQuestion(transcript);

      setListening(false);
    };

  recognition.onerror = () => {

    setListening(false);
  };

  recognition.onend = () => {

    setListening(false);
  };
};
  return (

    <div className="container py-4">
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
      <h2 className="mb-4">
        AI Chat with PDF
      </h2>

      {/* CHAT BOX */}

      <div
        className="p-3"
        style={{

  height: "500px",

  overflowY: "auto",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(12px)",

  borderRadius: "20px",

  border:
    "1px solid rgba(255,255,255,0.08)",
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
                     ? "linear-gradient(90deg,#38bdf8,#2563eb)"
                      : "rgba(255,255,255,0.08)",

                  color:
                    msg.sender === "user"
                      ? "white"
                     : "white",

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

          <div style={{
  color: darkMode
  ? "#cbd5e1"
  : "#475569",
}}>

            AI is thinking...

          </div>
        )}

        {/* AUTO SCROLL */}

        <div ref={chatEndRef}></div>

      </div>

      {/* INPUT AREA */}

      <div
  className="d-flex mt-3 gap-2"
>

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

style={{

  background:
    "rgba(255,255,255,0.08)",

  color: darkMode
  ? "white"
  : "#111827",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "12px",

  padding: "12px",
}}
        />
       <button

  onClick={startListening}

  style={{

    width: "52px",

    height: "52px",

    borderRadius: "50%",

    border: "none",

    background:
      listening

        ? "#dc2626"

        : "linear-gradient(90deg,#38bdf8,#2563eb)",

    color: "white",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "20px",

    boxShadow:
      listening

        ? "0 0 25px rgba(220,38,38,0.7)"

        : "0 10px 25px rgba(37,99,235,0.35)",

    transition: "0.3s ease",

    flexShrink: 0,
  }}
>

  <FaMicrophone />

</button>

       <button

  onClick={sendQuestion}

  disabled={loading}

  style={{

    width: "52px",

    height: "52px",

    borderRadius: "50%",

    border: "none",

    background:
      "linear-gradient(90deg,#38bdf8,#2563eb)",

    color: "white",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "18px",

    boxShadow:
      "0 10px 25px rgba(37,99,235,0.35)",

    transition: "0.3s ease",

    flexShrink: 0,
  }}
>

  <FaPaperPlane />

</button>

      </div>

    </div>
  );
}

export default ChatPage;