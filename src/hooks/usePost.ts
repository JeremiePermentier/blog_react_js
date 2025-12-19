import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  fetchPosts,
  fetchOnePost,
  editPost,
  createPost,
  apiDeletePost
} from "../services/postServices";
import { useNavigate } from "react-router";

export const usePosts = () => {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (query.isError) {
      const error = query.error as any;
      if (error.response?.status === 401) {
        navigate("/connexion");
      }
    }
  }, [query.isError, query.error, navigate]);

  return query;
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
