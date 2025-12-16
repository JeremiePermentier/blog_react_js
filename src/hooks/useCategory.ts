import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiDeleteCategory, createCategory, fetchCategories } from "../services/categoryServices"

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
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};