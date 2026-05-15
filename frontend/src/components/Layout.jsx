import { Link, useLocation }
from "react-router-dom";

function Layout({ children }) {

  const location = useLocation();

  const menuItems = [
    {
  name: "Files",
  path: "/files",
},
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Upload",
      path: "/upload",
    },

    {
      name: "Summary",
      path: "/summary",
    },

    {
      name: "Quiz",
      path: "/quiz",
    },

    {
      name: "AI Chat",
      path: "/chat",
    },

    {
      name: "History",
      path: "/history",
    },
  ];

  return (

    <div className="container-fluid">

      <div className="row">

        {/* SIDEBAR */}

        <div
          className="col-md-2 d-flex flex-column p-4"
          style={{
            background: "#111827",
            minHeight: "100vh",
          }}
        >

          {/* LOGO */}

          <h2
            className="text-white fw-bold mb-5"
          >

            AI Assistant

          </h2>

          {/* MENU */}

          <ul className="nav flex-column">

            {menuItems.map((item, index) => (

              <li
                className="nav-item mb-3"
                key={index}
              >

                <Link
                  to={item.path}

                  className={`nav-link ${
                    location.pathname === item.path
                      ? "bg-primary text-white"
                      : "text-light"
                  }`}

                  style={{
                    borderRadius: "10px",

                    padding: "12px",

                    transition: "0.3s",
                  }}
                >

                  {item.name}

                </Link>

              </li>
            ))}

          </ul>

          {/* FOOTER */}

          <div className="mt-auto text-secondary">

            <small>

              AI Research Assistant

            </small>

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div
          className="col-md-10 p-4"
          style={{
            background: "#f3f4f6",
            minHeight: "100vh",
          }}
        >

          {children}

        </div>

      </div>

    </div>
  );
}

export default Layout;