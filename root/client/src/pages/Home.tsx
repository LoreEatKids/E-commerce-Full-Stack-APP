import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { products } from "../data/products";
import { CART_ACTIONS } from "../hooks/CartReducerActions";
import diet from "../static/diet.gif";
import trainer from "../static/trainer.gif";
import { cartItem } from "../types/cartTypes";
import "./styles/home.scss";
 
export default function Home() {
  const cartContext = useContext(CartContext);
  const {user} = useContext(AuthContext);

  const handleAddToCart = (product: cartItem) => {
    if(!user) {
      return <Navigate to="/login" />
    }

    cartContext?.cartDispatch({ type: CART_ACTIONS.ADD, payload: product})
    toast.success(`${product.name} aggiunto al carrello!`)
  }

  const productCardEls = products.map((product) => (
    <Card style={{ width: "18rem" }} key={product.id}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.desc}</Card.Text>
        <div className="product_btn d-f">
          <Button variant="success" onClick={() => handleAddToCart(product)}>
            Add to cart
          </Button>
          <h1>{product.price}€</h1>
        </div>
      </Card.Body>
    </Card>
  ));

  return (
    <>
      <div className="first-page">
        <Navbar />

        <main>
          <div className="img-background"></div>

          <div className="home-title-container d-center">
            <h1>
              cosa devo fare per
              <br />
              <span>essere grosso?</span>
            </h1>
          </div>

          <article className="home-steps d-center">
            <a href="#coaching" className="home-steps_step">
              <img src={diet} />
              <div className="discover">
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </a>
            <a href="#coaching" className="home-steps_step">
              <img src={trainer} />
              <div className="discover">
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </a>
          </article>
        </main>
      </div>

      <div className="coaching d-center" id="coaching">
        <div className="coaching_infos">
          <h1 className="title">Coaching</h1>
          <p>
            Per diventare grossi non basta mangiare bene ed allenarsi, è <br />
            necessario farsi seguire da una persona esperta e a conoscenza delle{" "}
            <br />
            più recenti tecniche di allenamento, cosa posso offrirti io:
          </p>
          <div className="cards infos d-f">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: "800" }}>
                  Scheda Personalizzata
                </Card.Title>
                <Card.Text>
                  Ognuno ha bisogno della propria scheda, senza eccezioni. Basta
                  fare schede come capita prese su TikTok.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: "800" }}>
                  Allenamento Scientifico
                </Card.Title>
                <Card.Text>
                  È ora di smetterla con tutta la disinformazione
                  sull'allenamento e seguire i più aggiornati principi
                  scientifici.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: "19rem" }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: "800" }}>
                  Qualità del Servizio
                </Card.Title>
                <Card.Text>
                  Con tutti i miei pacchetti do la garanzia di fornire un
                  servizio veloce e puntuale, inoltre sono sempre aperto a
                  eventuali chiarimenti
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="pacchetti">
          <div className="packs_infos">
            <h1 className="title" id="products">Pacchetti</h1>
            <p>
              Niente magie e niente formule, ma prima di avere una scheda
              personalizzata <br /> è necessario avere in mente il proprio
              obbiettivo
            </p>
          </div>
          <div className="cards products d-f">
            {productCardEls}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
