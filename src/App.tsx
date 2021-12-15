import Paths from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import CommerceProvider from "./contexts/CommerceContext";
import ContentfulProvider from "./contexts/ContentfulContext";
import ScrollToTop from "./utils/ScrollToTop";
import ShoppingBagProvider from "./contexts/CartContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";

function App() {
    return (
        <CommerceProvider>
            <ContentfulProvider>
                <FavouritesProvider>
                    <ShoppingBagProvider>
                        <BrowserRouter>
                            <ScrollToTop />
                            <Paths />
                        </BrowserRouter>
                    </ShoppingBagProvider>
                </FavouritesProvider>
            </ContentfulProvider>
        </CommerceProvider>
    );
}

export default App;
