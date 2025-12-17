import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/Input";
import type { RegisterData } from "../../types/User.types";
import { useRegister } from "../../hooks/useUser";
import { useState } from "react";

const StyledRegisterForm = styled.form`
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

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      setLoading(true);
      await registerMutation.mutateAsync(data);
      reset();
    } catch (error: any) {
      console.log("Erreur lors de l'inscription :", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledRegisterForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="text"
          placeholder="Nom"
          register={register("username", { required: "Le nom est requis" })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>

      <div>
        <Input
          type="email"
          placeholder="Email"
          register={register("email", { required: "L'email est requis" })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Mot de passe"
          register={register("password", {
            required: "Le mot de passe est requis",
            minLength: { value: 6, message: "Minimum 6 caractères" },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="large" loading={loading}>Inscription</Button>
    </StyledRegisterForm>
  );
};

export default RegisterForm;
