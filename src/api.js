import { message, notification } from 'antd'
import { setUser } from './store/auth/actions'
import { setConfigData, setConfigPermissions, setConfigUsers } from './store/settings/actions'

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
        this.socket.on('auth.msg', this.authMsg.bind(this))
        this.socket.on('config.data', this.configData.bind(this))
        this.socket.on('users.data', this.usersData.bind(this))
        this.socket.on('config.permissions', this.configPermissions.bind(this))
        this.socket.on('msg', this.showMsg.bind(this))
    }

    configPermissions (data) {
        console.log(data)
        this.store.dispatch(setConfigPermissions(data))
    }

    showMsg (data) {
        notification[data.type](data)
    }

    configData (data) {
        this.store.dispatch(setConfigData(data))
    }

    usersData (data) {
        this.store.dispatch(setConfigUsers(data))
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

    authMsg (msg) {
        if (typeof msg === 'string') msg = {message: msg}
        notification.error(msg)
    }
}

export default AdminApi
