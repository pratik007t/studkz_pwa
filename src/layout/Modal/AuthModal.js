import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppleIcon from "@mui/icons-material/Apple";
// import Google from "../../assets/images/icons/google.png";
import { login, SocketIo } from "../../store/action/auth.action";
import { auth, provider, appleProvider } from "../../config/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal } from "@mui/material";

const override = {
  display: "block",
  margin: "0 auto",
  color: "#a7e119",
  marginTop: "40px",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();

const AuthModal = ({ open, onClose, onButton }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
  
    try {
      setIsLoading(true);
      const data = await auth.signInWithPopup(provider);
      const token = data?.user?.multiFactor?.user?.accessToken;
      const result = await dispatch(login(data, token));
      setIsLoading(false);
      if (result) {
        dispatch(SocketIo());
        onClose();
      }
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
      setIsLoading(false);
      if (result) {
        dispatch(SocketIo());
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
                          // padding: "14px 30px",
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
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
