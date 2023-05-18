import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import style from "./Navbar.module.css";



function Navbar() {
   

    return (
        <>
            <nav className={style.navBar}>
                <div className={style.left}>
                    <p >Home Task Management</p>
                    <p>Workspace Visible</p>

                    <Button onClick={()=>{localStorage.clear()
                    window.location.reload()

                    }}>Clear</Button>

                </div>

                <div className={style.right}>
                   
                    <p  startIcon={<FilterListIcon />}>
                        Filter
                    </p>
                    <Avatar ></Avatar>
                   
                   
                    <Button variant="text" startIcon={<MoreHorizOutlinedIcon />} />
                </div>
            </nav>
        </>
    );
}

export default Navbar;