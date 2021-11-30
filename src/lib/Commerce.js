import Commerce from "@chec/commerce.js";

// this should still happen in the backend, as the keys will be exposed on runtime
const API_KEY =
	process.env.NODE_ENV === "development"
		? process.env.REACT_APP_CHEC_PUBLIC_KEY
		: process.env.REACT_APP_CHEC_TEST_KEY;
export const commerce = new Commerce(API_KEY, true);
//later for actual buy we need secret key
