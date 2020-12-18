import { useEffect } from 'react'
const { useSelector } = require("react-redux")

const useSubscribe = (event, callback) => {
    const socket = useSelector(state => state.connection.socket)

    const action = (e) => {
        if (callback) {
            if (e.event === event) {
                callback(socket, e.data)
            }
        }
    }

    useEffect(() => {
        console.log('subs', event)
        socket.emit('subscribe', event)
        socket.on('events', action)
        return () => {
            console.log('unsubs', event)
            socket.emit('unsubscribe', event)
            socket.off('events', action)
        }
    }, [])

    return socket
}

export default useSubscribe
