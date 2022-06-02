import style from "./storeinfo.module.css";
import { AiOutlineFacebook } from "react-icons/ai";
import { FiPhoneIncoming } from "react-icons/fi";
import { RiMailSendLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLockClock } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
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
        {isFooter && (
          <Image src="/assets/logo.svg" width={198} height={38} alt="logo" />
        )}
        <a
          href="https://www.facebook.com/loja.marize"
          target="_blank"
          rel="noreferrer"
        >
          <h4>
            Encontra-nos no
            <AiOutlineFacebook />
          </h4>
        </a>
      </div>
      {/* {isFooter && (
        <div className={style.about_footer}>
          <h4>Sobre Marizé</h4>
          <ul>
            <li>
              <Link href="/terms-and-conditions">Termos e condições</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Politica de privacidade</Link>
            </li>
            <li>FAQ &amp; Returns</li>
            <li>
              <Link href="/about">Sobre nós</Link>
            </li>
          </ul>
        </div>
      )} */}

      <div className={style.innerGrid}>
        <div className={style.phone}>
          <FiPhoneIncoming />
          <div>
            <h4>Telefone</h4>
            <p>+351 251 823 857</p>
          </div>
        </div>
        <div className={style.mail}>
          <RiMailSendLine />

          <div>
            <h4>Email</h4>
            <p>
              <a href="mailto: hello@marize.pt">hello@marize.pt</a>
            </p>{" "}
          </div>
        </div>
      </div>
      <div className={style.address}>
        <a
          href="https://www.google.fr/maps/place/Rua Mouzinho de Albuquerque 81, 
                            4930-733 Valença, Portugal"
          target="_blank"
          rel="noreferrer"
        >
          <IoLocationOutline />

          <div>
            <h4>Endereço da loja</h4>
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
          <h4>Horário de funcionamento</h4>
          <p>
            Segunda - Domingo: <br />
            Entre 10:00 - 13:00 <br />
            e, 15:00 - 19:00
          </p>
        </div>
      </div>
    </div>
  );
}
