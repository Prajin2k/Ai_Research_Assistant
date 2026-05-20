import {
  Link,
  useNavigate
} from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  useState
} from "react";

function Navbar({ setSidebarOpen }) {
  
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    navigate("/login");
    window.location.reload();
  };
 

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark px-4"
      style={{
        background:
          "rgba(15,23,42,0.7)",

        backdropFilter:
          "blur(12px)",

        borderRadius: "20px",

        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >

      <div className="container-fluid px-lg-4 px-2">

        {/* LOGO */}

       <div className="d-flex align-items-center gap-3">

  <button
    className="btn d-md-none"
    onClick={() => setSidebarOpen(true)}
   style={{
  borderRadius: "12px",
  width: "45px",
  height: "45px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  backdropFilter: "blur(10px)",
}}
  >

    <FaBars />

  </button>

  <Link
    className="navbar-brand fw-bold mb-0"
    to="/dashboard"
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

        </Link></div>

        {/* RIGHT SIDE */}

     <div
  className="
    d-flex
    flex-column
    flex-md-row
    align-items-start
    align-items-md-center
    justify-content-end
    ms-auto
    gap-2
    gap-md-3
    mt-2
    mt-md-0
  "
>

 


          {!userInfo ? (

            <>

              <Link
                to="/login"
                className="btn me-2"
                style={{

  background:
    "linear-gradient(90deg,#38bdf8,#2563eb)",

  color: "white",

  border: "none",

  borderRadius: "12px",

  fontWeight: "600",
}}
              >

                Login

              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
              >

                Register

              </Link>

            </>

          ) : (

            <>
 <span
 className="text-white"
 style={{
   fontSize: "14px",
   wordBreak: "break-word",
 }}
>

    Welcome,
    {" "}
    {userInfo.name}

  </span>


  {/* LOGOUT BUTTON */}

  <button
    className="btn"
style={{

  background:
    "linear-gradient(90deg,#ef4444,#dc2626)",

  color: "white",

  border: "none",

  borderRadius: "12px",

  fontWeight: "600",
}}
    onClick={logoutHandler}
  >

    Logout

  </button>
</>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;