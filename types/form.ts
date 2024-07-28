type fieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "textarea"
  | "file";

type validators<T extends string | number> =
  | "required"
  | "alphabets"
  | "email"
  | "positive_number"
  | "currency"
  | "alphanumeric"
  | "date"
  | "numeric"
  | "phone"
  | `min_value_${T}`
  | `max_value_${T}`;

export interface FieldOptions {
  value: string;
  label: string;
}

export type WithoutOptions = {
  field_type: fieldType;
};

export type WithOptions = {
  field_type: "select" | "radio" | "checkbox";
  field_options: FieldOptions[];
};

export type FormField = {
  section: number;
  section_name: string;
  field_id: string;
  field_label: string;
  validations: validators<string>[];
  info: string;
} & (WithOptions | WithoutOptions);

export type Form = {
  form_header: string;
  fields: FormField[];
};
