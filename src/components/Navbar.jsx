import { Link } from 'react-router-dom';
import { Searchbar } from './Searchbar';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 flex text-white px-8 py-4 justify-between">
      <Link to="/">HobbyHub</Link>
      <Searchbar />
      <div className="flex gap-8">
        <Link to="/">Home</Link>
        <Link to="/createPost">Create New Post</Link>
      </div>
    </nav>
  );
};

export { Navbar };
