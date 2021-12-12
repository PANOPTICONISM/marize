import { PrimaryButton } from "../Buttons/Buttons";
import style from "./visitstore.module.css";

const VisitStore = ({ className }: { className?: string }) => {
    return (
        <section className={`${style.visitStore} ${className}`}>
            <h1>Visit us at our store</h1>
            <PrimaryButton
                className={style.learnMoreBtn}
                text="LEARN MORE ABOUT US"
                path="/about"
            />
        </section>
    );
};

export default VisitStore;
