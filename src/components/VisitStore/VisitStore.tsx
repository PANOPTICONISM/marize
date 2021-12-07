import { PrimaryButton } from "../Buttons/Buttons";
import style from "./visitstore.module.css";

const VisitStore = () => {
    return (
        <section className={style.visitStore}>
            <h1>Visit us at our store</h1>
            <PrimaryButton text="LEARN MORE ABOUT US" path="/about" />
        </section>
    );
};

export default VisitStore;
