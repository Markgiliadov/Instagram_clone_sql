import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  handleLoading,
  setLoadingSpinner,
  columnNames,
  setColumnNames,
  chosenTable,
  setChosenTable,
  setData,
  doesContainDate,
}) {
  // const [table, setTable] = React.useState('');
  const handleChange = async (event) => {
    console.log(chosenTable);
    event.preventDefault();
    setData([]);
    setChosenTable(event.target.value);
    setLoadingSpinner(true);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tables</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenTable}
          label="Tables"
          onChange={handleChange}
        >
          <MenuItem value="comments">Comments Table</MenuItem>
          <MenuItem value="follows">Follows Table</MenuItem>
          <MenuItem value="likes">Likes Table</MenuItem>
          <MenuItem value="photos">Photos Table</MenuItem>
          {!doesContainDate ? (
            <MenuItem value="photo_tags">Photos tags Table</MenuItem>
          ) : null}
          <MenuItem value="tags">Tags Table</MenuItem>
          <MenuItem value="users">Users Table</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
