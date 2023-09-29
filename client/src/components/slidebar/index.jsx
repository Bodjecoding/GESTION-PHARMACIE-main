import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUserAlt, faBars, faContactCard, faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(() => location.pathname.split("/")[2] || "");

    return (
        <div className="bg-green-500 text-white p-4 rounded-md">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">GestAddress</h1>
                <div className="flex space-x-4">
                    <MenuItem
                        link=""
                        title={"Dashboard"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                       <FontAwesomeIcon icon={faBars} className="mr-2 text-white-500" />
                    </MenuItem>
                    <MenuItem
                        link="Contacts"
                        title={"Contacts"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                       <FontAwesomeIcon icon={faContactCard} className="mr-2 text-white-500" />
                    </MenuItem>
                    
                    <MenuItem
                        link="Profile"
                        title={"Profile"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                        <FontAwesomeIcon icon={faUserAlt} className="mr-2 text-white-500" />

                    </MenuItem>
                    <MenuItem
                        link="Logout"
                        title={"Deconnexion"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                        <FontAwesomeIcon icon={faSignOut} className="mr-2 text-white-500" />

                    </MenuItem>
                </div>
            </div>
        </div>
    );
}

const MenuItem = ({ title, link, children, activeLink, setActiveLink }) => {
    const isActive = activeLink === link;

    return (
        <Link to={link} onClick={() => setActiveLink(link)}>
            <div
                className={`flex items-center space-x-2 py-2 px-2 hover:bg-white rounded-md hover:text-green-500 text-white cursor-pointer ${
                    isActive ? "bg-white rounded-md text-green-700" : ""
                }`}
            >
                <div className="w-6 h-6 rounded-full">{children}</div>
                <h1 className="text-md font-medium">{title}</h1>
            </div>
        </Link>
    );
};
