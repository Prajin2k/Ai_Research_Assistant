import { Link, useNavigate }
from "react-router-dom";

function Navbar() {
  
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

        <Link
          className="navbar-brand fw-bold"
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

        </Link>

        {/* RIGHT SIDE */}

       <div
 className="d-flex align-items-center flex-wrap"
  style={{
    gap: "18px",
  }}
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
   className="me-3 text-white"
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