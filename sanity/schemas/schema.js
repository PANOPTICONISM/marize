import blockContent from "./blockContent";
import category from "./category";
import products from "./products";
import vendor from "./vendor";
import product from "./product";
import colour from "./colour";
import size from "./size";
import homepage from "./homepage";
import about from "./about";
import productsPage from "./products-page";

import localeString from "./locale/String";
import localeText from "./locale/Text";
import localeBlockContent from "./locale/BlockContent";

import categorySections from "./blocks/categorySections";

export default [
  products,
  vendor,
  category,

  about,
  homepage,
  productsPage,
  // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  blockContent,
  localeText,
  localeBlockContent,
  localeString,
  product,
  colour,
  size,

  categorySections,
];
