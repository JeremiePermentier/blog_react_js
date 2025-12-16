import styled from "styled-components";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useCreatePost, useEditPost, usePost } from "../../hooks/usePost";
import { useEffect } from "react";

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

interface PostData {
  title: string;
  content: string;
  coverImage: FileList | null;
}

const PostForm = () => {
  const { id } = useParams();
  const isEdit = !!id;

  const { data: post } = usePost(id ?? "");

  const editPost = useEditPost(id ?? "");
  const createPost = useCreatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>({
    defaultValues: {
      title: "",
      content: "",
      coverImage: null,
    },
  });

  useEffect(() => {
    if (post && isEdit) {
      reset({
        title: post.title,
        content: post.content,
      });
    }
  }, [post, isEdit, reset]);

  const onSubmit = async (data: PostData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      if (data.coverImage && data.coverImage.length > 0) {
        formData.append("image", data.coverImage[0]);
      }

      if (isEdit) {
        editPost.mutate(formData);
      } else {
        createPost.mutate(formData);
      }

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Titre"
        register={register("title", { required: "Le titre est requis" })}
      />
      {errors.title && <p className="error">{errors.title.message}</p>}

      <Input
        type="text"
        placeholder="Contenu"
        register={register("content", { required: "Le contenu est requis" })}
      />
      {errors.content && <p className="error">{errors.content.message}</p>}

      <Input
        type="file"
        placeholder="Image de couverture"
        register={ isEdit ? false : register("coverImage", {
          required: "L'image de couverture est requise",
        })}
      />
      {errors.coverImage && (
        <p className="error">{errors.coverImage.message}</p>
      )}

      <Button text={isEdit ? "Modifier" : "Publier"} submit />
    </StyledLoginForm>
  );
};

export default PostForm;
