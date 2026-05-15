import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const features = [

    {
      title: "Upload Files",

      description:
        "Upload PDFs and images for AI processing.",

      path: "/upload",

      color: "primary",
    },

    {
      title: "AI Summaries",

      description:
        "Generate smart summaries instantly.",

      path: "/summary",

      color: "success",
    },

    {
      title: "AI Quiz",

      description:
        "Create quizzes automatically from study material.",

      path: "/quiz",

      color: "warning",
    },

    {
      title: "AI Chat",

      description:
        "Chat with uploaded PDFs and notes.",

      path: "/chat",

      color: "info",
    },

    {
      title: "History",

      description:
        "View previous AI generated results.",

      path: "/history",

      color: "dark",
    },
  ];

  return (

    <div className="container-fluid">

      {/* HEADER */}

      <div className="mb-4">

        <h1 className="fw-bold">

          AI Research Assistant

        </h1>

        <p className="text-muted">

          Upload documents, generate summaries,
          quizzes, and chat with AI.

        </p>

      </div>

      {/* CARDS */}

      <div className="row">

        {features.map((item, index) => (

          <div
            className="col-md-4 mb-4"
            key={index}
          >

            <div
              className={`card border-0 shadow-lg h-100 bg-${item.color} text-white`}
              style={{
                borderRadius: "20px",
                cursor: "pointer",
                transition: "0.3s",
              }}

              onClick={() =>
                navigate(item.path)
              }

              onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                  "translateY(-5px)";
              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >

              <div className="card-body p-4">

                <h4 className="fw-bold">

                  {item.title}

                </h4>

                <p className="mt-3">

                  {item.description}

                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;