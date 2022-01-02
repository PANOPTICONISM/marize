import style from "./footer.module.css";
import React from "react";
import StoreInfo from "../StoreInfo/StoreInfo";

function Footer() {
    return (
        <footer>
            <StoreInfo className={style.footer} isFooter />
        </footer>
    );
}

export default Footer;
