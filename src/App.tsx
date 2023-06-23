import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import "./styles.css";
import LandingPage from "./components/landing";

export default function App() {
  return (
    <>
      <div className="App">
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#000"
          }}
        >
          <Box
            sx={{
              bgcolor: "#232425",
              minHeight: "100vh",
              maxHeight: "100vh"
            }}
          >
            <Box
              sx={{
                background: "#148291",
                borderRadius: "4px 4px 0px 0px",
                height: "30px"
              }}
            >
              <Stack direction="row">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="page-title"
                >
                  AUDIT
                </Typography>
                <CloseIcon
                  sx={{
                    color: "#fff",
                    position: "absolute",
                    right: 0,
                    mt: 0.5
                  }}
                  fontSize="small"
                />
              </Stack>
            </Box>
            <LandingPage />
          </Box>
        </div>
      </div>
    </>
  );
}
