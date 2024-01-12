import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "0",
    },
  },
});
const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          borderRadius: 0,
          width: 150,
        },
      },
    },
  },
});

const GoogleClone = () => {
  const [formData, setFormData] = useState({
    autoComplete: " ",
    checkBox: {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    },
    TextareaAutosize: " ",
    answer: "",
    count: "",
    datetime: "",
    radio: "",
    file: "",
  });
  //===========================================
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //============================================
  //autoComplete
  const onChangeHandle = (event, value) => {
    setFormData({
      ...formData,
      autoComplete: value,
    });
  };
  //============================================
  //checkBox
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      checkBox: {
        ...prevFormData.checkBox,
        [name]: checked,
      },
    }));
  };
  //==============================================
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  //==========================================

  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          Google Forms Clone
        </Typography>
      </Grid>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          p: 3,
          mt: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    name='autoComplete'
                    size="small"
                    value={formData.autoComplete}
                    onChange={onChangeHandle}
                    options={["Option 1", "Option 2", "Option 3"]}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </ThemeProvider>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          name="option1"
                          checked={formData.checkBox.option1}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Option 1"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          name="option2"
                          checked={formData.checkBox.option2}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Option 2"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          name="option3"
                          checked={formData.checkBox.option3}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Option 3"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          name="option4"
                          checked={formData.checkBox.option4}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Option 4"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>
                <TextareaAutosize
                  name="TextareaAutosize"
                  rows={5}
                  maxRows={5}
                  style={{ width: "100%", height: "100%", resize: "none"}}
                  value={formData.TextareaAutosize}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>
                <CssTextField
                  fullWidth
                  name="answer"
                  id="outlined-size-small"
                  size="small"
                  InputProps={{
                    sx: {
                      "& input": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    },
                  }}
                  value={formData.answer}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>
                <CssTextField
                  id="outlined-size-small"
                  name="count"
                  type="number"
                  size="small"
                  InputProps={{
                    sx: {
                      "& input": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    },
                  }}
                  value={formData.count}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="radio"
                  onChange={handleChange}
                  value={formData.radio}
                >
                  <FormControlLabel
                    value={"True"}
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    value="False"
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>
                <CssTextField
                  name="datetime"
                  type="date"
                  size="small"
                  InputProps={{
                    sx: {
                      "& input": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    },
                  }}
                  value={formData.datetime}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 1,
                  // mt: 4,
                }}
              >
                <Typography variant="h5">Question</Typography>

                <CssTextField
                  type="file"
                  name="file"
                  id="file"
                  size="small"
                  InputProps={{
                    sx: {
                      "& input": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    },
                  }}
                  value={formData.file}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ background: "#1976d2", color: "#fff" }}
              >
                Finish
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default GoogleClone;
