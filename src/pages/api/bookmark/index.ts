import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  feedId: string;
  imageLink: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  if (req.method === "GET") {
    res.status(200).json([
      {
        feedId: "1",
        imageLink:
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
      {
        feedId: "2",
        imageLink:
          "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
      {
        feedId: "3",
        imageLink:
          "https://images.unsplash.com/photo-1627647227768-705244233b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
      {
        feedId: "4",
        imageLink:
          "https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }
    ]);
  }
}
