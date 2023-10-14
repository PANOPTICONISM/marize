import Link from "next/link";
import style from "./buttons.module.css";
import { BsHandbag } from "react-icons/bs";
import { Button } from "@mui/material";

export function PrimaryButton({
  path,
  text,
  locale,
  fullWidth = false,
}: {
  path: string;
  text: string;
  className?: string;
  locale?: string;
  fullWidth?: boolean;
}) {
  return (
    <Button
      variant="contained"
      href={`${locale ? locale + "/" : ""}${path}`}
      fullWidth={fullWidth}
      sx={{ padding: "12px" }}
    >
      {text}
    </Button>
  );
}

export function SectionButton({
  href,
  text,
  locale,
}: {
  href: any;
  text: string;
  locale?: string;
}) {
  return (
    <Button
      variant="contained"
      href={`${locale ? locale + "/" : ""}${href}`}
      sx={{ padding: "12px 16px", marginTop: "18px" }}
    >
      {text}
    </Button>
  );
}

export function PrimaryIconButton({
  onClick,
  text,
  disabled = false,
}: {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      startIcon={<BsHandbag />}
      fullWidth
      sx={{ padding: "12px" }}
    >
      {text}
    </Button>
  );
}

export function ContinueButton({
  onClick,
  text,
}: {
  onClick?: () => void;
  text?: string;
}) {
  return (
    <Button
      variant="contained"
      sx={{ padding: "12px" }}
      onClick={onClick}
      fullWidth
    >
      {text}
    </Button>
  );
}

export function BackButton({
  onClick,
  text,
}: {
  onClick?: () => void;
  text?: string;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      fullWidth
      sx={{ padding: "12px" }}
    >
      {text}
    </Button>
  );
}
