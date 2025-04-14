import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postLogin } from "../../api/auth";
import type { AuthResponse } from "../../api/auth";

const schema = yup
  .object({
    email: yup.string().required("請輸入 Email").email("Email 格式錯誤"),
    password: yup
      .string()
      .required("請輸入密碼")
      .min(6, "密碼至少 6 字")
      .max(20, "最多 20 字"),
  })
  .required()
  .defined();

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const defaultEmail = localStorage.getItem("lastLoginEmail") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: defaultEmail,
      password: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [openError, setOpenError] = useState(false);

  const withBase = (path: string): string => {
    const base = location.pathname.startsWith("/micro-root")
      ? "/micro-root"
      : "";
    return `${base}${path}`;
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      const response: AuthResponse = await postLogin(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("lastLoginEmail", formData.email); // ✅ 記住 email
      window.location.href = withBase("/sub");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "登入失敗";
      setErrorMsg(msg);
      setOpenError(true);
    }
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
            >
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label="密碼"
                margin="normal"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 3 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "登入中…" : "登入"}
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

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setOpenError(false)}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default Login;
