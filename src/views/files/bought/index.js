import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  ListItemText,
  Stack,
  Pagination,
  ListItem,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { boughtList } from "store/action/bought.action";
import { Link } from "react-router-dom";

const Paginate = styled(Pagination)({
  ul: {
    justifyContent: "center",
    marginBottom:"10px"

  },
});

const Bought = () => {
  const dispatch = useDispatch();
  const BoughtList = useSelector((state) => state.BoughtReducer.bought);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(boughtList(page));
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Box>
      <Typography
        variant="h4"
        color="#000000"
        component="div"
        textAlign="center"
     
      >
        {BoughtList.lang_caption}
      </Typography>
      <Typography style={{ textAlign: "center",padding:"5px" }}>
      {BoughtList.lang_extratext} </Typography>
      <Divider />

      
      {BoughtList.aHistoryBuy ? (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {BoughtList.aHistoryBuy &&
            BoughtList.aHistoryBuy.map((item, i) => (
              <Box key={i} style={{ padding: "5px" }}>
                <ListItem>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/search/details/${item.globalID}`}
                  >
                    <ListItemText>{item.title}</ListItemText>
                  </Link>
                </ListItem>
                <Divider />
              </Box>
            ))}
          <Grid>
            {BoughtList.paginationCount === 1 ? (
              false
            ) : (
              <Stack spacing={2} mt={3}>
                <Paginate
                  count={BoughtList.paginationCount}
                  color="primary"
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid
          style={{ textAlign: "center", marginTop: "200px", fontSize: "15px" }}
        >
          <Typography>{BoughtList.lang_empty}</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default Bought;
