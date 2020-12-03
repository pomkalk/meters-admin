import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../store/auth/actions"
import useSocket from "./useSocket"
import useUser from "./useUser"

const useAuth = () => {
    const socket = useSocket()
    const user = useUser()
    const dispatch = useDispatch()
    const [state, setState] = useState({
        pending: false,
        error: null
    })

    useEffect(() => {
        socket.on('auth.error', error)
        return () => {
            socket.off('auth.error', error)
        }
    }, [])

    const error = (data) => {
        setState({ pending: false, error: data})
    }

    const login = (data) => {
        setState({ pending: true, error: null})
        socket.emit('auth.login', data)
    }

    const logout = () => {
        dispatch(setUser(null))
    }

    return {
        user, login, logout, status: state
    }
}

export default useAuth
