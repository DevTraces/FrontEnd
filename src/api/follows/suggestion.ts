import { FollowItemData } from "@/types/data/follow";
import api from "..";

export const getFollowSuggestion = () =>
  api.prod.get<FollowItemData[]>(`/api/follows/suggestion`);
