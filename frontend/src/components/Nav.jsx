import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedContent from "../assets/animations/ContentEntrance";

function Nav() {
    return(
        <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse="true"
        >
            <nav className="py-4 flex flex-col items-center gap-3 max-w-500 bg-red-900 h-screen">
                <img className="w-20" src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1778685839/React-icon.svg_thczqe.png" alt="" />
                <ul className="w-full items-center flex flex-col py-2">
                    <Link className="min-w-full py-4 px-10 text-3xl text-white border-t-2 hover:bg-red-800 border-red-300" to="/home">Dashboard</Link>
                </ul>
            </nav>
        </AnimatedContent>
    )
}

export default Nav;