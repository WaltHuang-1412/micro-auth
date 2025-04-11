import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = "/sub"; // ✅ 登入後導向主內容
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.05 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom align="center">
              登入帳戶
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                type="email"
                required
              />
              <TextField
                fullWidth
                label="密碼"
                margin="normal"
                type="password"
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 3 }}
              >
                登入
              </Button>
            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                還沒有帳號？{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/register")}
                >
                  立即註冊 →
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Login;
