import Header from "./components/Header/Header";
import { CartProvider } from './context/CartConext'

import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
