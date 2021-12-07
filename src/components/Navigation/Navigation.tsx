import style from "./navigation.module.css";
import Hamburger from "hamburger-react";
import SearchBar from "../SearchBar/SearchBar";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navigation() {
    // const [input, setInput] = useState("");

    return (
        <nav className={style.wrapper}>
            <div className={style.left_nav}>
                <Hamburger />
                <div className={style.search_bar_wrapper}>
                    <SearchBar className={style.search_bar} />
                </div>
            </div>

            <div className={style.logo}>
                <Link to="/">
                    <Logo />
                </Link>
            </div>

            <div className={style.right_nav}>
                <AiOutlineUser />
                <AiOutlineHeart />
                <BsHandbag />
            </div>
        </nav>
    );
}
