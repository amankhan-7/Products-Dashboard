const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search product..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:ring-1"
    />
  );
};

export default SearchBar;
