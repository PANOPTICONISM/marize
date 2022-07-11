import { useRouter } from "next/router";
import { translations } from "../../translations/common";
import { PrimaryButton } from "../Buttons/Buttons";
import style from "./visitstore.module.css";

const VisitStore = ({ className }: { className?: string }) => {
  const { locale } = useRouter();
  return (
    <section className={`${style.visitStore} ${className}`}>
      <h1>{translations[locale].visit_headline}</h1>
      <PrimaryButton
        className={style.learnMoreBtn}
        text={translations[locale].visit_btn}
        path="/about"
      />
    </section>
  );
};

export default VisitStore;
