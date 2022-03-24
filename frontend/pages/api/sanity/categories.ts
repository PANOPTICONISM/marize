import { sanity } from "../lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function products(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await sanity.fetch(
    `{'vendors': *[_type == "vendor"]{title, _id},
        'categories': *[_type == "category"]
      }`
  );

  return res.json({
    data,
  });
}
