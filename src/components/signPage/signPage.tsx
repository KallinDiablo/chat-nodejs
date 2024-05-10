import react, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./childComponents/signIn";
import SignUp from "./childComponents/signUp";
import axios from "axios";
import Constraints from "../../constraints/constraints";
import { setAccessToken } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SignPage = () => {
  const constants = new Constraints();
  const navigate = useNavigate();
  const [currentPageStatue, setCurrentPageStatue] = useState(1);
  const [checkUsingAPI, setCheckUsingAPI] = useState(true);
  const [messages, setMessages] = useState([
    { status: 200, message: "Access to Sign page" },
  ]);
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.accessToken);
  useEffect(() => {
    if (accessToken !== null) {
      navigate("/");
    }
  }, [accessToken]);
  const SignInAPI = async (username: string, password: string) => {
    const result = await axios.post(`${constants.api_server}/api/user/login`, {
      username: username,
      password: password,
    });
    const data = result.data;
    if (data.success === false) {
      const getError = [];
      if (data.type === "Validate Error") {
        for (const item of data.message) {
          getError.push({ status: 500, message: item.message });
        }
      } else {
        getError.push({ status: 500, message: data.message });
      }
      setMessages(getError);
    } else {
      dispatch(setAccessToken(data.data));
      navigate("/");
    }
    setCheckUsingAPI(!checkUsingAPI);
    return data;
  };
  const SignUpAPI = async (
    fullname: string,
    username: string,
    password: string,
    email: string,
    pNumber: string,
    avatar: any
  ) => {
    const form = new FormData()
    form.append("fullname",fullname)
    form.append("username",username)
    form.append("password",password)
    form.append("email",email)
    form.append("pNumber",pNumber)
    form.append("avatar",avatar)
    const result = await axios(
      {
        method: "post",
        url: `${constants.api_server}/api/user/register`,
        data: form,
        headers: {
            "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = result.data;
    const messages = [];
    if (data.success === false) {
      if (data.type === "Validate Error") {
        for (const item of data.message) {
          messages.push({ status: 500, message: item.message });
        }
      } else {
        messages.push({ status: 500, message: data.message });
      }
    } else {
      messages.push({ status: 200, message: data.message });
      setCurrentPageStatue(1);
    }
    setMessages(messages);
    setCheckUsingAPI(!checkUsingAPI);
    return data;
  };
  useEffect(() => {
    if (
      messages.find((e) => (e = { status: 1, message: "string" })) !== undefined
    ) {
      setMessages([]);
    }
    if (messages.length !== 0) {
      for (const item of messages) {
        if (item.status === 500) {
          toast.error(item.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        } else {
          toast.success(item.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        }
      }
    }
    setMessages([]);
  }, [checkUsingAPI]);
  const navigation = [
    { name: "Sign in", page: 1 },
    { name: "Sign up", page: 2 },
  ];

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentPageStatue(item.page);
                  }}
                  className={classNames(
                    item.page === currentPageStatue
                      ? "bg-emerald-900 text-gray-50"
                      : "text-gray-900 bg-emerald-600 hover:bg-emerald-800 hover:text-gray-50",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={
                    item.page === currentPageStatue ? "page" : undefined
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          {currentPageStatue && currentPageStatue === 1 ? (
            <SignIn SignInAPI={SignInAPI} />
          ) : (
            <SignUp SignUpAPI={SignUpAPI} />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default SignPage;
