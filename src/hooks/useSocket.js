const { useSelector } = require("react-redux")

const useSocket = () => {
    const socket = useSelector(state => state.connection.socket)
    return socket
}

export default useSocket
