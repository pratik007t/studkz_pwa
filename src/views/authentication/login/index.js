import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppleIcon from "@mui/icons-material/Apple";

import { login, SocketIo } from "../../../store/action/auth.action";
import {
  auth,
  provider,
  appleProvider,
  requestPermissionWihtoutLogin,
} from "../../../config/firebase";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();
const override = {
  display: "block",
  margin: "0 auto",
  color: "#a7e119",
  marginTop: "40px",
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const SocketToken = localStorage.getItem("socketToken");

  useEffect(() => {
    if (SocketToken) {
      navigate("/search");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SocketToken]);

  useEffect(() => {
    requestPermissionWihtoutLogin();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const data = await auth.signInWithPopup(provider);
      const token = data?.user?.multiFactor?.user?.accessToken;
      const result = await dispatch(login(data, token));
      if (result) {
        dispatch(SocketIo());
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setIsLoading(true);
      const data = await auth.signInWithPopup(appleProvider);
      const token = data?.user?.multiFactor?.user?.accessToken;
      const result = await dispatch(login(data, token));
      if (result) {
        dispatch(SocketIo());
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img src="/studkz_logo.png" alt="studkz_logo" width={"120"} />
              <p
                style={{
                  fontSize: "30px",
                  color: "olivedrab",
                  marginTop: "30px",
                  marginLeft: "15px",
                }}
              >
                Stud.kz
              </p>
            </span>
          </div>

          <Box component="form" noValidate>
            {isLoading ? (
              <CircularProgress style={override} />
            ) : (
              <div>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    width: "250px",
                    borderRadius: 0,
                    borderColor: "#7dbf41",
                    backgroundColor: "#fff",
                    color: "#000000",

                    textTransform: "none",
                  }}
                  onClick={() => signInWithGoogle()}
                >
                  <img src="/google.png" alt="studkz_logo" width={"30"} />
                  Google
                </Button>

                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={() => signInWithApple()}
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={<AppleIcon />}
                  style={{
                    width: "250px",
                    borderRadius: 0,
                    backgroundColor: "#000000",
                    borderColor: "#7dbf41",
                    color: "white",
                    padding: "10px",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Apple
                </Button>
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
