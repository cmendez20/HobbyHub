import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  console.log(id);

  // get post

  return (
    <section className="max-w-5xl mx-auto pt-8">
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4 mb-8">
        <p className="font-extralight">timestamp</p>
        <p className="font-bold text-xl">post title</p>
        <p className="font-extralight">Post Content</p>
        <p className="font-extralight">Post Image</p>
        <p className="font-extralight"># of upvotes</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg grid gap-4">
        <p>- Did you forget about Ben Franklin?</p>
        <p>- It's got to be Geourge Washington!</p>
        <input type="text" placeholder="Leave a comment..." className="p-2" />
      </div>
    </section>
  );
};

export { PostDetails };
