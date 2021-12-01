import React from "react";
import { Link } from "react-router-dom";
import style from "./button.module.css";

export default function PrimaryButton({
    path,
    children,
}: {
    path: string;
    children?: React.ReactNode;
}) {
    return (
        <Link to={path} className={style.primaryButton}>
            {children}
        </Link>
    );
}
