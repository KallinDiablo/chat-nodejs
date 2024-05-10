import IsAuth from "../../features/auth/AuthCheck";
import { ToastContainer } from "react-toastify";
import Avatar from "./childComponents/avatar";
import Profile from "./childComponents/profile";
import SideBar from "../mainPage/childComponents/sidebar";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const PersonalProfilePage = () => {
  const navigate = useNavigate()
  const toMainPage=()=>{
    setTimeout(()=>{
      navigate("/")
    },100)
  }
  return (
    <>
      <IsAuth />
      <div className="flex h-full w-full bg-gray-100 rounded-lg opacity-80">
        <div className="relative">
      <SideBar />
      <div className="absolute m-1 p-1 top-0 text-lg -right-32 z-30 text-gray-700">
      <button className="flex items-center " type="button" onClick={toMainPage}>Main Page <FaArrowLeft className="ml-1 size-5 hover:size-7"/></button>
      </div>
        </div>
        <div className="flex p-10 m-auto">
              <Avatar />
            <div className="ml-20 p-10"><Profile/></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default PersonalProfilePage;
