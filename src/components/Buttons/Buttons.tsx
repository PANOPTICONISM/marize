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

export function CartButton({ onClick }: { onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`${style.globalButton} ${style.cartButton}`}
        >
            <BsHandbag />
            Add to shopping bag
        </button>
    );
}
