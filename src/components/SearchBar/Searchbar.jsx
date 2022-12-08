import { AudioOutlined } from "@ant-design/icons";
import SearchOutlinedIcon from "@mui/icons-material/Search";
import "./searchbar.scss";
import { Input, Space } from "antd";
import { useState } from "react";

const SearchBar = ({ callback }) => {
  const [searchedText, setSearchedText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    callback(searchedText);
  };
  return (
    <form className="searchBar flex-none" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchBarInput"
        placeholder="Search..."
        value={searchedText}
        onChange={(e) => setSearchedText(e.target.value)}
      />
      <SearchOutlinedIcon />
      {/* <Search
        placeholder="input search text"
        style={{
          width: 200,
        }}
      /> */}
    </form>
  );
};
export default SearchBar;
