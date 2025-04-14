import axios from "../axios";
import { LoginRequest, RegisterRequest, AuthResponse } from "./type";

export * from "./type";

export const postLogin = (request: LoginRequest): Promise<AuthResponse> =>
  axios.post("/login", request);

export const postRegister = (request: RegisterRequest): Promise<AuthResponse> =>
  axios.post("/register", request);
