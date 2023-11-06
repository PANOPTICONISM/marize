import { Button } from "@mui/material";
import Link from "next/link";
import { UrlObject } from "url";

export function PrimaryButton({
  onClick,
  text,
  disabled = false,
  icon,
  type,
}: {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <Button
      type={type}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      startIcon={icon}
      fullWidth
      sx={{ padding: "12px", borderRadius: "0" }}
    >
      {text}
    </Button>
  );
}

export function PrimaryButtonAsLink({
  path,
  text,
  locale,
  fullWidth = false,
  icon,
}: {
  path: string;
  text: string;
  className?: string;
  locale?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link href={path} locale={locale}>
      <Button
        variant="contained"
        fullWidth={fullWidth}
        sx={{ padding: "12px", borderRadius: "0" }}
        startIcon={icon}
      >
        {text}
      </Button>
    </Link>
  );
}

export function SectionButton({
  href,
  text,
  locale,
}: {
  href: UrlObject;
  text: string;
  locale?: string;
}) {
  return (
    <Link href={href} locale={locale}>
      <Button
        variant="contained"
        sx={{ padding: "12px 16px", marginTop: "18px", borderRadius: "0" }}
      >
        {text}
      </Button>
    </Link>
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
      sx={{ padding: "12px", borderRadius: "0" }}
    >
      {text}
    </Button>
  );
}
