import {
  LoginFormData,
  SignupFormData,
} from "../components/landing/HeroImage.tsx";
import toast from "react-hot-toast";
import {
  getPostRequestOption,
  getSecurePostRequestOption,
} from "./utilities.ts";

async function login(data: LoginFormData) {
  const requestOptions = getSecurePostRequestOption(data);
  const tl = toast.loading("Logging In");
  const result = await fetch(
    `${process.env.BASE_URL}/auth/login`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      toast.error("Something went wrong", { id: tl });
      console.log("error happend in the auth login : ", err);
    });
  if (result.err) toast.error(result.err, { id: tl });
  else {
    window.document.cookie = `loggedIn=true; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000).toUTCString()}`;
    toast.success("Logged In", { id: tl });
  }
  return result;
}

async function signup(data: SignupFormData) {
  const requestOptions = getPostRequestOption({
    ...data,
    passwordCopy: undefined,
  });
  const tl = toast.loading("Signing Up");
  const result = await fetch(
    `${process.env.BASE_URL}/auth/signup`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      toast.error("Something went wrong", { id: tl });
      console.error(error);
    });
  if (result.err) {
    toast.error(result.err, { id: tl });
  } else {
    toast.success("Signed Up", { id: tl });
    return login({ username: data.username, password: data.password });
  }
  return result;
}

const auth = {
  login,
  signup,
};
export default auth;
