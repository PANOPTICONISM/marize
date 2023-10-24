import { Button } from "@mui/material";
import Link from "next/link";

export function PrimaryButton({
  onClick,
  text,
  disabled = false,
  icon,
}: {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      startIcon={icon}
      fullWidth
      sx={{ padding: "12px" }}
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
        sx={{ padding: "12px" }}
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
  href: URL;
  text: string;
  locale?: string;
}) {
  return (
    <Link href={href} locale={locale}>
      <Button
        variant="contained"
        sx={{ padding: "12px 16px", marginTop: "18px" }}
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
      sx={{ padding: "12px" }}
    >
      {text}
    </Button>
  );
}
