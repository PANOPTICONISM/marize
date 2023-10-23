import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  host: process.env.PGSQL_HOST,
  port: process.env.PGSQL_PORT,
  database: process.env.PGSQL_DATABASE,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      return getUser(req, res);
    }

    case "POST": {
      return addUser(req, res);
    }
  }
}

async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const table =
    process.env.NODE_ENV === "development" ? "staging" : "purchases";

  try {
    const data = JSON.parse(req.body);
    const values = [
      data.id,
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      data.created_at,
      JSON.stringify(data.cart),
    ];
    const query = `INSERT INTO ${table} VALUES($1, $2, $3, $4, $5, $6, $7)`;
    await pool.query(query, values);
    return res.json({
      message: "Purchase completed successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const table =
    process.env.NODE_ENV === "development" ? "staging" : "purchases";
  try {
    const response = await pool.query(`SELECT * from ${table}`);
    return res.status(200).json(response);
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
