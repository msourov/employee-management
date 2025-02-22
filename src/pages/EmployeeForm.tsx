import React, { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  FileInput,
  Avatar,
  Group,
  Select,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Employee,
  employeeSchema,
  useEmployeeContext,
} from "../EmployeeContext";
import axios from "axios";

type EmployeeFormValues = Employee;

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dgozusvua/image/upload";
const CLOUDINARY_FOLDER = "Brotecs/employees";

const EmployeeForm: React.FC<{
  opened: boolean;
  onClose: () => void;
  editId: number | null;
}> = ({ opened, onClose, editId }) => {
  const { employees, addEmployee, editEmployee } = useEmployeeContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      avatar: "",
      department: "",
    },
  });

  useEffect(() => {
    if (editId !== null) {
      const emp = employees.find((e) => e.id === editId);
      if (emp) {
        setValue("name", emp.name);
        setValue("phone", emp.phone);
        setValue("email", emp.email);
        setValue("address", emp.address);
        setValue("avatar", emp.avatar || "");
        setValue("department", emp.department);
        setPreview(emp.avatar || null);
      }
    } else {
      reset();
      setPreview(null);
      setSelectedFile(null);
    }
  }, [editId, employees, setValue, reset]);

  const getNextEmployeeId = () => {
    return employees.length > 0
      ? Math.max(...employees.map((e) => e.id ?? 0)) + 1
      : 1;
  };

  console.log(errors);

  const uploadImage = async (file: File, employeeId: number) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "employee_avatar");
    formData.append("public_id", `${CLOUDINARY_FOLDER}/${employeeId}`);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EmployeeFormValues) => {
    let avatarUrl = data.avatar;
    const newEmployeeId = editId !== null ? editId : getNextEmployeeId();

    if (selectedFile) {
      const uploadedUrl = await uploadImage(selectedFile, newEmployeeId);
      if (uploadedUrl) {
        avatarUrl = uploadedUrl;
      }
    }

    if (editId === null) {
      addEmployee({ ...data, id: newEmployeeId, avatar: avatarUrl });
    } else {
      editEmployee({ ...data, id: editId, avatar: avatarUrl });
    }

    onClose();
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title={editId ? "Edit Employee" : "Add Employee"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group justify="center" mb="sm">
          <Avatar src={preview} size="xl" radius="xl" alt="Profile Preview" />
        </Group>

        <FileInput
          label="Upload Profile Picture"
          accept="image/*"
          onChange={(file) => {
            setSelectedFile(file);
            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        <TextInput
          label="Name"
          {...register("name")}
          error={errors.name?.message}
          required
        />
        <TextInput
          label="Phone"
          {...register("phone")}
          error={errors.phone?.message}
          required
        />
        <TextInput
          label="Email"
          {...register("email")}
          error={errors.email?.message}
          required
        />
        <Select
          label="Department"
          placeholder="Select department"
          data={[
            "Engineering",
            "Marketing",
            "Sales",
            "Finance",
            "Operations",
            "IT",
            "Human Resources",
            "Legal",
            "Customer Support",
            "Administration",
          ]}
          value={getValues("department") || null}
          onChange={(value) =>
            setValue("department", value || "", { shouldValidate: true })
          }
          error={errors.department?.message}
          required
          allowDeselect={false}
        />
        <TextInput
          label="Address"
          {...register("address")}
          error={errors.address?.message}
          required
        />

        <Button type="submit" mt="md" disabled={loading} loading={loading}>
          {editId ? "Save Changes" : "Add Employee"}
        </Button>
      </form>
    </Modal>
  );
};

export default EmployeeForm;
