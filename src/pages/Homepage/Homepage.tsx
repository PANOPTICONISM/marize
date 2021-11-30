import React from "react";
import Main from "../../containers/Main/Main";
import Hero from "../../assets/hero-image.png";
import style from "./homepage.module.css";

export default function Homepage() {
    return (
        <Main>
            <header className={style.homepageHero}>
                <h1 className={style.heading}>
                    HANDPICKED APPAREL WITH <span>YOU</span> IN MIND
                </h1>
                <img src={Hero} alt="hero" />
            </header>
        </Main>
    );
}
