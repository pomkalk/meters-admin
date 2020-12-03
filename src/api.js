import { message, notification } from 'antd'
import { setUser } from './store/auth/actions'

class AdminApi {
    constructor (socket, store) {
        this.socket = socket
        this.store = store
        
        this.bind()
    }

    bind () {
        this.socket.on('tok', this.tok.bind(this))
        this.socket.on('auth.user', this.authUser.bind(this))
        this.socket.on('auth.logout', this.authLogout.bind(this))
    }

    tok () {
        console.log('+ tok11')
    }

    authUser (data) {
        sessionStorage.setItem('ujw', data.token)
        localStorage.setItem('last_username', data.user.username)
        this.store.dispatch(setUser(data.user))

    }

    authLogout (reason) {
        sessionStorage.removeItem('ujw')
        this.store.dispatch(setUser(null))
        if (reason) {
            notification.info({
                message: reason
            })
        }
    }
}

export default AdminApi
