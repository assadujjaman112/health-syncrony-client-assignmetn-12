import { NavLink, Outlet } from "react-router-dom";
import { FaList } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex md:w-4/5 mx-auto">
      <div className="drawer w-1 lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  flex flex-col items-center justify-start mt-5">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn bg-transparent drawer-button lg:hidden"
          >
            <FaList></FaList>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-60 min-h-full bg-blue-500 text-white">
            {/* Sidebar content here */}
            <li>
              <NavLink to="/dashboard/userProfile">My Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
