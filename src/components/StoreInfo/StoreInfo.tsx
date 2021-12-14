import style from "./storeinfo.module.css";
import { AiOutlineFacebook } from "react-icons/ai";
import { FiPhoneIncoming } from "react-icons/fi";
import { RiMailSendLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLockClock } from "react-icons/md";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
export default function StoreInfo({
    className,
    undoFlex,
    isFooter,
}: {
    className?: string;
    undoFlex?: string;
    isFooter?: boolean;
}) {
    return (
        <div className={`${style.contact_wrapper} ${className}`}>
            <div className={style.facebook}>
                {isFooter && <Logo />}
                <a
                    href="https://www.facebook.com/loja.marize"
                    target="_blank"
                    rel="noreferrer"
                >
                    <h4>
                        Connect with us on
                        <AiOutlineFacebook />
                    </h4>
                </a>
            </div>
            {isFooter && (
                <div className={style.about_footer}>
                    <h4>About Marizé</h4>
                    <ul>
                        <li>
                            <Link to="/terms-and-conditions">
                                Terms &amp; Conditions
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy">Privacy policy</Link>
                        </li>
                        <li>FAQ &amp; Returns</li>
                        <li>
                            <Link to="/about">Our story</Link>
                        </li>
                    </ul>
                </div>
            )}

            <div className={`${style.flex} ${undoFlex}`}>
                <div className={style.phone}>
                    <FiPhoneIncoming />
                    <div>
                        <h4>Phone-number</h4>
                        <p>+351 251 823 857</p>
                    </div>
                </div>
                <div className={style.mail}>
                    <RiMailSendLine />

                    <div>
                        <h4>E-mail</h4>
                        <p>
                            <a href="mailto: hello@marize.pt">
                                hello@marize.pt
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className={`${style.flex} ${undoFlex}`}>
                <div className={style.address}>
                    <a
                        href="https://www.google.fr/maps/place/Rua Mouzinho de Albuquerque 81, 
                            4930-733 Valença, Portugal"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IoLocationOutline />

                        <div>
                            <h4>Store's adress</h4>
                            <p>
                                Rua Mouzinho de Albuquerque 81, <br />
                                4930-733 Valença, Portugal
                            </p>
                        </div>
                    </a>
                </div>
                <div className={style.hours}>
                    <MdOutlineLockClock />
                    <div>
                        <h4>Opening hours</h4>
                        <p>
                            Mon - Sun, 10:00 - 13:00 <br />
                            to, 15:00 - 19:00
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
