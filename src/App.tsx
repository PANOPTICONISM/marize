import Paths from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import CommerceProvider from "./contexts/CommerceContext";
import ContentfulProvider from "./contexts/ContentfulContext";

function App() {
    return (
        <CommerceProvider>
            <ContentfulProvider>
                <BrowserRouter>
                    <Paths />
                </BrowserRouter>
            </ContentfulProvider>
        </CommerceProvider>
    );
}

export default App;
