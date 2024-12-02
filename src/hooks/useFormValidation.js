import { useState } from "react";

export const useFormValidation = (initialState, validate)=> {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e, callback) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validationErrors[key] = validate(key, formData[key]);
    });
    setErrors(validationErrors);
    if (Object.values(validationErrors).every((err) => !err)) {
      callback();
    }
  };

  return { formData, errors, handleChange, handleSubmit };
}
