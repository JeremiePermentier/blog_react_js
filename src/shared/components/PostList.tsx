import React from "react";
import styled from "styled-components";
import type { PostDisplayData } from "../../types/Post.types";
import { Card } from "./Card/Card";
import { CoverImage } from "./Image/CoverImage";
import { Title } from "./Title/Title";

type PostListProps = {
  posts: PostDisplayData[];
};


export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) return <p>No posts</p>;

  return (
    <PostsContainer>
      {posts.map((post) => (
        <Card key={post.id ?? JSON.stringify(post)}>
          {post.coverImage && <CoverImage src={post.coverImage} />}
          <Title level={2}>{post.title ?? "Untitled"}</Title>
        </Card>
      ))}
    </PostsContainer>
  );
};

export default PostList;