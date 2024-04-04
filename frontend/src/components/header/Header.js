import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';

export default function UserHeader() {
  const path = useLocation().pathname;
  const { theme } = useSelector(state => state.theme);

  return (
    <Navbar className="border-b-2 flex justify-between items-center py-4 px-6">
      <div className="flex items-center">
        <Link to="/" className="whitespace-nowrap text-lg font-semibold dark:text-white flex items-center">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-2">PawsPet</span>
          <span>Care</span>
        </Link>
        <form className="ml-4 hidden lg:block">
          <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="w-64" />
        </form>
        <Button className="w-12 h-10 ml-4 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </div>

      <div className="flex items-center">
        <Button className="w-12 h-10 hidden sm:inline mr-4" color="gray" onClick={() => console.log("Theme toggled")}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        <Dropdown arrowIcon={false} inline label={<Avatar alt='' rounded />} className="mr-4">
          <Link to="/dashboard">
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item>Sign Out</Dropdown.Item>
          <Dropdown.Divider />
          <Link to="/create-post">
            <Dropdown.Item>Create Post</Dropdown.Item>
          </Link>
        </Dropdown>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
      </div>

      <Navbar.Toggle />

      <Navbar.Collapse className="mt-4 lg:mt-0">
        <Navbar.Link active={path === '/'} as="div">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as="div">
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as="div">
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
