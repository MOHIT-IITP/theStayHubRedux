import { useSelector } from "react-redux"
import { selectUser } from "../features/auth/authSlice"

const ProfileSection = () => {
    const user = useSelector(selectUser);
  return (
    <div>
            <div>
                {user ? user.fullName : "<h1>Full name is not available</h1>"}
            </div>
        </div>
  )
}

export default ProfileSection
