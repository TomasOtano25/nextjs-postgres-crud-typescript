import { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "../../../utils/enums/methods.enum";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const { method } = req;

  switch (method) {
    case Methods.GET:
      return res.status(200).json("getting a unique tasks");
    case Methods.PUT:
      return res.status(201).json("updating a unique tasks");
    case Methods.DELETE:
      return res.status(200).json("deleting a unique tasks");
    default:
      return res.status(400).json("method not allowed");
  }
};
