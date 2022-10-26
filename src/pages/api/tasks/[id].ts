import { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "src/utils/enums/methods.enum";
import { conn } from "src/utils/database";
import { Task } from "./index";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const { method, query, body } = req;

  console.log(query);

  switch (method) {
    case Methods.GET:
      try {
        const text = `SELECT * FROM tasks WHERE id = $1`;
        const values = [query.id];
        const result = await conn.query(text, values);

        if (result.rows.length === 0)
          return res.status(404).json({ message: "Task not found" });

        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case Methods.PUT:
      try {
        const text = `UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *`;
        const { title, description } = body as Task;
        const values = [title, description, query.id];
        const result = await conn.query(text, values);

        if (result.rows.length === 0)
          return res.status(404).json({ message: "Task not found" });

        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case Methods.DELETE:
      try {
        const text = `DELETE FROM tasks WHERE id = $1 RETURNING *`;
        const values = [query.id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      return res.status(400).json("method not allowed");
  }
};
