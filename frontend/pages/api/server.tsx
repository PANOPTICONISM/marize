import { sanity } from "./lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const products = await sanity.fetch(`*`);

  console.log("server");

  return res.json({
    products,
  });
}
