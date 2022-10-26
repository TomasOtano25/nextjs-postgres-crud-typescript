import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../utils/database";

type Data = {
  message: string;
  time: string;
};

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await conn.query("SELECT NOW()");

  res.json({ message: "pong", time: response.rows[0].now });
}
