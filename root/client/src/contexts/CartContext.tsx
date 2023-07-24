import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import { ReducerAction, initCartState, reducer } from "../hooks/CartReducer";
import { CART_ACTIONS } from "../hooks/CartReducerActions";
import { cartType } from "../types/cartTypes";
import { childrenType } from "../types/userTypes";
import { AuthContext } from "./AuthContext";

interface CartContextType {
  cart: cartType | null;
  cartDispatch: Dispatch<ReducerAction>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: childrenType) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, cartDispatch] = useReducer(reducer, initCartState);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const updateFirestoreCart = async (cart: cartType) => {
    if (!user) return;
    const userCartRef = doc(db, "userCarts", user.uid);
    try {
      await updateDoc(userCartRef, cart);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => { // when a new user signs in it gets his id and find his cart in firestore
    if (!user) {
      setLoading(false);
      return;
    }
    
    const fetchUserCart = async () => {
      try {
        const userCartRef = doc(db, "userCarts", user.uid);
        const userCartSnapshot = await getDoc(userCartRef);

        if (userCartSnapshot.exists()) {
          const documentData = userCartSnapshot.data() as cartType;
          cartDispatch({ type: CART_ACTIONS.LOAD_CART, payload: documentData });
        } else {
          cartDispatch({ type: CART_ACTIONS.EMPTY });
        }

        setLoading(false);
        setDataFetched(true); // Set the flag to true when data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false);
        setDataFetched(true); // Set the flag to true even if there's an error to prevent infinite loading
      }
    };

    fetchUserCart();
  }, [user]);

  useEffect(() => { // when something happens to cart this will create a new instance of the cart and upload ti boath to firestore and locally
    if (!user) {
      setLoading(false);
      setDataFetched(true);
      return;
    }
    
    const totalQuantities: number = cart.cartItems.reduce(
      (previousValue, cartItem) => previousValue + cartItem.quantity,
      0
    );
    const totalPrice = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(
      cart.cartItems.reduce(
        (previousValue, cartItem) =>
          previousValue + cartItem.quantity * cartItem.price,
        0
      )
    );
    const cartItems = cart.cartItems;

    const newCart: cartType = {
      totalQuantities,
      totalPrice,
      cartItems,
    };

    if (dataFetched) {
      cartDispatch({ type: CART_ACTIONS.LOAD_CART, payload: newCart });
      updateFirestoreCart(newCart);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, user, dataFetched]);

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {!loading && dataFetched && children}
    </CartContext.Provider>
  );
};

export default CartProvider;
