import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "./lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // case "GET": {
    //   return getUser(req, res);
    // }

    case "POST": {
      return addUser(req, res);
    }
  }
}

async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const table =
    process.env.NODE_ENV === "development" ? "staging" : "purchases";
  try {
    await supabase.from(table).insert(JSON.parse(req.body));
    return res.json({
      message: "Purchase completed successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
