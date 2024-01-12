import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { boardList } from "../../store/action/board.action";
import { useDispatch, useSelector } from "react-redux";

const About = () => {

  const dispatch = useDispatch();
  const BoardList = useSelector((state) => state.BoardReducer.board);
  useEffect(() => {
    dispatch(boardList());
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography
          variant="h5"
          dangerouslySetInnerHTML={{ __html: BoardList?.info }}
        ></Typography>
      </Grid>
    </Box>
  );
};

export default About;
