import React, { useState } from "react";
import { TextField, Chip, Box, InputAdornment } from "@mui/material";

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <TextField 
    sx={{margin:'20px'}}
      label="Enter Tags"
      variant="outlined"
      size="small"
      fullWidth
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box sx={{ width:'100%',display: "flex", gap: 0.5 ,flexDirection:'row'}}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDelete(tag)}
                  size="small"
                />
              ))}
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TagsInput;
