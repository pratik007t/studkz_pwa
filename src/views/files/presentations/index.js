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
import { presentationList } from "store/action/presentation.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Paginate = styled(Pagination)({
  ul: {
    justifyContent: "center",
    marginBottom: "10px",
  },
});
const Presentations = () => {
  const dispatch = useDispatch();

  const PresentationList = useSelector(
    (state) => state.PresentationReducer.presentation
  );

  const [page, setPage] = useState();

  useEffect(() => {
    dispatch(presentationList(page));
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
        {PresentationList.lang_caption}
      </Typography>

      <Typography style={{ textAlign: "center", padding: "5px" }}>
        {PresentationList.lang_extratext}
      </Typography>
      <Divider />

      {PresentationList.aMyPrezent ? (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {PresentationList.aMyPrezent &&
            PresentationList.aMyPrezent.map((item, i) => (
              <Box key={i} style={{ padding: "8px" }}>
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
            {PresentationList.paginationCount === 1 ? (
              false
            ) : (
              <Stack spacing={2} mt={3}>
                <Paginate
                  count={PresentationList.paginationCount}
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
          <Typography> {PresentationList.lang_empty}</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default Presentations;
