import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export const SearchBar = (props) =>{
    const {  handleSearch} = props
    return (
        <form>
        <TextField
        id="search_bar"
        onInput={handleSearch}
        label="Search a Keyword"
        variant="outlined"
        placeholder="Search..."
        size="small"
        />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
    </form>
    )
}