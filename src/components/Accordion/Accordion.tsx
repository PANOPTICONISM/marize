import React, { useState } from "react";
import style from "./accordion.module.css";

export default function Accordion({
    fields,
}: {
    fields?: { question: string; answer: string };
}) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={style.accordion}>
            <div className={style.accordionItem}>
                <div
                    className={style.accordionTitle}
                    onClick={() => setIsActive(!isActive)}
                >
                    <div>{fields?.question}</div>
                    <div>{isActive ? "-" : "+"}</div>
                </div>
                {isActive && (
                    <div className={style.accordionContent}>
                        {fields?.answer}
                    </div>
                )}
            </div>
        </div>
    );
}
