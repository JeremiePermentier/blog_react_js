import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiDeleteCategory, createCategory, editCategory, fetchCategories, fetchOneCategory } from "../services/categoryServices"
import type { CategoryData } from "../types/Category.types";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useCategories = () => {
    const navigate = useNavigate();
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryData) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useEditCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryData) => editCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchOneCategory(id),
    enabled: !!id,
  });
};