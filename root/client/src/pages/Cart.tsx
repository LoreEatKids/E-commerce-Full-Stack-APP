import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button } from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { CART_ACTIONS } from "../hooks/CartReducerActions";
import { cartItem } from "../types/cartTypes";
import "./styles/cart.scss";

export default function Cart() {
  const [loading, setLoading] = useState<boolean>(false)

  const cartContext = useContext(CartContext);

  const cart = cartContext?.cart;
  const cartLength = cart?.cartItems.length;

  const handleClearCart = () => {
    cartContext?.cartDispatch({ type: CART_ACTIONS.EMPTY });
  };

  const handleRemoveFromCart = (product: cartItem) => {
    cartContext?.cartDispatch({ type: CART_ACTIONS.REMOVE, payload: product });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      await fetch("https://persona-coaching-backend.onrender.com/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart?.cartItems }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.url) {
            window.location.assign(response.url);
          }
        });
    } catch(error) {
      console.error(error);
      toast.error("Something went wrong, plase try again");
    } finally {
      setLoading(false);
    }
  };

  const cartProductsEl = cart?.cartItems.map((product) => (
    <div className="cart_product d-f" key={product.id}>
      <Link to="/" className="product_infos d-f">
        <img
          src="https://media.self.com/photos/6398b36c72eb56f726777d06/4:3/w_2560%2Cc_limit/weekly-workout-schedule.jpeg"
          alt="product_img"
        />

        <div className="product_name">
          <h3>{product.name}</h3>
          <p>{product.desc}</p>
        </div>
      </Link>

      <article className="product_manage d-f">
        <div className="product_menage-infos">
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#dc3545" }}
            onClick={() => handleRemoveFromCart(product)}
          />
          <h3 className="price">{product.price * product.quantity}€</h3>
          <h3 className="qty">Quantitià: {product.quantity}</h3>
        </div>
        <div className="product-menage-delete"></div>
      </article>
    </div>
  ));

  return (
    <>
      {!loading ? (
        <main className={`cart ${cartLength === 0 ? "empty d-center" : ""}`}>
          <div className="cart_wrapper">
            {cartLength === 0 && (
              <div className="empty_cart">
                <h1 className="title">Carrello Vuoto</h1>
                <p>
                  il carrello è vuoto, continua con lo shopping.{" "}
                  <Link to="/" className="link">
                    Home
                  </Link>
                </p>
              </div>
            )}
            {cartLength !== 0 && (
              <div className="cart_content">
                <div className="">
                  <h1 className="title">Il tuo Carrello</h1>
                </div>
                <div className="products_container d-f">{cartProductsEl}</div>
                <div className="subtotal d-f">
                  <div className="cart_btns d-f">
                    <Button variant="primary" onClick={handleCheckout}>
                      Vai Al Pagamento
                    </Button>
                    <Link to="/">
                      <Button variant="secondary">
                        Continua con lo shopping
                      </Button>
                    </Link>
                    <p onClick={handleClearCart}>Svuota il carrello</p>
                  </div>
                  <div className="total_price_wrapper">
                    Totale del carrello:{" "}
                    <h1 className="total_price">{cart?.totalPrice}</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      ) : (
        <div className="spinner_container d-center">
          <Spinner animation="border" variant="primary"/>
        </div>
      )}
    </>
  );
}
