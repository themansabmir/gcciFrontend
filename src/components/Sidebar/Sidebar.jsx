import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { otherRoutes, routes } from "./routes";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarLinks = ({ routes }) => {
  const [open, setOpen] = React.useState(-1);

  const handleOpen = (value) => {
    setOpen(open === value ? -1 : value);
  };

  const navigate = useNavigate();
  return (
    <>
      <List>
        {routes.map((item, mainIndex) => {
          const { path, name, icon, subMenu } = item;

          return (
            <Accordion
              open={open === mainIndex}
              icon={
                subMenu && (
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === mainIndex ? "rotate-180" : ""
                    }`}
                  />
                )
              }
            >
              <ListItem
                onClick={() => handleOpen(mainIndex)}
                selected={open === mainIndex}
                className='border-b-0 p-3'
              >
                <AccordionHeader
                  className='border-b-0 p-0'
                  onClick={() => {
                    path && navigate(path);
                  }}
                >
                  <Typography>{name} </Typography>
                </AccordionHeader>
              </ListItem>
              {subMenu &&
                subMenu.map((subItem, subIndex) => {
                  return (
                    <AccordionBody className='p-0'>
                      <ListItem
                        className=' '
                        onClick={() => subItem.path && navigate(subItem.path)}
                      >
                        <h1>{subItem.name}</h1>
                      </ListItem>
                    </AccordionBody>
                  );
                })}
            </Accordion>
          );
        })}
      </List>
    </>
  );
};

export function Sidebar() {
  return (
    <Card className='  min-h-screen bg-white w-full  max-w-[20rem]  shadow-xl shadow-blue-gray-900/5 border-0 rounded-none'>
      <div className='p-1'>
        <Typography
          variant='h5'
          color='blue-gray'
          className='text-center text-4xl'
        >
          GCCI
        </Typography>
      </div>
      <List className='m-0 p-0 '>
        <SidebarLinks routes={routes} />

        <div>
          <hr className='my-0 border border-blue-gray-500' />
          <SidebarLinks routes={otherRoutes} />
        </div>
      </List>
    </Card>
  );
}

export default Sidebar;
