import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (slug === "hashtags" && req.method === "GET") {
    res.status(200).json({});
  }

  if (slug === "username" && req.method === "GET") {
    res.status(200).json({});
  }

  if (slug === "nickname" && req.method === "GET") {
    res.status(200).json({});
  }

  if (slug === "autocomplete" && req.method === "GET") {
    res.status(200).json({});
  }
}
