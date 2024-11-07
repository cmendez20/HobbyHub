import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';

const PostCard = ({ id, created_at, title, upvotes }) => {
  const postedDate = formatDistanceToNow(parseISO(created_at), {
    addSuffix: true,
  });

  return (
    <Link to={`posts/${id}`}>
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4 mb-8">
        <p className="font-extralight">Posted {postedDate}</p>
        <p className="font-bold text-xl">{title}</p>
        <p className="font-extralight">{upvotes} upvotes</p>
      </div>
    </Link>
  );
};

export { PostCard };
