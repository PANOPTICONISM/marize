import Paths from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import CommerceProvider from "./contexts/CommerceContext";
import ContentfulProvider from "./contexts/ContentfulContext";
import ShoppingBagContext from "./contexts/CartContext";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
    return (
        <CommerceProvider>
            <ContentfulProvider>
                <ShoppingBagContext>
                    <BrowserRouter>
                        <ScrollToTop />
                        <Paths />
                    </BrowserRouter>
                </ShoppingBagContext>
            </ContentfulProvider>
        </CommerceProvider>
    );
}

export default App;
