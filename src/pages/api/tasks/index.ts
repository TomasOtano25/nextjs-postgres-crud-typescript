import { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "src/utils/enums/methods.enum";
import { conn } from "src/utils/database";

export type Task = {
  title: string;
  description: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method, req.url);

  const { method, body } = req;

  switch (method) {
    case Methods.GET:
      try {
        const query = `SELECT * FROM tasks`;
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case Methods.POST:
      try {
        const { title, description } = body as Task;

        const query = `INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *`;
        const values = [title, description];

        const response = await conn.query(query, values);

        return res.status(201).json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json("invalid method");
  }
};
