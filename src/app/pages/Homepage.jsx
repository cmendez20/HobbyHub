// import Data from '../../data.json';
import { useEffect, useState } from 'react';
import { PostCard } from '../../components/PostCard';
import { useSearch } from '../SearchContext';
import { supabase } from '../supabase-client';
// console.log(Data);

const Homepage = () => {
  let [posts, setPosts] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let filteredPosts = '';

  const { searchInput } = useSearch();

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase.from('posts').select('*');
      setIsLoading(true);
      setPosts(
        data.filter(post =>
          post.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
      console.log(posts);

      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  console.log(posts);

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
      {posts === null && 'no posts yet!'}
      {isLoading && 'loading posts...'}
      {posts !== null &&
        posts.map((post, i) => <PostCard key={post.id} {...post} />)}
    </main>
  );
};

export { Homepage };
