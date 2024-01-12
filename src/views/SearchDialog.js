import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

function SearchDialog({ open, onClose, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const language = localStorage.getItem("language");

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  
  const handleSearch = () => {
    navigate(`/search/${language}/note/${searchQuery}`)
    onSearch(searchQuery);
    setSearchQuery("")
    onClose();
  };
  const handleSearchClose = () => {
    onSearch(searchQuery);
    setSearchQuery("")
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 0,
          width: isMobile ? "100%" : "60%",
          maxWidth: "none",
        },
      }}
    >
      {/* Set maxWidth as per your preference */}
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "large" }}>
        Search In Notes
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          fullWidth
          variant="standard"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleEnterKey}
          InputProps={{
            style: { fontSize: "24px" }, // You can adjust the fontSize here
          }}
         
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSearchClose}>close</Button>
        <Button onClick={handleSearch}>search</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchDialog;
