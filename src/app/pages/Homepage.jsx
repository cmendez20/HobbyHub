import { PostCard } from '../../components/PostCard';
import { useSearch } from '../SearchContext';
import { supabase } from '../supabase-client';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useEffect, useState } from 'react';

const Homepage = () => {
  const { searchInput } = useSearch();
  const [orderBy, setOrderBy] = useState('id');

  const fetchAllPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(orderBy, { ascending: false });
    if (error) throw error;
    console.log(data);
    return data;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', orderBy],
    queryFn: fetchAllPosts,
  });

  const handleSortByNewest = () => {
    setOrderBy('created_at');
  };

  const handleSortByPopular = () => {
    setOrderBy('upvotes');
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="p-4 lg:p-0 max-w-5xl mx-auto">
      <div className="flex items-center py-8 justify-center md:justify-start gap-4">
        <p className="">Order by:</p>
        <div className="flex gap-4">
          <button
            className="px-5 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            onClick={handleSortByNewest}
          >
            Newest
          </button>
          <button
            className="px-5 bg-orange-600 rounded-lg text-white hover:bg-orange-700 transition-colors"
            onClick={handleSortByPopular}
          >
            Most Popular
          </button>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        posts
          .filter(post =>
            post.title.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map(post => <PostCard key={post.id} {...post} />)
      )}
    </main>
  );
};

export { Homepage };
