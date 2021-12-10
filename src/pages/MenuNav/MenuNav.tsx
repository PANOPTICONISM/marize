import style from "./menu.module.css";
import { useState } from "react";
import { MdHighlightOff } from "react-icons/md";
import { useCommerceCMS } from "../../contexts/CommerceContext";
import VisitStore from "../../components/VisitStore/VisitStore";
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
            {navCategories?.map((cats: { name: string; children: any[] }, i: number)=> (
              <div key ={i} className={style.menu_sections}>
                  <h4> {cats.name} </h4> 
                   {cats.children.map((c: any)=>(
                     <span>{c.name}&nbsp;&nbsp; </span>
                          )      
                   )} 
                
                </div>  
                )
            )}
             <div className={style.last_section}>
                    <h4>About Marizé</h4>
                    <p>Our Story</p>
                  <div className="returns">
                  <h4>Returns</h4>
                  </div>     
                </div>
                 </div>
            <div className={style.img_component}>
            <VisitStore />
            </div>
              
                
            <div className={style.contact_wrapper}>
                <div className={style.contact_info}>
                    <div className={style.facebook}>
                        <h4>Connect with us on </h4>
                    </div>
                    <div className={style.phone}>
                        <h4>Phone-number</h4>
                        <p>+351 251 823 857</p>
                    </div>
                    <div className={style.mail}>
                    <h4>E-mail</h4>
                    <p><a href="mailto: hello@marize.pt" > hello@marize.pt</a>
                       </p>
                    </div>
                    <div className={style.adress}>
                        <h4>Store's adress</h4>
                        <p>Rua Mouzinho de Albuquerque 81, <br/> 
                            4930-733 Valença, Portugal</p>  
                        </div>
                    <div className={style.hours}>
                        <h4>Opening hours</h4>
                        <p>Mon - Sat, 10:00 - 19:00 <br/>
                        Sunday, 10:00 - 19:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

