import { useSearch } from '../app/SearchContext';

const Searchbar = () => {
  const { searchInput, setSearchInput } = useSearch();

  const handleInput = e => {
    setSearchInput(e.target.value);
  };

  return (
    <input
      type="text"
      className="px-4 py-2 rounded-full border-solid border-black border-2 text-black"
      placeholder="Search"
      value={searchInput}
      name="searchInput"
      onChange={handleInput}
    />
  );
};

export { Searchbar };
