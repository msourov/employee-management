import React from "react";
import { Card, Avatar, Text, Group, Badge, Button, Stack } from "@mantine/core";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import { Employee } from "../EmployeeContext";

interface EmployeeDetailsProps {
  onClose: () => void;
  employee?: Employee;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  onClose,
  employee,
}) => {
  if (!employee) return null;
  const CLOUDINARY_URL =
    "https://res.cloudinary.com/dgozusvua/image/upload/f_auto/q_auto/Brotecs/employees/";

  return (
    <Card padding="lg" radius="md">
      <Group>
        <Avatar
          src={`${CLOUDINARY_URL}${employee.id}` || employee.name.charAt(0)}
          size="lg"
          radius="xl"
          alt={employee.name}
        />
        <div>
          <Text fw={700} size="xl">
            {employee.name}
          </Text>
          <Badge color="teal" variant="light" mt={4}>
            Employee
          </Badge>
        </div>
      </Group>
      <Stack gap="md" mt="lg">
        <Group gap="xs">
          <IconMail size={18} className="text-pink-500" />
          <Text size="md">{employee.email}</Text>
        </Group>
        <Group gap="xs">
          <IconPhone size={18} className="text-green-500" />
          <Text size="md">{employee.phone}</Text>
        </Group>
        <Group gap="xs">
          <IconMapPin size={18} className="text-orange-500" />
          <Text size="md">{employee.address}</Text>
        </Group>
      </Stack>
      <Button fullWidth variant="filled" mt="xl" onClick={onClose}>
        Close
      </Button>
    </Card>
  );
};

export default EmployeeDetails;
