import { Link } from "react-router-dom";
const ProfileComp1 = () => {
    function linkClasses(){
        let classes="border-b-amber-200 px-10 py-2 font-semibold border-2 rounded-full bg-green-300 text-black";
        return classes;
    }
    return (
        <div>
            <div className="flex justify-center items-center mx-auto gap-10">
                <Link to={"/profile"} className={linkClasses()}>Profile</Link>
                <Link to={"/booking"} className={linkClasses()}>Bookings</Link>
                <Link to={"/place"} className={linkClasses()}>Add Place</Link>
            </div>
        </div>
    )
}

export default ProfileComp1
