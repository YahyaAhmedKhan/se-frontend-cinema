import { faSignOutAlt, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform any logout logic here

    // Redirect to the login page
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between p-4 text-white bg-gray-800">
      <h1 className="text-2xl font-bold">Logo</h1>
      <Link to={"/admin/movieschedule"} className="items-center hidden lg:flex">
        <FontAwesomeIcon icon={faUserGear} className="text-2xl" />
        <span className="ml-2 text-xl">Admin Panel</span>
      </Link>
      <button className="flex items-center px-3 py-2 text-xl font-semibold text-black bg-white rounded-lg hover:bg-gray-300" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </button>
    </nav>
  );
};
