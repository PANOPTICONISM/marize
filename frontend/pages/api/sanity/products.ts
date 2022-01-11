import { sanity } from "../lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const products = await sanity.fetch(
    `{'products': *[_type == "product"]{
      _id, 
      body, 
      category[]->{_id, title, parentVendor}, 
      images, 
      slug, 
      title, 
      vendor->{_id, title}},
      'vendors': *[_type == "vendor"]{title, _id},
      'categories': *[_type == "category"]
    }`
  );

  return res.json({
    products,
  });
}

// example of fetching from nextjs server
// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function App() {
//   const { data, error } = useSWR(
//     "/api/sanity/products",
//     fetcher
//   );
// }
