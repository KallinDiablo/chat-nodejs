import { useDispatch } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ToProfile = ()=>{navigate('/Profile')}
  const LogOut = () =>{dispatch(logOut(null))}
  return (
    <>
      <div
        className="fixed -right-20 bottom-4 m-1 p-2 z-40 bg-gray-200 text-gray-500 rounded-md text-xl"
      >
        <div className="p-0.5 mb-1 hover:bg-gray-300 hover:text-gray-900 rounded-md">
          <button
            onClick={() => {
                ToProfile();
            }}
          >
            Profile
          </button>
        </div>
        <div className="border-t-2 border-gray-700"></div>
        <div className="p-0.5 mt-1 hover:bg-gray-300 hover:text-gray-900 rounded-md">
          <button
            onClick={() => {
                LogOut();
            }}
          >
            Logout
          </button>
        </div>
        
      </div>
    </>
  );
};
export default Setting;
