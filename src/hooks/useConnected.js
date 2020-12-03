const { useSelector } = require("react-redux")

const useConnected = () => {
    const connected = useSelector(state => state.connection.connected)
    return connected
}

export default useConnected
