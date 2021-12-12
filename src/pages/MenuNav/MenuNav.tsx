import style from "./menu.module.css";
import { MdHighlightOff } from "react-icons/md";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import VisitStore from "../../components/VisitStore/VisitStore";
import StoreInfo from "../../components/StoreInfo/StoreInfo";

export default function MenuNav({ toggleOpen }: { toggleOpen: any }) {
    const { categories } = useCommerceCMS();
    let navCategories = categories?.filter((cat) => {
        return cat.slug !== "accessories";
    });
    navCategories = navCategories?.reverse();

    return (
        <div className={style.menu}>
            <div className={style.close} onClick={toggleOpen}>
                <MdHighlightOff />
            </div>
            <div className={style.container}>
                <div className={style.nav_wrapper}>
                    {navCategories?.map(
                        (
                            cats: { name: string; children: any[] },
                            i: number
                        ) => (
                            <div key={i} className={style.menu_sections}>
                                <h4> {cats.name} </h4>
                                {cats.children.map((c: any) => (
                                    <span key={c.id}>
                                        {c.name}&nbsp;&nbsp;{" "}
                                    </span>
                                ))}
                            </div>
                        )
                    )}
                </div>
                <VisitStore className={style.visitImage} />
                <StoreInfo
                    undoFlex={style.flexBox}
                    className={style.menuBarInfo}
                />
            </div>
        </div>
    );
}
