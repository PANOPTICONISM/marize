import style from "./menu.module.css";
import { useState } from "react";
import { MdHighlightOff } from "react-icons/md";
import { useCommerceCMS } from "../../contexts/CommerceContext";
export default function MenuNav() {
    const {categories } = useCommerceCMS();
   let navCategories = categories?.filter((cat)=>{
    return cat.slug !== "accessories"; 
   }
    )
  navCategories = navCategories?.reverse();
  console.log(navCategories)
    //toggle on menu
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={style.menu}>
            <p className={style.close} onClick={() => setIsOpen(false)}>
                <MdHighlightOff />
            </p>
            <div className={style.nav_wrapper}>
                {navCategories?.map((cats,i)=>
                  ( <div className={style.nav_title}
                    key ={i}>
                        <h5>{cats.name}</h5>
                    </div>)
                    
                )}
                 </div>
                {/* <div className={style.menu_sections}>
                    <p>abc</p>
                    <p>abc</p>
                    <p>abc</p>
                    <p>abc</p>
                    <p>abc</p>
                    <p>abc</p>
                    <p>abc</p>
                </div> */}
           
            {/* <div className={style.nav_wrapper}>
                <div className={style.nav_title}>
                    <h5>TITLE</h5>
                </div>
                <div className={style.about_section}>
                    <p>abc</p>
                    <p>abc</p>
                </div>
            </div> */}
            {/* TODO: COMPONENT IMG HERE */}
            <div className={style.contact_wrapper}>
                <div className={style.contact_info}>
                    <div className="facebook">
                        <p>FB</p>
                    </div>
                    <div className="phone">
                        <p>123</p>
                        <p>123</p>
                        <p>123</p>
                    </div>
                    <div className="mail">mail</div>
                    <div className="adress">adress</div>
                    <div className="hours">hours</div>
                </div>
            </div>
        </div>
    );
}
