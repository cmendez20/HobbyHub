import { Link } from 'react-router-dom';

const PostCard = ({ id, created_at, title, upvotes }) => {
  return (
    <Link to={`posts/${id}`}>
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4 mb-8">
        <p className="font-extralight">{created_at}</p>
        <p className="font-bold text-xl">{title}</p>
        <p className="font-extralight">{upvotes} upvotes</p>
      </div>
    </Link>
  );
};

export { PostCard };
