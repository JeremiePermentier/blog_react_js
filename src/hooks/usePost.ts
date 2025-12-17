import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPosts,
  fetchOnePost,
  editPost,
  createPost,
  apiDeletePost
} from "../services/postServices";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchOnePost(id),
    enabled: !!id,
  });
};

export const useEditPost = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => editPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
