import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/medical-logo.png";
const Navbar = () => {
  const navItems = <>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/about">About</NavLink></li>
  </>;
  return (
    <div className="navbar bg-base-100 lg:w-4/5 mx-auto p-4 rounded-lg ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <div className="flex  items-center gap-4">
            <div>
              <img className="w-12" src={logo} alt="" />
            </div>
            <h1 className="text-xl font-bold">
              Healths<span className="text-sky-500">Syncrony</span>
            </h1>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn bg-gradient-to-r from-[#214086] to-[#6b84bd] text-white">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
