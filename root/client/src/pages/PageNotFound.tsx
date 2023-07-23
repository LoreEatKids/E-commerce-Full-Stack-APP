import { Link } from "react-router-dom";
import "./styles/pagenotfound.scss";

export default function PageNotFound() {
    return (
      <main className="error_page d-center">
        <h1 className="title">404</h1>
        <p>
            Non siamo riusciti a trovare la pagina. Vuoi tornale alla <br />
            <Link to="/" className="link">home?</Link>
        </p>
      </main>
    );
}
