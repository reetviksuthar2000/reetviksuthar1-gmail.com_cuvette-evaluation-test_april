import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const Login = async (email, password) => {
  try {
    const requrl = `${backendUrl}/auth/login`;
    const reqPayload = {
      email: email,
      password: password,
    };
    const response = await axios.post(requrl, reqPayload);
    localStorage.clear();
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("email", response.data.user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (name, mobile, email, password) => {
  try {
    const requrl = `${backendUrl}/auth/register`;
    const reqPayload = {
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    };
    const response = await axios.post(requrl, reqPayload);
    localStorage.clear();
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("email", response.data.user);
    return response;
  } catch (error) {
    console.log(error);
  }
};
