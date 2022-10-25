import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  greeting: string;
};

export default function index(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.json({ greeting: "Hello world" });
}
