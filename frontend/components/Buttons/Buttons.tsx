import Link from "next/link";
import style from "./buttons.module.css";
import { BsHandbag } from "react-icons/bs";

export default function Button({
  path,
  children,
  className,
  locale,
}: {
  path: string;
  children?: React.ReactNode;
  className?: string;
  locale?: string;
}) {
  return (
    <Link href={path} locale={locale}>
      <a className={className}>{children}</a>
    </Link>
  );
}

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
    <Button
      path={path}
      locale={locale}
      className={`${style.globalButton} ${style.primaryButton} ${className}`}
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
  className,
  onClick,
  text,
}: {
  className?: string;
  onClick?: () => void;
  text?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${style.globalButton} ${style.cartButton} ${className}`}
    >
      <BsHandbag />
      {text}
    </button>
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
