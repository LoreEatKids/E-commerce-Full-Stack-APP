import { doc, setDoc } from "@firebase/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { userSchemaRegister } from "../models/user";
import { cartType } from "../types/cartTypes";
import { userTypeRegister } from "../types/userTypes";
import "./styles/form.scss";

export default function AuthFormRegister() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userTypeRegister>({ resolver: zodResolver(userSchemaRegister) });

  const submitDataRegister = (data: userTypeRegister) => {
    const { email, password } = data;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const userCartDocRef = doc(db, "userCarts", user.uid);

        const initialCart: cartType = {
          totalQuantities: 0,
          totalPrice: 0,
          cartItems: [],
        };

        setDoc(userCartDocRef, initialCart)
          .then(() => {
            toast.success("Successfully Signed Up");
            navigate("/");
          })
          .catch((error) => {
            toast.error("Something went wrong, please try again");
            console.error(error);
          })
      })
      .catch((error) => {
        toast.error("Something went wrong, please try again");
        console.error(error);
      });
  };

  return (
    <form className="auth_form" onSubmit={handleSubmit(submitDataRegister)}>
      <div className="form_top">
        <h1>Sign Up</h1>
        <p>
          Already have an account?{" "}
          <span className="link">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>

      <div className="form_inputs">
        <div className="input_container">
          <Form.Label htmlFor="inputPassword5">Email</Form.Label>
          <Form.Control id="inputPassword5" {...register("email")} />
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

          <div className="input_container">
            <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
            <Form.Control
              id="inputPassword5"
              {...register("confirmPassword")}
              type="password"
            />
            <Form.Text id="passwordHelpBlock" muted>
              {!errors.confirmPassword ? (
                "Repet your password"
              ) : (
                <span className="error">{errors.confirmPassword.message}</span>
              )}
            </Form.Text>
          </div>
        </div>
      </div>

      <div className="form_btn">
        <Button type="submit" variant="primary">
          Submit
        </Button>{" "}
      </div>
    </form>
  )
}
