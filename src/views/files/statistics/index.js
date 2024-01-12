import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  ListItemText,
  Pagination,
  Stack,
  ListItem,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

import { statisticsList } from "store/action/statistics.action";
import { Link } from "react-router-dom";

const List = styled(ListItem)({
  justifyContent: "center",
  fontSize: "15px",
});

const Paginate = styled(Pagination)({
  ul: {
    justifyContent: "center",
    marginBottom: "10px",
  },
});
const Statistics = () => {
  const dispatch = useDispatch();
  const StatisticsList = useSelector(
    (state) => state.StatisticsReducer.statistics
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(statisticsList(page));
    // eslint-disable-next-line
  }, [page]);

  return (
    <Box>
      <Typography
        variant="h4"
        color="#000000"
        component="div"
        textAlign="center"
      >
        {StatisticsList.lang_caption}
      </Typography>

      <Typography style={{ textAlign: "center", padding: "5px" }}>
        {StatisticsList.lang_extratext}
      </Typography>
      <Divider />

      {StatisticsList.aStatSale ? (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {StatisticsList.aStatSale &&
            StatisticsList.aStatSale.map((item, i) => (
              <Box key={i}>
                <List>
                  <ListItem>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/search/details/${item.globalID}`}
                    >
                      <ListItemText>{item.title}</ListItemText>
                    </Link>
                  </ListItem>
                  <Box>
                    <Typography style={{ textAlign: "end" }}>
                      {item.profit}
                    </Typography>
                  </Box>
                </List>
                <Divider />
              </Box>
            ))}
          <Grid>
            {StatisticsList.paginationCount === 1 ? (
              false
            ) : (
              <Stack spacing={2} mt={3}>
                <Paginate
                  count={StatisticsList.paginationCount}
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
          <Typography> {StatisticsList.lang_empty}</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default Statistics;
