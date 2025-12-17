import styled from "styled-components";
import Input from "../../shared/components/Input";
import { useForm } from "react-hook-form";
import { useCategory, useCreateCategory, useEditCategory } from "../../hooks/useCategory";
import Button from "../../shared/components/Button/Button";
import type { CategoryData } from "../../types/Category.types";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

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
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const isEdit = !!id;

    const { data: category } = useCategory(id ?? "");
    const editCategory = useEditCategory(id ?? "");
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
    });

    useEffect(() => {
        if (category && isEdit) {
            reset({
                name: category.name
            })
        }
    }, [category, isEdit, reset])

    const onSubmit = async (data: CategoryData) => {
        try {
            setLoading(true);

            const mutation = isEdit ? editCategory : createCategory;
            mutation.mutate(data, {
                onSuccess: () => {
                    reset();
                    setLoading(false);
                },
                onError: () => {
                    setLoading(false);
                }
            })
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
            <Button type="submit" variant="primary" size="large" loading={loading}>{isEdit ? "Modifier une catégorie" : "Créer une catégorie"}</Button>
        </StyledForm>
    )
}

export default CategoryForm;