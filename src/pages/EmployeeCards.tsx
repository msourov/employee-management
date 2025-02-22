import React, { useState } from "react";
import {
  Card,
  Text,
  Group,
  Avatar,
  Badge,
  Button,
  Grid,
  Container,
  Flex,
  Modal,
} from "@mantine/core";
import { Employee, useEmployeeContext } from "../EmployeeContext";
import { IconPhone, IconMail, IconMapPin } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import EmployeeDetails from "../components/EmployeeDetails";

const EmployeeCards: React.FC = () => {
  const { employees } = useEmployeeContext();
  const [opened, { open, close }] = useDisclosure();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const CLOUDINARY_URL =
    "https://res.cloudinary.com/dgozusvua/image/upload/f_auto/q_auto/Brotecs/employees/";

  return (
    <Container size="xl" py="xl">
      <Grid gutter="xl">
        {employees.map((employee) => (
          <Grid.Col key={employee.id} span={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              shadow="md"
              padding="lg"
              radius="lg"
              withBorder
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              style={{ minHeight: 300 }}
            >
              <Flex
                direction="column"
                justify="space-between"
                h="100%"
                className="flex-grow"
              >
                <div>
                  <Group mb="sm">
                    <Avatar
                      src={
                        `${CLOUDINARY_URL}${employee.id}` ||
                        employee.name.charAt(0)
                      }
                      size="lg"
                      radius="xl"
                      alt={employee.name}
                    />
                    <div>
                      <Text fw={600} size="lg" className="text-gray-800">
                        {employee.name}
                      </Text>
                      <Badge
                        color="teal"
                        variant="light"
                        size="sm"
                        radius="sm"
                        className="mt-1"
                      >
                        Employee
                      </Badge>
                    </div>
                  </Group>

                  <div className="space-y-3">
                    <Group gap="xs">
                      <IconMail size={18} className="text-pink-500" />
                      <Text size="sm" className="text-gray-600 truncate">
                        {employee.email}
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <IconPhone size={18} className="text-green-500" />
                      <Text size="sm" className="text-gray-600">
                        {employee.phone}
                      </Text>
                    </Group>

                    <Group gap="xs" align="flex-start">
                      <IconMapPin size={18} className="text-orange-500" />
                      <Text size="sm" className="text-gray-600 line-clamp-2">
                        {employee.address}
                      </Text>
                    </Group>
                  </div>
                </div>
                <Button
                  fullWidth
                  variant="filled"
                  className="mt-4"
                  radius="md"
                  size="sm"
                  onClick={() => {
                    open();
                    setSelectedEmployee(employee);
                  }}
                >
                  View Profile
                </Button>
              </Flex>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="lg"
        withCloseButton={false}
      >
        <EmployeeDetails
          onClose={close}
          employee={selectedEmployee || undefined}
        />
      </Modal>
    </Container>
  );
};

export default EmployeeCards;
