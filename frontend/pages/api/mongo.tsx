import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getUser(req, res);
    }

    case "POST": {
      return addUser(req, res);
    }
  }
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    let posts = await db.collection("movies").find({}).toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("users").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "User added successfully",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
