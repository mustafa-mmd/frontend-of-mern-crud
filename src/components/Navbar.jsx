import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AutoContext";


function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-amber-700 text-white p-5 text-xl font-semibold">
      <Link to={isLoggedIn ? "/home" : "/"}>
        <h1 className="font-bold text-4xl">Create Blogs</h1>
      </Link>

      <ul className="flex gap-6">
        {isLoggedIn && (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/add-post">Create Post</Link>
            </li>
          </>
        )}
      </ul>

      <ul className="flex gap-4 items-center">
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <span>/</span>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
