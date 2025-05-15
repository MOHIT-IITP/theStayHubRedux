import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, selectUser } from "../features/auth/authSlice";

const HomePage = () => {
    const user = useSelector(selectUser);
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    return (
        <div>
            Welcome to the Home Page
        </div>
    );
};
export default HomePage;
