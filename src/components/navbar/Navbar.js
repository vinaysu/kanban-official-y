import Button from "@mui/material/Button";
import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import PublicIcon from "@mui/icons-material/Public";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import style from "./Navbar.module.css";
function Navbar() {
    const [showStar, setShowStar] = useState(true);

    return (
        <>
            <nav className={style.navBar}>
                <div className={style.left}>
                    <Button className={style.text} variant="text">Home Task Management</Button>
                    {showStar ? (
                        <Button
                            onClick={() => {
                                setShowStar(!showStar);
                            }}
                        >
                            <StarBorderIcon />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                setShowStar(!showStar);
                            }}
                        >
                            <StarIcon />
                        </Button>
                    )}
                    <Button
                        sx={{ color: "white", textTransform: "none" }}
                        variant="text"
                        startIcon={<PublicIcon />}
                    >
                        Public
                    </Button>
                    <Button variant="text">Workspace Visible</Button>
                    <Button
                        id={style.whiteBtn}
                        variant="contained"
                        startIcon={<ViewKanbanOutlinedIcon />}
                    >
                        Board
                    </Button>
                    <Button variant="text">
                        <KeyboardArrowDownOutlinedIcon />
                    </Button>
                </div>

                <div className={style.right}>
                    <Button variant="text" startIcon={<RocketLaunchOutlinedIcon />}>
                        Power-ups
                    </Button>
                    <Button variant="text" startIcon={<BoltIcon />}>
                        Automation
                    </Button>
                    <Button variant="text" startIcon={<FilterListIcon />}>
                        Filter
                    </Button>
                    <img
                        className={style.userImg}
                        src="https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png"
                        alt=""
                    />
                    <Button
                        id={style.whiteBtn}
                        variant="contained"
                        startIcon={<PersonAddAltOutlinedIcon />}
                    >
                        Share
                    </Button>
                    <Button variant="text" startIcon={<MoreHorizOutlinedIcon />} />
                </div>
            </nav>
        </>
    );
}

export default Navbar;