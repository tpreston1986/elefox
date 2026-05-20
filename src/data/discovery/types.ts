export type Choice = {
  value: string;
  label: string;
};

export type BaseField = {
  name: string;
  label: string;
  helpText?: string;
  required?: boolean;
  placeholder?: string;
};

export type ShortTextField = BaseField & { type: "shortText" };
export type LongTextField = BaseField & { type: "longText"; rows?: number };
export type EmailField = BaseField & { type: "email" };
export type PhoneField = BaseField & { type: "phone" };
export type NumberField = BaseField & {
  type: "number";
  min?: number;
  max?: number;
  suffix?: string;
};
export type SingleChoiceField = BaseField & {
  type: "singleChoice";
  choices: Choice[];
  layout?: "pills" | "radio";
};
export type MultiChoiceField = BaseField & {
  type: "multiChoice";
  choices: Choice[];
  layout?: "pills" | "checkbox";
};
export type YesNoField = BaseField & { type: "yesNo" };

export type Field =
  | ShortTextField
  | LongTextField
  | EmailField
  | PhoneField
  | NumberField
  | SingleChoiceField
  | MultiChoiceField
  | YesNoField;

export type Section = {
  title: string;
  description?: string;
  fields: Field[];
};

export type FormDefinition = {
  slug: string;
  title: string;
  subtitle: string;
  intro?: string;
  recipientName: string;
  sections: Section[];
  submitLabel?: string;
};
