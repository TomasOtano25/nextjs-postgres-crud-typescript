import { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "../../../utils/enums/methods.enum";
import { conn } from "../../../utils/database";

type Task = {
  title: string;
  description: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method, req.url);

  const { method, body } = req;

  switch (method) {
    case Methods.GET:
      return res.status(200).json("getting tasks");
    case Methods.POST:
      const { title, description } = body as Task;

      const query = `INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *`;
      const values = [title, description];

      const response = await conn.query(query, values);

      return res.status(201).json(response.rows[0]);
    default:
      return res.status(400).json("invalid method");
  }
};
