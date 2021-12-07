import Paths from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import CommerceProvider from "./contexts/CommerceContext";
import ContentfulProvider from "./contexts/ContentfulContext";
import ShoppingBagContext from "./contexts/CartContext";

function App() {
    return (
        <CommerceProvider>
            <ContentfulProvider>
                <ShoppingBagContext>
                    <BrowserRouter>
                        <Paths />
                    </BrowserRouter>
                </ShoppingBagContext>
            </ContentfulProvider>
        </CommerceProvider>
    );
}

export default App;
