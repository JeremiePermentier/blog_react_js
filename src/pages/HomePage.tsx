import React from "react";
import { usePosts } from "../hooks/usePost";
import { PostList } from "../shared/components/PostList";

const HomePage: React.FC = () => {
  const { data, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {error ? (
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      ) : (
        <PostList posts={data ?? []} />
      )}
    </div>
  );
};

export default HomePage;
