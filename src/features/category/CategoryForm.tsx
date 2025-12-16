import styled from "styled-components";
import Input from "../../shared/components/Input";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "../../hooks/useCategory";
import Button from "../../shared/components/Button";
import type { CategoryData } from "../../types/Category.types";

const StyledForm = styled.form`
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

const CategoryForm: React.FC = () => {
    const createCategory = useCreateCategory();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CategoryData>({
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (data: CategoryData) => {
        try {
            createCategory.mutate(data);
            reset()
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Input 
                type="text"
                placeholder="Nom de la catégorie"
                register={register('name', { required: "Le nom de la catégorie est requis" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <Button text={"Créer une catégorie"} submit />
        </StyledForm>
    )
}

export default CategoryForm;