import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Grid,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { balanceList } from "store/action/balance.action";

const theme = createTheme();

const Balance = () => {
  const dispatch = useDispatch();
  const BalanceList = useSelector((state) => state.BalanceReducer.balance);
  
  const fId = useParams();
 
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [fId?.id]);

  const getData = async() => {
     await dispatch(balanceList(fId?.id));
  };
  const isValidBase64 = (str) => {
    try {
      window.atob(str);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const decodeBase64 = (str) => {
    if (isValidBase64(str)) {
      return decodeURIComponent(window.atob(str));
    }
  };

  const data = decodeBase64(BalanceList?.topinfo);
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <h3>{data}</h3>
            </Container>
          </ThemeProvider>
          <Typography
          variant="h5"
          dangerouslySetInnerHTML={{ __html: BalanceList?.info }}
        ></Typography>
        </Grid>
    </Box>
  );
};

export default Balance;
