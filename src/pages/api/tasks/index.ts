import { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "../../../utils/enums/methods.enum";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method, req.url);

  const { method } = req;

  switch (method) {
    case Methods.GET:
      return res.status(200).json("getting tasks");
    case Methods.POST:
      return res.status(201).json("creating task");
    default:
      return res.status(400).json("invalid method");
  }
};
