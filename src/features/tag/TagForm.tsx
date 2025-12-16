import styled from "styled-components";
import Input from "../../shared/components/Input";
import { useForm } from "react-hook-form";
import Button from "../../shared/components/Button";
import { useCreateTag } from "../../hooks/useTag";

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

interface TagData {
    name: string;
}

const TagForm: React.FC = () => {
    const createTag = useCreateTag();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TagData>({
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (data: TagData) => {
        try {
            createTag.mutate(data);
            reset()
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Input 
                type="text"
                placeholder="Nom du tag"
                register={register('name', { required: "Le nom du tag est requis" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <Button text={"Créer un tag"} submit />
        </StyledForm>
    )
}

export default TagForm;