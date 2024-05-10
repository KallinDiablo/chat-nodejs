import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Constraints from "../../../constraints/constraints";
import { FaGear } from "react-icons/fa6";
import Setting from "./setting";
import { Image } from "antd";
import Search from "./search";
const SideBar = () => {
  const profile = useSelector((state: any) => state.profile);
  const [statusSetting, setStatusSetting] = useState(false);
  const constraints = new Constraints();
  const SettingOpen = () => {
    if (statusSetting) {
      return <Setting />;
    }
  };
  return (
    <>
      <aside
        id="separator-sidebar"
        className="top-0 left-0 z-20 w-14 transition-transform -translate-x-full sm:translate-x-0 rounded-l-lg"
        style={{
          height: "80vh",
        }}
        aria-label="Sidebar"
      >
        <div className="h-full px-2 py-2 overflow-y-auto bg-gray-200 opacity-75 rounded-l-lg">
          <div
            className="w-10 h-10 self-center rounded-full"
          >
            <Image className="rounded-full" width={40} src={`${constraints.api_server}/static${profile.avatar}`} preview={false}/>
          </div>
          <div className="fixed bottom-0 m-0.25 space-y-2 font-big rounded-full">
            <button
              className="focus:outline-none focus:ring focus:ring-gray-300 rounded-full"
              onFocusCapture={() => {
                setStatusSetting(true);
              }}
              onBlurCapture={() => {
                setTimeout(() => {
                  setStatusSetting(false);
                }, 100);
              }}
            >
              <FaGear className="size-8 text-gray-600" />
            </button>
          </div>
        </div>
            {SettingOpen()}

      </aside>
    </>
  );
};
export default SideBar;
