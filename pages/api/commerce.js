import { commerce } from "../../lib/Commerce.js";

export async function getStaticProps() {
const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list({
	limit: 60,
});

  return {
    props: {
      categories,
      products,
    },
  };
}