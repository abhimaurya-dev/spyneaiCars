"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const NavBar = ({ showProfile }) => {
  const { logout, user } = useContext(AuthContext);

  const router = useRouter();

  const handleManageMyCars = () => {
    router.push("/manage-my-cars");
  };
  const handleSpyneCars = () => {
    router.push("/");
  };

  return (
    <div className="navbar bg-base-100 mt-2">
      <div className="flex-1 gap-10 items-center">
        <a
          onClick={handleSpyneCars}
          className="btn btn-ghost font-bold text-3xl"
        >
          SpyneCars
        </a>
        {user && user.loggedIn && (
          <button
            onClick={handleManageMyCars}
            className="text-2xl font-semibold mt-1.5 hidden md:block"
          >
            Manage my Cars
          </button>
        )}
      </div>
      {/* Updated: Ensure this div is the flex container */}
      <div className="flex justify-end items-center">
        {user && user.loggedIn && (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
