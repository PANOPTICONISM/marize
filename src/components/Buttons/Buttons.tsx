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

export function PrimaryButton({
    path,
    text,
    className,
}: {
    path: string;
    text?: string;
    className?: string;
}) {
    return (
        <Button
            path={path}
            className={`${style.globalButton} ${style.primaryButton} ${className}`}
        >
            {text}
        </Button>
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
        <button
            onClick={onClick}
            className={`${style.backButton} ${className}`}
        >
            {text}
        </button>
    );
}
