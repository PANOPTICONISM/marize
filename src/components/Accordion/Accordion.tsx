import React, { useState } from "react";
import style from "./accordion.module.css";

export default function Accordion() {
    const accordionData = {
        title: "Section 1",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`,
    };

    const [isActive, setIsActive] = useState(false);

    const { title, content } = accordionData;
    return (
        <div className={style.accordion}>
            <h1>FAQ</h1>
            <div className={style.accordionItem}>
                <div
                    className={style.accordionTitle}
                    onClick={() => setIsActive(!isActive)}
                >
                    <div>{title}</div>
                    <div>{isActive ? "-" : "+"}</div>
                </div>
                {isActive && (
                    <div className={style.accordionContent}>{content}</div>
                )}
            </div>
        </div>
    );
}
