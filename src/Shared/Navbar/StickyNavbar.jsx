import { FaBarsStaggered } from "react-icons/fa6";
import { GiTireIronCross } from "react-icons/gi";
import { IoPersonAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import auth from "../../Firebase/firebase.config";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import navImg from "../../assets/images/nav.png";
import logo from "../../assets/images/logo.png";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import useAdmin from "../../Hook/useAdmin";

const StickyNavbar = () => {
  const { user, logOut } = useAuth(auth);

  const [isAdmin] = useAdmin();

  const handlerLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navlinks = (
    <div className="flex lg:gap-6 gap-2 items-center lg:flex-row flex-col">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-[#F04335] lg:border-b-2 underline-offset-2 border-[#F04335] text-xl font-extrabold"
            : "font-extrabold text-xl text-white lg:text-[#0A303A]"
        }
      >
        HOME
      </NavLink>
      <NavLink
        to="/petListing"
        className={({ isActive }) =>
          isActive
            ? "text-[#F04335] lg:border-b-2 underline-offset-2 border-[#F04335] text-xl font-extrabold uppercase"
            : "font-extrabold text-xl uppercase text-white lg:text-[#0A303A]"
        }
      >
        Pet Listing
      </NavLink>
      <NavLink
        to="donationCampaign"
        className={({ isActive }) =>
          isActive
            ? "text-[#F04335] lg:border-b-2 underline-offset-2 border-[#F04335] text-xl font-extrabold"
            : "font-extrabold text-xl text-white lg:text-[#0A303A]"
        }
      >
        Donation Campaigns
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-[#F04335] lg:border-b-2 underline-offset-2 border-[#F04335] text-xl font-extrabold"
            : "font-extrabold text-xl text-white lg:text-[#0A303A]"
        }
      >
        Contact Us
      </NavLink>
    </div>
  );

  const handleNavbarClick = () => {
    document.getElementById("sidebar").classList.add("left-0");
    document.getElementById("sidebar").classList.remove("-left-[850px]");
  };
  const handleCancle = () => {
    document.getElementById("sidebar").classList.add("-left-[850px]");
    document.getElementById("sidebar").classList.remove("left-0");
  };
  return (
    <>
      <nav className="fixed lg:w-[1140px] w-full top-0 z-50 shadow-2xl">
        <div className="flex flex-wrap lg:w-[1140px] w-full items-center bg-white justify-between lg:h-[80px] h-[50px] px-3">
          {/* responsive */}
          <div onClick={handleNavbarClick} className="lg:hidden block">
            <FaBarsStaggered className="text-xl active:scale-90 duration-200" />
          </div>
          <ul
            id="sidebar"
            className="lg:hidden z-50 top-[50px] absolute duration-700  w-2/3 bg-[#151515f4] px-4 py-3 -left-[850px]"
          >
            <span className="flex justify-end">
              <GiTireIronCross
                onClick={handleCancle}
                className="text-xl active:scale-90 duration-200"
              />
            </span>
            {navlinks}
          </ul>

          {/* logo */}
          <div>
            <img src={logo} alt="" />
          </div>

          {/* middle */}
          <div className="lg:block hidden">
            <ul>{navlinks}</ul>
          </div>

          {/* authentication */}
          {/* responsive */}
          <div>
            {/* large device */}
            {user ? (
              <Menu>
                <MenuHandler>
                  <div className="w-10 h-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user ? user?.photoURL : ""} className="w-full h-full rounded-full"
                    />
                  </div>
                </MenuHandler>
                <MenuList className=" bg-[#292929] w-72 left-[1040px] top-[93px] text-center text-white space-y-2 text-base ">
                  <MenuItem>
                    <div className="w-20 h-20 mx-auto">
                      <img
                        alt=""
                        className="rounded-full w-full h-full"
                        src={user ? user?.photoURL : ""}
                      />
                    </div>
                  </MenuItem>
                  <MenuItem>{user?.displayName}</MenuItem>
                  <MenuItem> {user?.email}</MenuItem>
                  <MenuItem className="py-2">
                    <hr className="rounded-none" />
                  </MenuItem>
                  <MenuItem>
                    {isAdmin ? (
                      <NavLink
                        to="/dashboard/allUsers"
                        className="font-extrabold text-xl bg-[#F04335]  px-3 rounded-lg active:scale-90 flex justify-center items-center duration-150 py-1"
                      >
                        <MdDashboard /> <span>Dashboard</span>
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/dashboard/addpet"
                        className="font-extrabold text-xl bg-[#F04335]  px-3 rounded-lg active:scale-90 flex justify-center items-center duration-150 py-1"
                      >
                        <MdDashboard /> <span>Dashboard</span>
                      </NavLink>
                    )}
                  </MenuItem>

                  <MenuItem>
                    {user && (
                      <NavLink
                        onClick={handlerLogout}
                        className="font-extrabold text-xl bg-[#F04335] py-1 px-3 rounded-lg
                      active:scale-90 duration-150 flex justify-center items-center"
                      >
                        <CiLogout /> <span>Logout</span>
                      </NavLink>
                    )}
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <div className="lg:hidden">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "px-3 py-2 rounded-md font-bold bg-transparent hover:bg-[#F04335] hover:text-white text-[#F04335] border-none flex justify-center items-center"
                        : "px-3 py-2 rounded-md font-bold bg-transparent hover:bg-[#F04335] hover:text-white text-[#F04335] border-none flex justify-center items-center"
                    }
                  >
                    <IoPersonAddOutline /> <span>Sign In</span>
                  </NavLink>
                </div>

                <div className="hidden lg:flex justify-center items-center">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "px-3 py-2 rounded-md font-bold bg-transparent hover:bg-[#F04335] hover:text-white text-[#F04335] border-none flex justify-center items-center"
                        : "px-3 py-2 rounded-md font-bold bg-transparent hover:bg-[#F04335] hover:text-white text-[#F04335] border-none flex justify-center items-center"
                    }
                  >
                    <IoPersonAddOutline /> <span>Sign In</span>
                  </NavLink>
                  <span className="font-bold text-xl text-[#F04335]">|</span>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "px-3 py-2 rounded-md font-bold bg-transparent hover:bg-[#F04335] hover:text-white text-[#F04335] border-none"
                        : "px-3 py-2 rounded-md font-bold bg-transparent hover:bg-[#F04335] hover:text-white text-[#F04335] border-none"
                    }
                  >
                    Sign Up
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
        <img
          src={navImg}
          alt=""
          className="absolute top-[3.5rem] -z-10 lg:block hidden w-full"
        />
      </nav>
    </>
  );
};

export default StickyNavbar;
