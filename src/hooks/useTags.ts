import { tagService } from "@/services/tagService";
import { useFetch } from "./useAPiCall";

export interface Tag {
  id: string;
  name: string;
}

export const useTags = () => {
  return useFetch(['tags'], () => tagService.getTags())
}
