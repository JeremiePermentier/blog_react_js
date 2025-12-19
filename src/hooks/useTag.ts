import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTags, createTag, apiDeleteTag, fetchOneTag, editTag } from "../services/tagServices";
import type { TagData } from "../types/Tag.types";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useTags = () => {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
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

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TagData) => createTag(data),
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
    mutationFn: (data: TagData) => editTag(id, data),
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