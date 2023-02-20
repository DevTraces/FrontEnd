import type { NextApiRequest, NextApiResponse } from "next";

type HashTagResultData = {
  feedId: number;
  imageUrl: string;
};

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

type AutoCompleteData = string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        data: {
          totalNumberOfSearches: number;
          feedInfoList: HashTagResultData[];
        };
      }
    | {
        data: UserResultData[];
      }
    | {
        data: {
          autoCompleteWords: AutoCompleteData[];
        };
      }
  >
) {
  const { slug } = req.query;

  if (slug === "hashtags" && req.method === "GET") {
    res.status(200).json({
      data: {
        totalNumberOfSearches: 2,
        feedInfoList: [
          {
            feedId: 12,
            imageUrl:
              "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          },
          {
            feedId: 13,
            imageUrl:
              "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }
        ]
      }
    });
  }

  if (slug === "username" && req.method === "GET") {
    res.status(200).json({
      data: [
        {
          userId: 12,
          username: "이름username1",
          nickname: "이름nickname1",
          profileImageUrl:
            "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
          userId: 13,
          username: "이름username2",
          nickname: "이름nickname2",
          profileImageUrl:
            "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }
      ]
    });
  }

  if (slug === "nickname" && req.method === "GET") {
    res.status(200).json({
      data: [
        {
          userId: 12,
          username: "닉네임username1",
          nickname: "닉네임nickname1",
          profileImageUrl:
            "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
          userId: 13,
          username: "닉네임username2",
          nickname: "닉네임nickname2",
          profileImageUrl:
            "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }
      ]
    });
  }

  if (slug === "autocomplete" && req.method === "GET") {
    res.status(200).json({
      data: { autoCompleteWords: ["autocompleteword1", "autocompleteword2"] }
    });
  }
}
