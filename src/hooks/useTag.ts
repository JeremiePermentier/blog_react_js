import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTags, createTag } from "../services/tagServices";

export const useTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
