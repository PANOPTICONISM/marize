import style from "./storeinfo.module.css";
import { AiOutlineFacebook } from "react-icons/ai";
import { FiPhoneIncoming } from "react-icons/fi";
import { RiMailSendLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLockClock } from "react-icons/md";
export default function StoreInfo() {
    return (
        <div className={style.contact_info}>
            <div className={style.contact_wrapper}>
                <div className={style.facebook}>
                    <h4>
                        Connect with us on
                        <a
                            href="https://www.facebook.com/loja.marize"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <AiOutlineFacebook />
                        </a>
                    </h4>
                </div>
                <div className={style.phone}>
                    <h4>
                        <FiPhoneIncoming /> Phone-number
                    </h4>
                    <p>+351 251 823 857</p>
                </div>
                <div className={style.mail}>
                    <h4>
                        <RiMailSendLine /> E-mail
                    </h4>
                    <p>
                        <a href="mailto: hello@marize.pt">hello@marize.pt</a>
                    </p>
                </div>
                <div className={style.adress}>
                    <h4>
                        <a
                            href="https://www.google.fr/maps/place/Rua Mouzinho de Albuquerque 81, 
                            4930-733 Valença, Portugal"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <IoLocationOutline />
                        </a>
                        Store's adress
                    </h4>
                    <p>
                        Rua Mouzinho de Albuquerque 81, <br />
                        4930-733 Valença, Portugal
                    </p>
                </div>
                <div className={style.hours}>
                    <h4>
                        <MdOutlineLockClock /> Opening hours
                    </h4>
                    <p>
                        Mon - Sun, 10:00 - 13:00 <br />
                        to, 15:00 - 19:00
                    </p>
                </div>
            </div>
        </div>
    );
}
