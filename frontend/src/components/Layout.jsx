import { Link, useLocation }from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import {  useTheme,} from "../context/ThemeContext";
function Layout({ children }) {
    const { darkMode } =useTheme();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] =useState(false);
    const menuItems = [
    
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Upload",
      path: "/upload",
    },
    {
  name: "Files",
  path: "/files",
},
  ];

  return (

    <div className="container-fluid">

      <div className="row">
<button
  className="btn btn-dark d-md-none m-3"

  onClick={() =>
    setSidebarOpen(!sidebarOpen)
  }
>

  ☰ Menu

</button>
        {/* SIDEBAR */}

       <div
  className={`
    col-md-2
    flex-column
    p-4

    ${
      sidebarOpen
        ? "d-flex"
        : "d-none d-md-flex"
    }
  `}
  style={{
   background:
  "linear-gradient(180deg,#020617,#0f172a)",

backdropFilter: "blur(12px)",

borderRight:
  darkMode

    ? "1px solid rgba(255,255,255,0.08)"

    : "1px solid rgba(0,0,0,0.05)",
    minHeight: "100vh",
  }}
>

          {/* LOGO */}

          <h2
           className={`fw-bold mb-5 ${
    darkMode
      ? "text-white"
      : "text-dark"
  }`}
          >

           <span
  style={{

    background:
      "linear-gradient(90deg,#38bdf8,#2563eb)",

    WebkitBackgroundClip:
      "text",

    WebkitTextFillColor:
      "transparent",
  }}
>

  AI Assistant

</span>

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

               className="nav-link fw-semibold"

                  style={{
                    
                    borderRadius: "10px",

                   padding: "16px 18px",

                    transition: "0.3s",
                    color:
  location.pathname === item.path

    ? "white"

    : "#cbd5e1",
                    background:
  location.pathname === item.path

    ? "linear-gradient(90deg,#38bdf8,#2563eb)"

    : "transparent",

boxShadow:
  location.pathname === item.path

    ? "0 4px 15px rgba(37,99,235,0.3)"

    : "none",
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
  className="col p-4"
  style={{

    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",

    color: "white",

    minHeight: "100vh",
  }}
>

          <Navbar />

<div className="mt-4">

  {children}

</div>

        </div>

      </div>

    </div>
  );
}

export default Layout;