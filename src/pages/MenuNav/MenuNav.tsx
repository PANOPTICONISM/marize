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
           
              
               
          
            {/* TODO: COMPONENT IMG HERE */}
            <div className={style.contact_wrapper}>
                <div className={style.contact_info}>
                    <div className={style.facebook}>
                        <p>Connect with us on </p>
                    </div>
                    <div className={style.phone}>
                        <p>Phone-number</p>
                        <p>+351 251 823 857</p>
                    </div>
                    <div className={style.mail}>
                    <p>E-mail</p>
                    <p>hello@marize.pt</p>
                    </div>
                    <div className={style.adress}>
                        <p>Store's adress</p>
                        <p>Rua Mouzinho de Albuquerque 81, <br/> 
                            4930-733 Valença, Portugal</p>  
                        </div>
                    <div className={style.hours}>
                        <p>Opening hours</p>
                        <p>Mon - Sat, 10:00 - 19:00 <br/>
                        Sunday, 10:00 - 19:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

