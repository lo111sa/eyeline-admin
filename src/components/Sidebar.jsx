import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "../stores/authStore";

const Sidebar = () => {
  const { logout } = useAuthStore((state) => state, shallow);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const Menus = [
    { title: "ინფორმაცია", src: "chart_fill", link: "/info" },
    { title: "ჩვენს შესახებ", src: "chat", link: "/about" },
    { title: "სერვისები", src: "user", gap: false, link: "/services" },
    { title: "აქციები ", src: "calendar", link: "/offers" },
    { title: "ექიმები", src: "search", link: "/doctors" },
    { title: "ჯავშნები", src: "chart", link: "/reserve" },
    { title: "ბლოგი ", src: "folder", gap: false, link: "/blog" },
  ];
  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src="icons/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
       border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="/logo.webp"
          width={70}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Eyeline
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <Link to={Menu?.link} key={index}>
            {" "}
            <li
              onClick={() => setActive(index)}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
      ${Menu.gap ? "mt-9" : "mt-2"} ${index === active && "bg-light-white"} `}
            >
              <img src={`/icons/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          </Link>
        ))}
        <li
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <img src={`/icons/setting.png`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            გასვლა
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
