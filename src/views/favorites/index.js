import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {Link } from "react-router-dom";
import {
  Divider,
  Grid,
  Typography,
  Toolbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { favoriteList } from "store/action/favorite.action";
import { useDispatch, useSelector } from "react-redux";

import ReactGA from "react-ga4";

const Favorites = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.FavoriteReducer.lists);
  const allList = data?.favList;
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(favoriteList());
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const anc = (e) => {
    const { value, checked } = e.target;
    let arr = [];
    if (checked) {
      arr = [...isChecked, value];
    } else {
      arr = isChecked.filter((e) => e !== value);
    }
    setIsChecked(arr);
    return arr;

  };
  const handleChange = async (e) => {
    const data = await anc(e);
    dispatch({
      type: "DELETE_FAVORITE",
      payload: data,
    });
  const { value, checked } = e.target;
  trackCheckboxClick(value, checked);
  };

  const trackCheckboxClick = (globalID, checked) => {
  ReactGA.event({
    action: "Favorite View",
    category: checked ? 'Checked' : 'Unchecked',
  });
};


  return (
    <Box>
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="h4" color="#000000" component="div">
          {data?.lang_caption}
        </Typography>
      </Toolbar>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress sx={{ color: "olivedrab" }} />
        </Backdrop>
      ) : (
        <Grid>
          {allList ? (
            <Grid>
              {allList &&
                allList.map((item) => (
                  <div key={item.globalID}>
                    <Divider />
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/search/details/${item.globalID}`}
                    >
                      <Typography style={{ margin: "12px 12px 12px 12px" }}>
                        {item.title}
                      </Typography>
                    </Link>
                    <Grid style={{ textAlign: "end" }}>
                      <input
                        type="checkbox"
                        value={item.globalID}
                        checked={item.isChecked}
                        size="small"
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                  </div>
                ))}
            </Grid>
          ) : (
            <Grid
              style={{
                textAlign: "center",
                marginTop: "350px",
                fontSize: "15px",
              }}
            >
              <Typography> {data?.lang_empty}</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};
export default Favorites;
