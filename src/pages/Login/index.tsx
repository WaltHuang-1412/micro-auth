import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export default function Login() {
  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" mb={2} fontWeight="bold">
          登入
        </Typography>
        <Stack spacing={2}>
          <TextField label="帳號" variant="outlined" fullWidth />
          <TextField
            label="密碼"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" fullWidth>
            登入
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
