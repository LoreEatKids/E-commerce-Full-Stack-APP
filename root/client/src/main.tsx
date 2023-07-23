import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AuthProvider from './contexts/AuthContext.tsx'
import CartProvider from './contexts/CartContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </AuthProvider>
)
