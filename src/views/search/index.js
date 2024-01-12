
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Backdrop,
  ListItem,
  ListItemText,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  List,
  Radio,
  RadioGroup,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  cleanData,
  searchAction,
  SparkFilter,
} from "./../../store/action/search.action";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import SparkFilterModal from "layout/Modal/SparkFilterModal";
import ReactGA from "react-ga4";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    ".MuiInputBase-colorSecondary": {
      backgroundColor: "red",
    },
    "& fieldset": {
      borderColor: "#72c02c",
      borderRadius: "0",
    },

    "&:hover fieldset": {
      borderColor: "#72c02c",
    },
  },
});

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const search = useSelector((state) => state.SearchReducer.search);
  const [searchText, setSearchText] = useState(search);
  const [filterOpenModal, setFilterModal] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const mySearch = useSelector((state) => state.SearchReducer.lists.searchRes);
  const fastSearchStorage = sessionStorage.getItem("fastSearch");

  useEffect(()=>{
    dispatch({
      type: "CLICKED_ON_LIKE_CHAIN",
      payload: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchText]);

  useEffect(() => {
    if (fastSearchStorage && debouncedSearchText.length > 1) {
      const fetchData = async () => {
        // eslint-disable-next-line
        const data = await dispatch(searchAction(debouncedSearchText));
        navigate(`/search/${language}/filter/${debouncedSearchText}`);
        sessionStorage.removeItem("fastSearch");
        setIsLoading(false);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastSearchStorage, debouncedSearchText]);

  useEffect(() => {
    setSearchText("");
    dispatch(cleanData());
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchText && searchText.length === 1) {
          const data = await dispatch(searchAction(searchText));
          sessionStorage.setItem("fastSearch", data.fastSearch);
        }
      } catch (error) {}
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleClick = async (event) => {
    if (searchText) {
      setIsLoading(true);
      if (searchText.length === 1 && !fastSearchStorage) {
        const data = await dispatch(searchAction(searchText));
        sessionStorage.setItem("fastSearch", data.fastSearch);
        setIsLoading(false);
      } else if (searchText.length === 0) {
        toast.warning(t("toast.emptyMessage"));
        setIsLoading(false);
      } else if (!fastSearchStorage && searchText.length > 1) {
        // eslint-disable-next-line
        const data = await dispatch(searchAction(searchText));
        navigate(`/search/${language}/filter/${searchText}`);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate("/search");
      }
      ReactGA.event({
        action: "Search View",
        category: "Search Text",
        label: searchText,
        value: 1,
      });
    } else {
      toast.warning(t("toast.message"));
    }
  };
  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("fastSearch");
  });

  const handleChangeLng = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const clearText = () => {
    setSearchText("");
  };

  const customRadio = <Radio size="small" />;

  const handleFilter = () => {
    setFilterModal(true);
    dispatch(SparkFilter());
  };

  const handleFilterClose = () => {
    setFilterModal(false);
  };
  return (
    <>
      {!mySearch && (
        <>
          <Box
            sx={{
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid>
              <span style={{ display: "flex", alignItems: "center" }}>
              <img src="/studkz_logo.png" alt="studkz_logo" width={70} />

                <p
                  style={{
                    fontSize: "30px",
                    color: "olivedrab",
                    marginTop: "35px",
                    marginLeft: "20px",
                  }}
                >
                  Stud.kz
                </p>
              </span>
            </Grid>
          </Box>

          <RadioGroup
            row
            sx={{
              width: "100%",
              padding: 0,
              margin: 0,
              justifyContent: "center",
            }}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={localStorage.getItem("language") || "kz"}
          >
            <FormControlLabel
              value="en"
              sx={{
                marginLeft: "-10px",
                marginRight: "0px",
              }}
              control={customRadio}
              label="in English"
              onClick={() => handleChangeLng("en")}
            />
            <FormControlLabel
              sx={{
                marginLeft: "-2px",
                marginRight: "1px",
              }}
              value="kz"
              control={customRadio}
              label="қазақша"
              onClick={() => handleChangeLng("kz")}
            />
            <FormControlLabel
              sx={{
                marginLeft: "-2px",
                marginRight: "-1px",
              }}
              value="ru"
              control={customRadio}
              label="на русском"
              onClick={() => handleChangeLng("ru")}
            />
          </RadioGroup>
        </>
      )}

      <Grid container spacing={1} pt={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControl
                sx={{
                  width: !mySearch ? "100%" : "90%",
                  padding: 0,
                  margin: 0,
                  position: mySearch ? "fixed" : "unset",
                  zIndex: 1,
                }}
              >
                <CssTextField
                  name="searchStr"
                  type="text"
                  size="small"
                  variant="outlined"
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleClick();
                    }
                  }}
                  value={searchText}
                  InputProps={{
                    sx: {
                      "& input": {
                        backgroundColor: "white",
                        color: "black",
                      },
                      backgroundColor: "white",
                      color: "black",
                    },

                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        {searchText && (
                          <ClearIcon
                            style={{ cursor: "pointer" }}
                            onClick={clearText}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>

            {!mySearch && (
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ textAlign: "center" }}
              >
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleClick}
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: "80%",
                    borderRadius: "0px",
                    color: "#fff",
                  }}
                >
                  {t("search_button.search")}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} pt={5}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {isLoading ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
                onClick={() => setIsLoading(false)}
              >
                <CircularProgress sx={{ color: "olivedrab" }} />
              </Backdrop>
            ) : (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {mySearch &&
                  mySearch.map((item, i) => (
                    <List key={i}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/search/details/${item.globalID}`}
                      >
                        <ListItem>
                          <ListItemText>{item.title}</ListItemText>
                        </ListItem>
                      </Link>
                      <Divider />
                    </List>
                  ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center" }}>
        <SparkFilterModal
          open={filterOpenModal}
          onClose={handleFilterClose}
          onButton={handleFilterClose}
        />

        <Button onClick={handleFilter}>
          <OfflineBoltOutlinedIcon
            style={{ height: "100px", width: "100px" }}
          />
        </Button>
      </Box>
    </>
  );
};

export default Search;
