import IsAuth from "../../features/auth/AuthCheck";
import SideBar from "./childComponents/sidebar";
import SideBarChat from "./childComponents/sidebarChat";
const MainPage = () => {
  return (
    <>
      <IsAuth />

      <div className="relative">
        <div className="flex rounded-lg">
        <SideBar />
        <SideBarChat/>
        <div id="Chat">

        </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
