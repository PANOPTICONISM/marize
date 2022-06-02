import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalProvider } from "../contexts/CartAndFavouritesContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Head>
        <title>Marizé</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
