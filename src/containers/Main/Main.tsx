import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

function Main({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
}

export default Main;
