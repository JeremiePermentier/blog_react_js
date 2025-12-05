import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  background: #fff;
  width: 50%;
  margin: 0 auto;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const HomePage: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { data, isLoading, error } = useQuery<any, Error>({
        queryKey: ["posts"],
        queryFn: () =>
        axios
            .get(`${apiUrl}/api/v1/posts`, { withCredentials: true })
            .then((res) => res.data),
    });

    const queryClient = useQueryClient();

  const handleDelete = (id: number) => {
        axios.delete(`${apiUrl}/api/v1/post/delete/${id}`, { withCredentials: true })
        .then(() => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        })
        .catch((error) => {
            console.error("Error deleting post:", error);
        });
    };

  const posts: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {error ? (
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      ) : (
        <PostsContainer>
          {posts.length === 0 ? (
            <p>No posts</p>
          ) : (
            posts.map((post: any) => (
              <PostItem key={post.id ?? JSON.stringify(post)}>
                {post.title ?? "Untitled"}
                <DeleteButton onClick={() => handleDelete(post._id)}>Delete</DeleteButton>
              </PostItem>
            ))
          )}
        </PostsContainer>
      )}
    </div>
  );
};

export default HomePage;
