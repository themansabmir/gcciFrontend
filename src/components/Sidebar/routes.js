export const routes = [
  {
    name: "Dashboard",
    icon: "",
    path: "/",
  },
  {
    name: "Masters",
    icon: "",
    path: "",
    subMenu: [
      {
        name: "Customers",
        icon: "",
        path: "/masters/customers",
      },
      {
        name: "Shipping Lines",
        icon: "",
        path: "/masters/shippinglines",
      },
      {
        name: "CHA",
        icon: "",
        path: "/masters/cha",
      },
    ],
  },
  {
    name: "Shipments",
    icon: "",
    path: "",
    subMenu: [
      {
        name: "View Shipments",
        icon: "",
        path: "/shipments",
      },
      {
        name: "Add Shipment",
        icon: "",
        path: "/shipments/newShipment",
      },
    ],
  },
  {
    name: "Insights",
    icon: "",
    path: "/insight",
  },
  {
    name: "Sales",
    icon: "",
    path: "",
    subMenu: [
      {
        name: "View Sales",
        icon: "",
        path: "/sales/viewSales",
      },
      {
        name: "Add Sales",
        icon: "",
        path: "/sales/addsales",
      },
    ],
  },
  {
    name: "Pricing",
    icon: "",
    path: "",
    subMenu: [
      {
        name: "View Pricing",
        icon: "",
        path: "/pricing/viewpricing",
      },
      {
        name: "Add Pricing",
        icon: "",
        path: "/pricing/addpricing",
      },
    ],
  },
];

export const otherRoutes = [
  {
    name: "Employees",
    icon: "",
    path: "",
    subMenu: [
      {
        name: "View Employees",
        icon: "",
        path: "/employees/viewEmp",
      },
      {
        name: "Add Employee",
        icon: "",
        path: "/employees/addEmp",
      },
    ],
  },
  {
    name: "Settings",
    icon: "",
    path: "",
    subMenu: [
      {
        name: "Roles",
        icon: "",
        path: "/settings/roles",
      },
      {
        name: "Ports",
        icon: "",
        path: "/settings/ports",
      },
      {
        name: "Currencies",
        icon: "",
        path: "/settings/currency",
      },
      {
        name: "Customer Types",
        icon: "",
        path:"/customerType"
      }
    ],
  },
  {
    name: "Logout",
    icon: "",
    path: "",
  },
];
