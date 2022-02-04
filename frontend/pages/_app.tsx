import { AppProps } from "next/app";
import { GlobalProvider } from "../contexts/CartAndFavouritesContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
