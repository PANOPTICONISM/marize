import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalProvider } from "../contexts/CartAndFavouritesContext";
import { ProductsProvider } from "../contexts/ProductsContext";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ProductsProvider>
        <Head>
          <title>Marizé</title>
          <link rel="icon" href="/logo.svg" />
        </Head>
        <Component {...pageProps} />
      </ProductsProvider>
    </GlobalProvider>
  );
}
