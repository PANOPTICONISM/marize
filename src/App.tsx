import Paths from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import CommerceProvider from "./contexts/CommerceContext";

function App() {
    return (
        <CommerceProvider>
            <BrowserRouter>
                <Paths />
            </BrowserRouter>
        </CommerceProvider>
    );
}

export default App;
