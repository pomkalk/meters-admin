import { useSelector } from "react-redux"
import { notification } from 'antd'
import { useHistory } from "react-router-dom"

const useAccess = (access) => {
    const user = useSelector(state=>state.auth.user)
    const history = useHistory()

    if (!user.can(access)) {
        notification.error({ message: 'Ошибка', description: 'У вас нет доступа к данной странице.'})
        new Error('ОШИБКА ПРАВ ДОСТУПА!')
        history.push('/')
    } 
}

export default useAccess
