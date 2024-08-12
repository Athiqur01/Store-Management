import { NavLink } from "react-router-dom";


const Navbar = () => {

    const NavLinkcenter=<>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Home</NavLink>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Add Items</NavLink>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Requisition</NavLink>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Requisition Request</NavLink>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>SRB</NavLink>    
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Ledger</NavLink>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>SIB</NavLink>
                  </>

    return (
        <div className=''>
            <div className="navbar bg-[#7B1FA2]">

            {/* navbar-start */}

  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost px-4 py-2 text-xl font-semibold text-[#FFFFFF]">BBM Store Management</a>
  </div>
  {/* Navbar center-------- */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      
      {NavLinkcenter}
    </ul>
  </div>

  {/* Navber End------------ */}

  <div className="navbar-end">
  <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>LogIn</NavLink>
  <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Register</NavLink>
  </div>
</div>
            
        </div>
    );
};

export default Navbar;