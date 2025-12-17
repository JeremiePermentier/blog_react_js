import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../shared/components/Input";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import AuthContext from "../../app/AuthContext";
import UserContext from "../../app/UserContext";
import Button from "../../shared/components/Button/Button";
import { useLogin } from "../../hooks/useUser";
import type { LoginData } from "../../types/User.types";

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  height: 100vh;
  justify-content: center;

  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
  }

  p.error {
    color: red;
    font-size: 0.8rem;
    margin: 0;
  }
`;

const LoginForm = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginData) => {
        try {
            setLoading(true);
            const response = await login.mutateAsync(data);

            setUser(response);
            setIsAuthenticated(true);

            navigate('/admin');
        } catch (error: any) {
            console.log("Erreur lors de la connexion :", error?.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="email"
                placeholder="Email"
                register={register("email", { required: "L'email est requis" })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <Input
                type="password"
                placeholder="Mot de passe"
                register={register("password", {
                    required: "Le mot de passe est requis",
                    minLength: { value: 6, message: "Minimum 6 caractères" },
                })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
            <Button type="submit" variant="primary" size="large" loading={loading}>Se connecter</Button>
        </StyledLoginForm>
    );
};

export default LoginForm;