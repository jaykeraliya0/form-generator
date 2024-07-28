import {
  Form,
  FormField,
  FieldOptions,
  WithOptions,
  WithoutOptions,
} from "@/types/form";

const isFieldOptions = (obj: any): obj is FieldOptions => {
  return typeof obj.value === "string" && typeof obj.label === "string";
};

const isWithoutOptions = (obj: any): obj is WithoutOptions => {
  return (
    typeof obj.field_type === "string" &&
    [
      "text",
      "number",
      "email",
      "password",
      "date",
      "textarea",
      "file",
    ].includes(obj.field_type)
  );
};

const isWithOptions = (obj: any): obj is WithOptions => {
  return (
    typeof obj.field_type === "string" &&
    ["select", "radio", "checkbox"].includes(obj.field_type) &&
    Array.isArray(obj.field_options) &&
    obj.field_options.every(isFieldOptions)
  );
};

const isFormField = (obj: any): obj is FormField => {
  return (
    typeof obj.section === "number" &&
    typeof obj.section_name === "string" &&
    typeof obj.field_id === "string" &&
    typeof obj.field_label === "string" &&
    Array.isArray(obj.validations) &&
    obj.validations.every(
      (validation: any) => typeof validation === "string"
    ) &&
    typeof obj.info === "string" &&
    (isWithOptions(obj) || isWithoutOptions(obj))
  );
};

export const isForm = (obj: any): obj is Form => {
  return (
    typeof obj.form_header === "string" &&
    Array.isArray(obj.fields) &&
    obj.fields.every(isFormField)
  );
};

export const validateForm = (data: { [key: string]: any }, form: Form) => {
  const errors: { [key: string]: string } = {};
  if (!data) throw new Error("Please fill the form");

  form.fields.forEach((field) => {
    if (field.validations.includes("required") && !data[field.field_id]) {
      errors[field.field_id] = `${field.field_label} is required.`;
    }

    if (field.validations.includes("alphabets") && data[field.field_id]) {
      const value = data[field.field_id];
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        errors[
          field.field_id
        ] = `${field.field_label} should contain only alphabets.`;
      }
    }

    if (field.validations.includes("email") && data[field.field_id]) {
      const value = data[field.field_id];
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        errors[
          field.field_id
        ] = `${field.field_label} should be a valid email address.`;
      }
    }

    if (field.validations.includes("alphanumeric") && data[field.field_id]) {
      const value = data[field.field_id];
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        errors[
          field.field_id
        ] = `${field.field_label} should contain only alphanumeric characters.`;
      }
    }

    if (field.validations.includes("currency") && data[field.field_id]) {
      const value = data[field.field_id];
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        errors[
          field.field_id
        ] = `${field.field_label} should be a valid currency value.`;
      }
    }

    if (field.validations.includes("date") && data[field.field_id]) {
      const value = data[field.field_id];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        errors[
          field.field_id
        ] = `${field.field_label} should be a valid date in the format YYYY-MM-DD.`;
      }
    }

    if (field.validations.includes("numeric") && data[field.field_id]) {
      const value = data[field.field_id];
      if (!/^\d+$/.test(value)) {
        errors[
          field.field_id
        ] = `${field.field_label} should contain only numeric characters.`;
      }
    }

    if (field.validations.includes("positive_number") && data[field.field_id]) {
      const value = data[field.field_id];
      if (parseFloat(value) <= 0) {
        errors[
          field.field_id
        ] = `${field.field_label} should be a positive number.`;
      }
    }

    if (field.validations.includes("phone") && data[field.field_id]) {
      const value = data[field.field_id];
      if (!/^\d{10}$/.test(value)) {
        errors[
          field.field_id
        ] = `${field.field_label} should be a valid 10-digit phone number.`;
      }
    }

    field.validations.forEach((validation) => {
      if (validation.includes("min_value")) {
        const minValue = parseInt(validation.split("_")[2]);
        const value = data[field.field_id];
        if (isNaN(value) || parseFloat(value) < minValue) {
          errors[
            field.field_id
          ] = `${field.field_label} should be greater than or equal to ${minValue}.`;
        }
      }
      if (validation.includes("max_value")) {
        const maxValue = parseInt(validation.split("_")[2]);
        const value = data[field.field_id];
        if (isNaN(value) || parseFloat(value) > maxValue) {
          errors[
            field.field_id
          ] = `${field.field_label} should be less than or equal to ${maxValue}.`;
        }
      }
    });
  });

  return errors;
};
