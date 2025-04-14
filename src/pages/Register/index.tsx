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
import { postRegister } from "../../api/auth";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  username: yup.string().required("請輸入使用者名稱").min(3).max(20),
  email: yup.string().required("請輸入 Email").email("Email 格式錯誤"),
  password: yup.string().required("請輸入密碼").min(6).max(20),
  confirmPassword: yup
    .string()
    .required("請再次輸入密碼")
    .oneOf([yup.ref("password")], "密碼不一致"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [openError, setOpenError] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      await postRegister({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigate("/login");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "註冊失敗";
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
              建立帳戶
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
              sx={{ mt: 2 }}
            >
              <TextField
                fullWidth
                label="使用者名稱"
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
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
              <TextField
                fullWidth
                label="確認密碼"
                margin="normal"
                type="password"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 3 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "註冊中…" : "註冊"}
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                已經有帳號？{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/login")}
                >
                  立即登入 →
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

export default Register;
