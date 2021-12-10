import React from "react";
import { Link } from "react-router-dom";
import style from "./buttons.module.css";
import { BsHandbag } from "react-icons/bs";

export default function Button({
    path,
    children,
    className,
}: {
    path: string;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    );
}

export function PrimaryButton({ path, text }: { path: string; text?: string }) {
    return (
        <Button
            path={path}
            className={`${style.globalButton} ${style.primaryButton}`}
        >
            {text}
        </Button>
    );
}

export function ReturnButton({
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
            <BsHandbag />
            {text}
        </button>
    );
}

export function CartButton({
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
            <BsHandbag />
            {text}
        </button>
    );
}

export function SubmitButton({
    className,
    onClick,
    text,
}: {
    className?: string;
    onClick?: () => void;
    text?: string;
}) {
    return (
        <button type="submit" className={`${style.globalButton} ${className}`}>
            {text}
        </button>
    );
}
