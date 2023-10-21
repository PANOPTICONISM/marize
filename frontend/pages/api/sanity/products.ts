import { sanity } from "../lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function products(
  _req: NextApiRequest,
  res: NextApiResponse
) {
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
