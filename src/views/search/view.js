import React, { useEffect, useState } from "react";
import { getData } from "store/action/search.action";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, List, ListItemText } from "@mui/material";
import { Typography, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const View = (props) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getByIDdata = useSelector((state) => state.SearchReducer.result);
  const size = useSelector((state) => state.SearchReducer.fontSize);

  const MainChainData = useSelector(
    (state) => state.SearchReducer.commonMainChain
  );
  const PreviousMainChain = useSelector(
    (state) => state.SearchReducer.previousMainChain
  );
  const LikeChain = useSelector((state) => state.SearchReducer.likeChain);

  const search = localStorage.getItem("lists");
  const user = useSelector((state) => state.auth);
  const dataSize = size?.[0]?.fontSize;
  const { gId } = useParams();

  useEffect(() => {
    if (user?.token && gId) {
      getDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gId, user?.token, search]);

  const getDetails = async () => {
    setIsLoading(true);
    try {
      if (LikeChain?.length > 0) {
        const data = LikeChain.toString().split(",");
        if (data?.length > 0) {
          if (data.includes(gId)) {
            const response = await dispatch(getData(gId, LikeChain));
            if (response) {
              setIsLoading(false);
            }
          } else {
            handleMainChain();
          }
        } else {
          handleMainChain();
        }
      } else {
        handleMainChain();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMainChain = async () => {
    const chain = MainChainData;
    const data = chain?.toString().split(",");
    dispatch({
      type: "LIKE_CHAIN",
      payload: [],
    });

    if (data?.length > 0) {
      if (data.includes(gId)) {
        await dispatch(getData(gId, chain));
        setIsLoading(false);
      } else {
        handlePreviousChain();
      }
    } else {
      handlePreviousChain();
    }
  };

  const handlePreviousChain = async () => {
    const chain = PreviousMainChain;
    const data = chain?.toString().split(",");

    dispatch({
      type: "MAIN_CHAIN",
      payload: [],
    });

    dispatch({
      type: "LIKE_CHAIN",
      payload: [],
    });

    if (data?.length > 0) {
      if (data.includes(gId)) {
        await dispatch(getData(gId, chain));
        setIsLoading(false);
      } else {
        await dispatch(getData(gId));
        setIsLoading(false);
      }
    } else {
      await dispatch(getData(gId));
      setIsLoading(false);
    }
  };

  const decreptData = (text) => {
    const result = decodeURIComponent(text);
    return result.replace(/\+/g, " ")?.replace(/^\s+|\s+$/gm, "");
  };

  const handleLikeEvent = (item) => {
    dispatch({
      type: "CLICKED_ON_LIKE_CHAIN",
      payload: true,
    });

    Navigate(`/search/details/${item}`);
  }
  return (
    <Box>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress sx={{ color: "#72c02c" }} />
        </Backdrop>
      ) : (
        <Grid>
          <Typography
            variant="h4"
            style={{ fontSize: dataSize, textAlign: "center" }}
          >
            {getByIDdata?.title}
          </Typography>

          <Typography variant="h4" sx={{ mt: 3 }}>
            <Typography
              sx={{ fontSize: "16px" }}
              style={{ fontSize: dataSize, lineHeight: "1.75" }}
              dangerouslySetInnerHTML={{
                __html: decreptData(getByIDdata?.text),
              }}
            ></Typography>
          </Typography>
          <Typography
            variant="h4"
            mt={6}
            style={{ textAlign: "center", fontSize: dataSize }}
          >
            {getByIDdata?.lang_likelist}
          </Typography>

          <List sx={{ mt: 1 }} component="nav" aria-label="mailbox folders">
            {getByIDdata?.aLike?.map((item, index) => {
              return (
                <Box key={index}>
                  <hr />
                  <ListItemText>
            
                      <Typography
                        style={{
                          fontSize: size?.length === 0 ? "16px" : dataSize,
                          color: "#000",
                          margin: "10px 0 10px 0",
                        }}
                        onClick={() => handleLikeEvent(item?.likeID)}
                      >
                        {item?.title}
                      </Typography>
                  
                  </ListItemText>
                </Box>
              );
            })}
          </List>
        </Grid>
      )}
    </Box>
  );
};

export default View;
