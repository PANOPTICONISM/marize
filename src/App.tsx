import Paths from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { commerce } from "./lib/Commerce";
import Products from "./pages/Homepage/Products";

function App() {
	return (
		<BrowserRouter>
			<Paths />
			<Products />
		</BrowserRouter>
	);
}

export default App;
