import { FieldError } from "react-hook-form";

export interface Props {
  value: string;
  type: "text" | "password";
  onChange: (...event: any[]) => void;
  error?: FieldError;
}
