// AppNavbar.tsx
import { AppShell, NavLink, ScrollArea } from "@mantine/core";
import { IconList, IconTable, IconUser } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const AppNavbar = ({ close }: { close: () => void }) => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Table View", icon: <IconTable size={18} /> },
    { to: "/card", label: "Card View", icon: <IconList size={18} /> },
    {
      to: "/employees",
      label: "Manage Employees",
      icon: <IconUser size={18} />,
    },
  ];

  return (
    <AppShell.Navbar p="md" mt={2}>
      <AppShell.Section grow component={ScrollArea}>
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
            className="rounded-md mb-1"
          />
        ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AppNavbar;
