import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTags, createTag, apiDeleteTag, fetchOneTag, editTag } from "../services/tagServices";

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
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useEditTag = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => editTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useTag = (id: string) => {
  return useQuery({
    queryKey: ["tag", id],
    queryFn: () => fetchOneTag(id),
    enabled: !!id,
  });
};