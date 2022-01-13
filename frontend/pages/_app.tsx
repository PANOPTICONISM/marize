import { AppProps } from "next/app";
import ContentfulProvider from "../contexts/ContentfulContext";
import { FavouritesProvider } from "../contexts/FavouritesContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContentfulProvider>
      <FavouritesProvider>
        <Component {...pageProps} />
      </FavouritesProvider>
    </ContentfulProvider>
  );
}
