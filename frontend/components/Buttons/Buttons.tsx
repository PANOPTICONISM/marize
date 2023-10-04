import Link from "next/link";
import style from "./buttons.module.css";
import { BsHandbag } from "react-icons/bs";
import { Button } from "@mui/material";

export function PrimaryButton({
  path,
  text,
  className,
  locale,
}: {
  path: string;
  text?: string;
  className?: string;
  locale?: string;
}) {
  return (
    <Link href={path} locale={locale}>
      <a
        className={`${style.globalButton} ${style.primaryButton} ${className}`}
      >
        {text}
      </a>
    </Link>
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
  disabled,
}: {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={<BsHandbag />}
      disabled={disabled}
      fullWidth
      sx={{ padding: "14px" }}
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

export function SubmitButton({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) {
  return (
    <button type="submit" className={`${style.globalButton} ${className}`}>
      {text}
    </button>
  );
}

export function BackButton({
  className,
  onClick,
  text,
}: {
  className?: string;
  onClick?: () => void;
  text?: string;
}) {
  return (
    <button onClick={onClick} className={`${style.backButton} ${className}`}>
      {text}
    </button>
  );
}
