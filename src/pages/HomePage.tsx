import React from "react";
import styled from "styled-components";
import { usePosts } from "../hooks/usePost";
import type { PostDisplayData } from "../types/Post.types";

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

const HomePage: React.FC = () => {
  const { data, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {error ? (
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      ) : (
        <PostsContainer>
          { data?.length === 0 ? (
            <p>No posts</p>
          ) : (
            data?.map((post: PostDisplayData) => (
              <PostItem key={post.id ?? JSON.stringify(post)}>
                { post.coverImage ? <img src={post?.coverImage} /> : null}
                {post.title ?? "Untitled"}
              </PostItem>
            ))
          )}
        </PostsContainer>
      )}
    </div>
  );
};

export default HomePage;
