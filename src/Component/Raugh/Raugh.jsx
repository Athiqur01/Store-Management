import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    // Get operation to fetch user
    const { data: loggedUser } = useQuery({
        queryKey: ['loggedUser'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5012/user?email=${user?.email}`);
            return res.data;
        },
        enabled: !!(user?.email),
        retry: 2,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });

    // State for mobile dropdown menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Sub-menu state
    const [dropDownState, setDropDownState] = useState(false);

    // Ref to track the dropdown
    const dropdownRef = useRef(null);

    // Toggle mobile menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Toggle sub-menu
    const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
    const toggleDropDown = () => setDropDownState(!dropDownState);

    // Effect to handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropDownState(false);
            }
        };

        if (dropDownState) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropDownState]);

    const NavLinkcenter = (
        <>
            <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md '>Home</NavLink>
            <NavLink to='/requisition' className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md'>Requisition</NavLink>
            <NavLink to='/request' className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md'>Request</NavLink>
            <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md'>Search</NavLink>
        </>
    );

    return (
        <div>
            <div className="navbar bg-[#7B1FA2] ">

                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        {/* Mobile Hamburger Menu Button */}
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleMobileMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                    </div>
                    <Link to='/' className="btn btn-ghost px-4 py-2 text-xl font-semibold text-[#FFFFFF] hover:text-[#03A9F4] transition duration-300 ease-in-out rounded-md">BBM Inventory Management</Link>
                </div>

                {/* Navbar Center for Larger Screens */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {NavLinkcenter}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end">
                    {user ? (
                        <button onClick={toggleDropDown} className="rounded-full w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-base font-semibold text-[#FFFFFF] bg-[#03A9F4] text-center">user</button>
                    ) : (
                        <NavLink to='/login' className='px-4 py-2 text-base font-semibold text-[#FFFFFF] '>LogIn</NavLink>
                    )}

                    {/* Dropdown */}
                    <div ref={dropdownRef} className={`bg-[#7B1FA2] rounded-b-md z-10 absolute w-48 md:w-60 lg:w-64 mt-[248px] md:mt-[255px] lg:mt-[265px] duration-1000 delay-1000 ${dropDownState ? 'block' : 'hidden'}`}>
                        <ul className="p-4 font-bold text-white">
                            <button className="btn btn-ghost w-full text-left"><li>{loggedUser?.name || 'User Name'}</li></button>
                            <Link to='/dashboard'><button className="btn btn-ghost w-full text-left"><li>Dashboard</li></button></Link>
                            <button onClick={logOut} className="btn btn-ghost w-full text-left"><li>Log Out</li></button>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div onClick={toggleMobileMenu} className="lg:hidden bg-[#9C27B0] max-w-[150px] p-4 rounded-md">
                    <ul className="space-y-2">
                        <li><NavLink to='/' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Home</NavLink></li>
                        <li><NavLink to='/requisition' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Requisition</NavLink></li>
                        <li><NavLink to='/request' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Request</NavLink></li>
                        <li>
                            {/* Sub-menu Toggle */}
                            <button onClick={toggleSubMenu} className="block text-gray-800 p-2 rounded-md w-full text-left hover:bg-gray-200">
                                Search
                            </button>
                            {isSubMenuOpen && (
                                <ul className="pl-4 space-y-2 mt-2">
                                    <li><NavLink to='/search1' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Submenu 1</NavLink></li>
                                    <li><NavLink to='/search2' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Submenu 2</NavLink></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;