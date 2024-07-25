export interface Field {
  type: "text" | "email" | "number" | "date" | "checkbox";
  label: string;
  value: string | number | boolean;
  required?: boolean;
  options?: any;
}

export interface Section {
  name: string;
  fields: Field[];
}

export type FieldErrors = {
  fields: { [key: number]: string }[];
};
