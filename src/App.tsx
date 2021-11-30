import Paths from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
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
