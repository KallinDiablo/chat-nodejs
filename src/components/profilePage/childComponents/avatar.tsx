import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import Constraints from "../../../constraints/constraints";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { useDispatch } from "react-redux";
import { setRefreshToken } from "../../../features/auth/authSlice";
import { Image } from "antd";

const Avatar = () => {
  const profile = useSelector((state: any) => state.profile);
  const constraints = new Constraints();
  const dispatch = useDispatch();
  const [checkUsingAPI, setCheckUsingAPI] = useState(true);
  const accessToken = useSelector((state: any) => state.accessToken);
  const [messages, setMessages]: any = useState([]);

  const updateAvatar = async (avatar: any) => {
    if (avatar !== undefined) {
      const form = new FormData();
      form.append("avatar", avatar);
      const callAPI = await axios({
        method: "patch",
        url: `${constraints.api_server}/api/user/changeAvatar`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${accessToken}`,
        },
      });
      const data = callAPI.data;
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
        dispatch(setRefreshToken(data.data));
        const message: any = [{ status: 200, message: "Updated Avatar" }];
        setMessages(message);
      }
      setCheckUsingAPI(!checkUsingAPI);
      return data;
    }
  };
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      <div>
        <button
          className="m-1 p-2 flex items-center bg-emerald-500 text-gray-100 font-medium rounded-md hover:bg-emerald-600"
          onClick={() => {
            imageInputRef.current?.click();
          }}
        >
          Change avatar <MdEdit size={20} className="ml-1" />
        </button>

        <div className="min-w-20 max-w-52 min-h-20 max-h-52 rounded-md">
          <Image
            className="rounded-md"
            width={208}
            height={208}
            src={`${constraints.api_server}/static${profile.avatar}`}
          />
        </div>

        <input
          type="file"
          accept=".jpeg,.jpg,.png,.gif"
          className="hidden"
          multiple={false}
          ref={imageInputRef}
          onChange={(e: any) => updateAvatar(e.target.files[0])}
        />
      </div>
    </>
  );
};
export default Avatar;
