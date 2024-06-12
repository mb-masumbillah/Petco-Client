import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import loading from "../assets/images/preloader.gif";

const DashBoard = () => {
  const [isAdmin, isloading] = useAdmin();

  if (isloading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <img src={loading} alt="" className="w-64" />
        </div>
      </>
    );
  }

  return (
    <div className="flex pb-5">
      <div className="w-64 min-h-screen">
        <ul className="py-4 pr-4 w-64 fixed hover:text-[#F04335] text-[#0A303A] font-extrabold text-lg  flex flex-col gap-2">
          {isAdmin ? (
            <>
              <>
                <li>
                  <NavLink
                    to="/dashboard/allUsers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    All users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allPets"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    All Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allDonation"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    All Donation
                  </NavLink>
                </li>
              </>
              <hr className="mt-5 mb-5 border-red-600" />
              <>
                <li>
                  <NavLink
                    to="/dashboard/addpet"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    Add a Pet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myaddedpets"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    My Added Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/createDonation"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    Create Donation Capmpaign
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myDonationCampign"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    My Donation Capmpaigns
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myDonation"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    My Donation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/adoptionRequest"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                        : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                    }
                  >
                    Adoption Request
                  </NavLink>
                </li>
              </>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/addpet"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                      : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                  }
                >
                  Add a Pet
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myaddedpets"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                      : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                  }
                >
                  My Added Pets
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/createDonation"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                      : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                  }
                >
                  Create Donation Capmpaign
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myDonationCampign"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                      : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                  }
                >
                  My Donation Capmpaigns
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myDonation"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                      : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                  }
                >
                  My Donation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/adoptionRequest"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#C2E7FF] font-extrabold text-lg px-4 block py-1 rounded-tr-full rounded-br-full text-[#F04335]"
                      : "py-1 px-4 text-[#0A303A] font-extrabold text-lg  block rounded-tr-full rounded-br-full"
                  }
                >
                  Adoption Request
                </NavLink>
              </li>
            </>
          )}

          <hr className="mt-5 mb-5 border-red-600" />
          <>
            <li>
              <NavLink
                to="/"
                className="px-4 block py-1 hover:bg-[#C2E7FF] font-extrabold text-lg rounded-tr-full rounded-br-full hover:text-[#F04335]"
              >
                Home
              </NavLink>
            </li>
          </>
        </ul>
      </div>
      <div className="flex-1 bg-blue-gray-50  px-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
