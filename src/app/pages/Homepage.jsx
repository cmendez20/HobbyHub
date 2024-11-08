import Data from '../../data.json';
import { PostCard } from '../../components/PostCard';
import { useSearch } from '../SearchContext';

console.log(Data);

const Homepage = () => {
  const { searchInput } = useSearch();

  const filteredPosts = Data.filter(post =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

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
      {filteredPosts.map((post, i) => (
        <PostCard key={post.id} {...post} />
      ))}
    </main>
  );
};

export { Homepage };
