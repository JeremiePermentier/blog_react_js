import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiDeleteCategory, createCategory, editCategory, fetchCategories, fetchOneCategory } from "../services/categoryServices"
import type { CategoryData } from "../types/Category.types";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
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