import { Response, Request } from "miragejs";
import { handleErrors } from "../server";
import { User } from "../../../interfaces/user.interface";
import { randomBytes } from "crypto";


const generateToken = () => randomBytes(8).toString("hex");

export interface AuthResponse {
  token: string;
  user: User;
}

const login = (scheme: any, req: Request): AuthResponse | Response => {
  const { username, password } = JSON.parse(req.requestBody);
  const user = scheme.users.findBy({ username });
  if (!user) {
    return handleErrors(null, "No user with  that username exists");
  }
  if (password !== user.password) {
    return handleErrors(null, "Password is invalid");
  }

  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};

const signup = (scheme: any, req: Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  const exUser = scheme.users.findBy({ username: data.username });
  if (exUser) {
    return handleErrors(null, "A User with that username already exists. ");
  }
  const user = scheme.users.create(data);
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};

export default {
  login,
  signup,
};
