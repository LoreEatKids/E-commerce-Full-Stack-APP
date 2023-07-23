import AuthFormLogin from "../components/AuthFormLogin";

export default function Register() {
  return (
    <main className="d-f auth">
      <div className="page_infos">
        <h1>
          Welcome Back.
        </h1>
        <p>
          Sign in with your email an password and let's get started
        </p>
      </div>
      <div className="form-container">
        <AuthFormLogin />
      </div>
    </main>
  );
}