import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../shared/components/Input";
import axios from "axios";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../../app/AuthContext";
import UserContext from "../../app/UserContext";

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

interface LoginData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
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
            const apiUrl = import.meta.env.VITE_API_URL;
            if (!apiUrl) throw new Error("VITE_API_URL n'est pas défini");

            const response = await axios.post(`${apiUrl}/api/v1/users/login`, data, { withCredentials: true });

            setUser(response.data);
            setIsAuthenticated(true);

            navigate('/admin');
        } catch (error: any) {
            console.log("Erreur lors de la connexion :", error?.response?.data || error.message);
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
            <Button text="Se connecter" submit />
        </StyledLoginForm>
    );
};

export default LoginForm;