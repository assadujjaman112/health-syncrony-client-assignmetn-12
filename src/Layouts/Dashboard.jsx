import { NavLink, Outlet } from "react-router-dom";
import { FaList, FaUsers } from "react-icons/fa";
import { CgAdd, CgFileDocument, CgProfile } from "react-icons/cg";
import { FaFilePrescription } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaHome } from "react-icons/fa";

const Dashboard = () => {
  const isAdmin = true;
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
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/allUsers">
                    <FaUsers className="text-xl"></FaUsers> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addTest">
                    <CgAdd className="text-xl"></CgAdd> Add A Test
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allTests">
                    <CgFileDocument className="text-xl"></CgFileDocument> All Tests
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userProfile">
                    <CgProfile className="text-xl"></CgProfile> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/appointments">
                    <SlCalender className="text-xl"></SlCalender> My Upcoming
                    Appointments
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/results">
                    <FaFilePrescription className="text-xl"></FaFilePrescription>
                    Test Results
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider divider-neutral"></div>
            <li>
              <NavLink to="/">
                <FaHome className="text-xl"></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-4/5 ml-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
