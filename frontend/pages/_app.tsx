import { AppProps } from "next/app";
import ContentfulProvider from "../contexts/ContentfulContext";
import { GlobalProvider } from "../contexts/CartAndFavouritesContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContentfulProvider>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ContentfulProvider>
  );
}
