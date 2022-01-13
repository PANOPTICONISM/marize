import { NextApiRequest, NextApiResponse } from "next";
const { connectToDatabase } = require("./lib/mongo");
const ObjectId = require("mongodb").ObjectId;

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

async function getUser(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let posts = await db.collection("movies").find({}).toArray();
    // return the posts
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

async function addUser(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection("users").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Post added successfully",
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