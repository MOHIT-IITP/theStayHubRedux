import React, { useEffect } from "react";
import ProfileComp1 from "./ProfileComp1";
import { Link } from "react-router-dom";

const AddPlace = () => {

    return (
        <div>
            <ProfileComp1 />
            <div className="flex justify-center items-center my-10">
                <Link to={"/form"}>
                    <button className="border-2 border-black px-10 py-2 rounded-full bg-amber-200 hover:text-2xl">
                        Add New Place
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AddPlace;
