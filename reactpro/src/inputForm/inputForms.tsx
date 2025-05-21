import React from "react";
import { useForm } from "react-hook-form";
import styles from "./inputForm.module.scss";

type FormData = {
  name: string;
  lastName: string;
  email: string;
  address: string;
  age: number;
};

const NewUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(data);
    reset(); // Clear form after submit
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New User</h2>

      <label>Name</label>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span>{errors.name.message}</span>}

      <label>Last Name</label>
      <input {...register("lastName", { required: "Last name is required" })} />
      {errors.lastName && <span>{errors.lastName.message}</span>}

      <label>Email</label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email format",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <label>Address</label>
      <input {...register("address")} />

      <label>Age</label>
      <input
        type="number"
        {...register("age", {
          required: "Age is required",
          min: { value: 1, message: "Age must be at least 1 ნ " },
        })}
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewUserForm;
