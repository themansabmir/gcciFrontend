import React, { useState } from "react";

export const sidebarData = [
  {
    title: "First Header",
    path: "/firstheader",
    subMenu: [
      {
        title: "FirstHeader first Child",
        path: "Childa1",
      },
      {
        title: "FirstHeader second Child",
        path: "Childa2",
      },
    ],
  },
  {
    title: "First Header",
    path: "/firstheader",
    subMenu: [
      {
        title: "FirstHeader first Child",
        path: "Childa1",
      },
      {
        title: "FirstHeader second Child",
        path: "Childa2",
      },
    ],
  },
];

export const SidebarComponent = () => {
  return (
    <div className='float-right'>
      <h1>Hello</h1>
      {sidebarData.map((navItem) => {
        return <SubMenu navItem={navItem} />;
      })}
    </div>
  );
};

export const SubMenu = ({ navItem }) => {
  const [subNav, setSubNav] = useState(false);
  const showSubnav = () => setSubNav(!subNav);

  return (
    <>
      <div onClick={navItem.subMenu && showSubnav}>
        <h1>{navItem.title}</h1>
      </div>
        {subNav &&
          navItem.subMenu.map((item) => {
            return <h1>{item.path}</h1>;
          })}
    </>
  );
};
