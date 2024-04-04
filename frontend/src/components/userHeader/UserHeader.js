import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/Theme/themeSlice';
import { Navbar, Dropdown, Avatar, Button, TextInput } from 'flowbite-react';

export default function UserHeader() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const isDarkMode = theme === 'dark';

  return (
    <Navbar fluid={true} className={`bg-white dark:bg-gray-900 px-2 sm:px-4 py-2.5 rounded border-b-2 border-gray-100 dark:border-gray-700`}>
      <Navbar.Brand href="/">
        <span className='text-xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
          PawsPet<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Care</span>
        </span>
      </Navbar.Brand>

      <div className="flex justify-center flex-1 lg:absolute lg:inset-0">
        <form className="w-full max-w-xl lg:relative lg:mx-auto">
          <TextInput
            type="search"
            placeholder="Search..."
            icon={AiOutlineSearch}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </form>
      </div>

      <div className="flex items-center gap-2 md:order-2">
        <Button className='w-12 h-10' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-300" />}
        </Button>

        <Dropdown arrowIcon={false} inline={true} label={<Avatar alt="User settings" rounded={true} />}>
          <Dropdown.Item tag={Link} to="/profile">
            Profile
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            Sign Out
          </Dropdown.Item>
          <Dropdown.Item tag={Link} to="/create-post">
            Create Post
          </Dropdown.Item>
        </Dropdown>

        <Link to="/sign-in">
          <Button gradientDuoTone='purpleToBlue'>
            Sign In
          </Button>
        </Link>

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          active={path === '/'}
          className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded lg:hidden"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/about"
          active={path === '/about'}
          className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded lg:hidden"
        >
          About
        </Navbar.Link>
        <Navbar.Link
          href="/projects"
          active={path === '/projects'}
          className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded lg:hidden"
        >
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
