import { sanity } from "../lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCategories(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await sanity.fetch(
    `{'accessory': *[_type == "accessory"],
        'clothing': *[_type == "clothing"],
        'vendors': *[_type == "vendor"]{title, _id}
      }`
  );

  return res.json({
    data,
  });
}
