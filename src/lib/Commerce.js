//instantiate commerce object
import Commerce from "@chec/commerce.js";
export const commerce = new Commerce(
	process.env.REACT_APP_CHEC_PUBLIC_KEY,
	true
);
//later for actual buy we need secret key
