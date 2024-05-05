import react, { useEffect, useState } from "react";
import "./signPage.css";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./childComponents/signIn";
import SignUp from "./childComponents/signUp";
import axios from "axios";
import Constraints from "../../constraints/constraints";
import { setAccessToken } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
function SignPage() {
  const constants = new Constraints();
  const navigate = useNavigate();
  const [currentPageStatue, setCurrentPageStatue] = useState(1);
  const [checkUsingAPI, setCheckUsingAPI] = useState(true);
  const [messages, setMessages] = useState([
    { status: 200, message: "Access to Sign page" },
  ]);
  const dispatch = useDispatch();
  async function SignInAPI(username: string, password: string) {
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
  }
  async function SignUpAPI(
    fullname: string,
    username: string,
    password: string,
    email: string,
    pNumber: string,
    avatarFile: any
  ) {
    const result = await axios.post(
      `${constants.api_server}/api/user/register`,
      {
        fullname: fullname,
        username: username,
        password: password,
        email: email,
        pNumber: pNumber,
        avatarFile: avatarFile,
      },
      {
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
  }
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

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                      ? "bg-indigo-900 text-white"
                      : "text-gray-900 hover:bg-indigo-700 hover:text-white",
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
}
export default SignPage;
