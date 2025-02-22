import { AppShell, NavLink, ScrollArea } from "@mantine/core";
import { IconList, IconTable, IconUser } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const AppNavbar = ({ close }: { close: () => void }) => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Table View", icon: <IconTable size={20} /> },
    { to: "/card", label: "Card View", icon: <IconList size={20} /> },
    {
      to: "/employees",
      label: "Manage Employees",
      icon: <IconUser size={20} />,
    },
  ];

  return (
    <AppShell.Navbar
      p="md"
      mt={2}
      style={{
        backgroundColor: "#1A202C",
        color: "#fff",
        width: "250px",
        borderRadius: "8px",
      }}
    >
      <AppShell.Section
        grow
        component={ScrollArea}
        style={{
          paddingTop: "20px",
        }}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            component={Link}
            to={link.to}
            label={link.label}
            leftSection={link.icon}
            active={location.pathname === link.to}
            onClick={close}
            variant="filled"
            className="rounded-md mb-2 text-white"
            style={{
              backgroundColor:
                location.pathname === link.to ? "#4c9f70" : "transparent",
              color: location.pathname === link.to ? "#fff" : "#bbb",
              padding: "12px 16px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#3a6d46";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";
            }}
          />
        ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AppNavbar;
