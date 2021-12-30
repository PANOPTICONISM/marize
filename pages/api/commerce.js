import { commerce } from "../../lib/Commerce.js";

export async function getStaticProps(context) {
  const id = context.params.id
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

export async function getProductIds() {
  const { data: products } = await commerce.products.list({
    limit: 60,
  });

  const paths = products.map((path) => {
    return {
      paths: [{params: {
        id: path.id
      }}]
    }
  })
}