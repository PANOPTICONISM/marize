import PrimaryButton from "../Button/Button";
import style from "./visitstore.module.css";

const VisitStore = () => {
    return (
        <section className={style.visitStore}>
            <h1>Visit us at our store</h1>
            <PrimaryButton path="./about">
                LEARN MORE ABOUT MARIZÉ
            </PrimaryButton>
        </section>
    );
};

export default VisitStore;
