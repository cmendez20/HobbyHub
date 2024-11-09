// import Data from '../../data.json';
import { useEffect, useState } from "react";
import { PostCard } from "../../components/PostCard";
import { useSearch } from "../SearchContext";
import { supabase } from "../supabase-client";
import { useQuery } from "@tanstack/react-query";

const fetchAllPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) throw error;
  return data;
};

const Homepage = () => {
  const { searchInput } = useSearch();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="max-w-5xl mx-auto">
      <div className="flex items-center py-8">
        <p className="mr-4">Order by:</p>
        <div className="flex gap-4">
          <button className="px-5 py-1.5 bg-green-600 text-white rounded-lg">
            Newest
          </button>
          <button className="px-5 bg-slate-600 rounded-lg text-white">
            Most Popular
          </button>
        </div>
      </div>
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </main>
  );
};

export { Homepage };
