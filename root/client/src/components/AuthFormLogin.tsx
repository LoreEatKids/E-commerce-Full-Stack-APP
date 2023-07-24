import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { userSchemaLogin } from "../models/user";
import { userTypeLogin } from "../types/userTypes";

export default function AuthFormLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userTypeLogin>({ resolver: zodResolver(userSchemaLogin) });

  const submitDataLogin = (data: userTypeLogin) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Successfully Signed In");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Something went wrong, please try again");
        console.error(error);
      });
  }

  return (
    <form className="auth_form" onSubmit={handleSubmit(submitDataLogin)}>
      <div className="form_top">
        <h1>Sign In</h1>
        <p>
          Don't have an account?{" "}
          <span className="link">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>

      <div className="form_inputs">
        <div className="input_container">
          <Form.Label htmlFor="inputPassword5">Email</Form.Label>
          <Form.Control id="inputPassword5" {...register("email")} autoFocus />
          <Form.Text id="passwordHelpBlock" muted>
            {!errors.email ? (
              "ex: example@example.com"
            ) : (
              <span className="error">{errors.email.message}</span>
            )}
          </Form.Text>
        </div>

        <div className="input_container-password">
          <div className="input_container">
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              id="inputPassword5"
              {...register("password")}
              type="password"
            />
            <Form.Text id="passwordHelpBlock" muted>
              {!errors.password ? (
                "Choose a secure password"
              ) : (
                <span className="error">{errors.password.message}</span>
              )}
            </Form.Text>
          </div>
        </div>
      </div>

      <div className="form_btn">
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
