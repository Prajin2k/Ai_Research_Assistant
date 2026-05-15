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
  };

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark px-4"
      style={{
        background: "#111827",
      }}
    >

      <div className="container-fluid">

        {/* LOGO */}

        <Link
          className="navbar-brand fw-bold"
          to="/dashboard"
        >

          AI Assistant

        </Link>

        {/* RIGHT SIDE */}

        <div className="d-flex align-items-center">

          {!userInfo ? (

            <>

              <Link
                to="/login"
                className="btn btn-outline-light me-2"
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
                className="text-white me-3"
              >

                Welcome,
                {" "}
                {userInfo.name}

              </span>

              <button
                className="btn btn-danger"

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