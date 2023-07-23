import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase";
import buzz from "../static/navbar-pfp.webp";
import "./styles/navbar.scss";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Successfully Logout")
      })
      .catch((error) => {
        toast.error("Something went wront, please try again.");
        console.error(error);
      });
  }

  return (
    <header className="app_header d-f">
      <ul className="nav_links d-f">
        <li>
          <a href="#">CHI SONO</a>
        </li>
        <li>
          <a href="#">CLIENTI</a>
        </li>
        <li>
          <a href="#">PACCHETTI</a>
        </li>
      </ul>

      <div className="nav-pfp-container d-center">
        <img title="io!" src={buzz} />
      </div>

      <article className={`btn-container d-center ${user ? "active" : ""}`}>
        {!user && (
          <button type="button">
            <Link to="/login">SIGN IN</Link>
          </button>
        )}

        {user && (
          <div className="cart_container d-f">
            <button type="button" onClick={handleLogOut}>
              Logout
            </button>
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        )}
      </article>
    </header>
  );
}
