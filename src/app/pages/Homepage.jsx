import Data from "../../data.json";
import { PostCard } from "../../components/PostCard";

console.log(Data);

const Homepage = () => {
  return (
    <main className="max-w-5xl mx-auto">
      <div className="flex items-center py-8">
        <p className="mr-4">Order by:</p>
        <div className="flex gap-4">
          <button className="px-5 py-1.5 bg-green-500 rounded-lg">
            Newest
          </button>
          <button className="px-5 bg-slate-500 rounded-lg">Most Popular</button>
        </div>
      </div>
      {Data.map((post, i) => (
        <PostCard key={post.id} {...post} />
      ))}
    </main>
  );
};

export { Homepage };
