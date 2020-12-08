import { useSelector } from "react-redux"
import User from '../lib/User'

const useUser = () => {
    const user = useSelector(state=>state.auth.user)
    return user
}

export default useUser
