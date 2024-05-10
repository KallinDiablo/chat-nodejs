import Search from "./search";
const SideBarChat = () =>{
    return<>
    <aside
        id="separator-sidebar"
        className="top-0 left-0 z-10 w-64 transition-transform -translate-x-full sm:translate-x-0"
        style={{
          height: "80vh",
        }}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 opacity-75">
          <div className="h-full overflow-x-auto">
            <ul className="space-y-2 font-medium">
              
            </ul>
          </div>
          </div>
          
      </aside>
    </>
}
export default SideBarChat