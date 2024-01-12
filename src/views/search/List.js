import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Backdrop,
  ListItem,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  List,
  TextField,
  CircularProgress,
} from "@mui/material";
import { searchAction } from "./../../store/action/search.action";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { IconContext } from "react-icons";

const IconRenderer = ({ iconType, iconName }) => {
  const IconComponent = iconType[iconName]; // Get the icon component dynamically

  if (!IconComponent) {
    return null; // If the icon component doesn't exist, return null or show a placeholder
  }

  return (
    <IconContext.Provider value={{ size: "2em" }}>
      <IconComponent />
    </IconContext.Provider>
  );
};

const SearchList = () => {
  const dispatch = useDispatch();

  const text = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [searchText, setSearchText] = useState(text?.text);
  
  const mySearch = useSelector((state) => state.SearchReducer.lists.searchRes);
  const SearchResponse = useSelector((state) => state.SearchReducer.search);
  const searchFilterData = useSelector(
    (state) => state.SearchReducer.selectedFilterItems
  );
  const searchSparkData = useSelector(
    (state) => state.SearchReducer.selectedSparkFilterItems
  );
 
  const iconTypeMap = {
    Ai: require("react-icons/ai"),
    Bi: require("react-icons/bi"),
    Hi: require("react-icons/hi"),
  };

  useEffect(() => {
    if (SearchResponse.length === 0) {
      setIsLoading(true);
      const data = dispatch(
        searchAction(
          text?.text,
          text?.filter === "filter" ? null : text?.filter,
          text?.language
        )
      );
      if (data) {
        localStorage.setItem("language", text?.language);
      }
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
    if (hasChanges) {
      if (searchSparkData?.type === "filter") {      
        await dispatch(searchAction(searchText,searchSparkData?.data?.split(":")[1].split("#")[0]),searchSparkData?.data?.split(":")[2]);
      } else if (searchFilterData?.[0]?.filter) {
        await dispatch(searchAction(searchText, searchFilterData?.[0]?.filter));
      } else {
        await dispatch(searchAction(searchText));
      }
    }
  }
  fetchData();
}, [searchText, hasChanges, searchSparkData, searchFilterData, dispatch]);


  const handleClick = async (event) => {
    setIsLoading(true);
    const response = searchFilterData?.[0]?.filter || searchSparkData?.data?.split(":")[1].split("#")[0]
    if(response){
      const data = await dispatch(searchAction(searchText,response));
      if (data) {
        setIsLoading(false);
      }  
    }else{
    const data = await dispatch(searchAction(searchText));
    if (data) {
      setIsLoading(false);
    }
  }
  };

  const clearText = () => {
    setSearchText("");
  };

  const handleClickEvent = (item) => {
    dispatch({
      type: "FAVORITE_EMPTY",
    });

    dispatch({
      type: "PRESENTATION_EMPTY",
    });

    dispatch({
      type: "WORD_EMPTY",
    });

    dispatch({
      type: "STATISTICS_EMPTY",
    });

    dispatch({
      type: "BOUGHT_EMPTY",
    });

    // Track the link click event using the event function
    ReactGA.event({
      action: "Search View",
      category: "Search Results",
      label: item.title,
    });
  };

  return (
    <>
      <Grid container spacing={1} pt={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControl
                sx={{
                  width: !mySearch ? "100%" : "86%",
                  padding: 0,
                  margin: 0,
                  position: mySearch ? "fixed" : "unset",
                  zIndex: 1,
                }}
              >
                <TextField
                  sx={{
                    img: {
                      marginRight: "10px",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#72c02c",
                        borderRadius: "0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#72c02c",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding:
                          searchFilterData?.[0]?.filter || searchSparkData.name
                            ? "10px 10px 10px 5px"
                            : "none", // Add padding to the right
                      },
                    },
                  }}
                  name="searchStr"
                  type="text"
                  size="small"
                  variant="outlined"
                  autoFocus={true}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setHasChanges(true);
                  }}
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

                    startAdornment:
                      searchFilterData?.[0]?.react_icon ? (
                        <IconRenderer
                          iconType={
                            iconTypeMap[
                              searchFilterData?.[0]?.react_icon.substring(0, 2)
                            ]
                          }
                          iconName={searchFilterData?.[0]?.react_icon}
                        />
                      ) : searchSparkData?.react_icon ? (
                        <IconRenderer
                          iconType={
                            iconTypeMap[
                              searchSparkData.react_icon.substring(0, 2)
                            ]
                          }
                          iconName={searchSparkData.react_icon}
                        />
                      ) : (
                        <> </>
                      ),
                  }}
                />
              </FormControl>
            </Grid>
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
                        style={{ textDecoration: "none", color: "#000" }}
                        to={`/search/details/${item.globalID}`}
                        onClick={() => handleClickEvent(item)}
                      >
                        <ListItem sx={{ fontSize: "16px" }}>
                          {item.title}
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
    </>
  );
};

export default SearchList;
