import AuthFormRegister from "../components/AuthFormRegister";
import "./styles/register.scss";

export default function Register() {
  return (
    <main className="d-f auth">
      <div className="page_infos">
        <h1>
          Registrati <br /> per iniziare.
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius minima fugit hic, iure dolorum eaadadada adinasdias dasd a!</p>
      </div>
      <div className="form-container">
        <AuthFormRegister />
      </div>
    </main>
  );
}
