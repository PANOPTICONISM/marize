import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalProvider } from "../contexts/CartAndFavouritesContext";
import { ProductsProvider } from "../contexts/ProductsContext";
import "../styles/index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/Theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <ProductsProvider>
          <Head>
            <title>Marizé</title>
            <link rel="icon" href="/assets/logo_icon.svg" />
          </Head>
          <Component {...pageProps} />
        </ProductsProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}
