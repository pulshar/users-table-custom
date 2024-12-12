import { toast } from "@/hooks/use-toast";
import { capitalize, dateFormatter, validateInput } from "../../helpers";
import { useFormValidation } from "../../hooks/useFormValidation";
import useUsersStore from "../../store/store";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const initialUserData = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  company: "",
  address: "",
  birthday: "",
};

export default function UserForm({ onClose }) {
  const usernameExists = useUsersStore((state) => state.usernameExists);
  const addUser = useUsersStore((state) => state.addUser);
  const formFields = Object.keys(initialUserData);

  const validateUsername = (username) => {
    if (usernameExists(username))
      return `Username '${username}' already exists`;
  };

  const validate = (field, value) => {
    if (field === "username" && value) return validateUsername(value);
    const error = validateInput(field, value);
    if (error) {
      return error;
    }
  };
  const { formData, errors, handleChange, handleSubmit } = useFormValidation(
    initialUserData,
    validate,
  );
  const onSubmit = () => {
    let newUser = {};
    if (formData.birthday) {
      const birthday = dateFormatter(formData.birthday);
      newUser = { ...formData, birthday };
    } else {
      newUser = formData;
    }

    addUser(newUser);
    onClose();
    toast({
      variant: "success",
      title: "New user",
      description: `The user ${capitalize(
        newUser.name,
      )} was added successfully.`,
    });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <div className="mt-6 space-y-5">
        <div className="flex flex-wrap items-start gap-5">
          {formFields.map((input) => (
            <div key={input} className="grid min-w-[260px] flex-1 gap-[3px]">
              <label htmlFor={input} className="text-sm font-semibold">
                {capitalize(input)}
              </label>
              <Input
                onBlur={handleChange}
                onChange={handleChange}
                onBlur={handleChange}
                onChange={handleChange}
                type={input === "birthday" ? "date" : "text"}
                id={input}
                name={input}
                placeholder={capitalize(input)}
                placeholder={capitalize(input)}
                className={`${input === "birthday" ? "block" : ""} ${errors[input] ? "border-red-500" : ""} `}
              />
              {errors[input] && (
                <p className="ml-1 text-xs font-semibold text-red-500">
                  {capitalize(errors[input])}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-col justify-end gap-4 sm:flex-row">
        <Button
          className="w-full sm:w-auto"
          variant="muted"
          onClick={onClose}
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Add user
        </Button>
      </div>
    </form>
  );
}
