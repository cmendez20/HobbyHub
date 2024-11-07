import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';

const PostDetails = () => {
  const { id } = useParams();

  // const postedDate = formatDistanceToNow(parseISO(created_at), {
  //   addSuffix: true,
  // });
  // console.log(id);

  // get post

  return (
    <section className="max-w-5xl mx-auto pt-8">
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4 mb-8">
        <p className="font-extralight">timestamp</p>
        <p className="font-bold text-xl">post title</p>
        <p className="font-extralight">Post Content</p>
        <p className="font-extralight">Post Image</p>
        <div className="flex justify-between items-center">
          <p className="font-extralight"># of upvotes</p>
          <div className="flex gap-4">
            <Link
              to={`edit`}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg"
            >
              edit post
            </Link>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
              delete post
            </button>
          </div>
        </div>
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
