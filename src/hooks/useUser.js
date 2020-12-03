import { useSelector } from "react-redux"

class User {
    constructor (user) {
        this.user = user
    }
}

const useUser = () => {
    const user = useSelector(state=>state.auth.user)
    if (user) {
        return new User(user)
    }
    return null
}

export default useUser
