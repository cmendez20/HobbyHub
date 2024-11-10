import { Link } from "react-router-dom";
import { Searchbar } from "./Searchbar";
import { useEffect } from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-8 py-6">
      <div className="grid grid-cols-[200px_500px_200px] items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="font-bold text-2xl">
          HobbyHub
        </Link>
        <Searchbar />
        <div className="flex gap-8">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/submit" className="hover:underline">
            Create New Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
