import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register } from "../services/userService";
import type { LoginData, RegisterData } from "../types/User.types";

export const useLogin = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: (data: LoginData) => login(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['login'] });
        }
    })
};

export const useRegister = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: (data: RegisterData) => register(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['register'] });
        }
    })
};

export const useLogout = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logout'] });
        }
    })
};
