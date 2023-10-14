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
  text?: string;
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
  className,
  locale,
}: {
  href: any;
  text?: string;
  className?: string;
  locale?: string;
}) {
  return (
    <li className={`${style.sectionButton} ${className}`}>
      <Link href={href} locale={locale}>
        {text}
      </Link>
    </li>
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
    <button
      onClick={onClick}
      className={`${style.globalButton} ${style.cartButton}`}
    >
      {text}
    </button>
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
