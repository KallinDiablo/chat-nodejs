import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import Input from "./input";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { setRefreshToken } from "../../../features/auth/authSlice";
import axios from "axios";
import Constraints from "../../../constraints/constraints";
import { IoCloseSharp } from "react-icons/io5";
const Profile = () => {
  const constraints = new Constraints();
  const [showModal, setShowModal] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const profile1 = useSelector((state: any) => state);
  console.log(profile1)
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [pNumber, setPNumber] = useState();
  const [messages, setMessages]: any = useState([]);
  const [checkUsingAPI, setCheckUsingAPI] = useState(true);
  const [oldpassword, setOldPassword] = useState();
  const [newpassword, setNewPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const dispatch = useDispatch();
  const UpdateProfile = async () => {
    const token = refreshToken === null ? accessToken : refreshToken;
    const callAPI = await axios({
      method: "post",
      url: `${constraints.api_server}/api/user/editProfile`,
      data: {
        fullname: fullname,
        email: email,
        pNumber: pNumber,
      },
      headers: {
        Authorization: token,
      },
    });
    const data = callAPI.data;
    const messages = [];
    if (data.success === false) {
      if (data.type === "Validate Error") {
        for (const item of data.message) {
          messages.push({ status: 500, message: item.message });
        }
      } else {
        messages.push({ status: 500, message: data.message });
      }
      setMessages(messages);
    } else {
      dispatch(setRefreshToken(data.data));
      const message: any = [{ status: 200, message: "Updated profile" }];
      setMessages(message);
    }
    setCheckUsingAPI(!checkUsingAPI);
    return data;
  };
  const clearUseState = () => {
    setFullname(undefined);
    setEmail(undefined);
    setPNumber(undefined);
  };
  const ChangePassword = async () => {
    const token = refreshToken === null ? accessToken : refreshToken;
    const callAPI = await axios({
      method: "patch",
      url: `${constraints.api_server}/api/user/changePassword`,
      data: {
        oldPassword: oldpassword,
        newPassword: newpassword,
        newRepassword: confirmpassword,
      },
      headers: {
        Authorization: token,
      },
    });
    const data = callAPI.data;
    const messages = [];
    if (data.success === false) {
      if (data.type === "Validate Error") {
        for (const item of data.message) {
          messages.push({ status: 500, message: item.message });
        }
      } else {
        messages.push({ status: 500, message: data.message });
      }
      setMessages(messages);
    } else {
      dispatch(setRefreshToken(data.data));
      const message: any = [{ status: 200, message: "Updated profile" }];
      setMessages(message);
    }
    setCheckUsingAPI(!checkUsingAPI);
    return data;
  };
  useEffect(() => {
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
  return (
    <>
      <div className="w-96 mx-auto">
        <Input
          name="Fullname"
          id="fullname"
          value={profile.fullname}
          function={(e: any) => setFullname(e.target.value)}
        />
        <Input
          name="Email"
          id="email"
          value={profile.email}
          function={(e: any) => setEmail(e.target.value)}
        />
        <Input
          name="Phone Number"
          id="pNumber"
          value={profile.pNumber}
          function={(e: any) => setPNumber(e.target.value)}
        />
        <div className="flex-initial mb-5 w-full">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="flex flex-1 items-stretch">
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="********"
                disabled
              />
              <button
                className="ml-1 self-center bg-emerald-500 text-gray-100 font-medium rounded-md hover:bg-emerald-600"
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <MdEdit className="" size={32} />
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-gray-50 bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => {
            UpdateProfile();
            clearUseState();
          }}
        >
          Update profile
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-xl font-semibold text-gray-600">
                    Change password
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-400 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <IoCloseSharp size={32} className="text-gray-400" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Input
                    name="Old password"
                    id="password"
                    value=""
                    function={(e: any) => setOldPassword(e.target.value)}
                  />
                  <Input
                    name="New password"
                    id="password"
                    value=""
                    function={(e: any) => setNewPassword(e.target.value)}
                  />
                  <Input
                    name="Confirm password"
                    id="password"
                    value=""
                    function={(e: any) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {ChangePassword()
                        setShowModal(false)}}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Profile;
