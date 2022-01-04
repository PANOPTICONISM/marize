import { AppProps } from "next/app";
import ShoppingBagProvider from "../contexts/CartContext";
import CommerceProvider from "../contexts/CommerceContext";
import ContentfulProvider from "../contexts/ContentfulContext";
import { FavouritesProvider } from "../contexts/FavouritesContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CommerceProvider>
      <ContentfulProvider>
        <FavouritesProvider>
          <ShoppingBagProvider>
            <Component {...pageProps} />
          </ShoppingBagProvider>
        </FavouritesProvider>
      </ContentfulProvider>
    </CommerceProvider>
  );
}
