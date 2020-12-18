import { message, notification } from 'antd'
import { setUser } from './store/auth/actions'
import { setConfigData, setConfigPermissions, setConfigUsers } from './store/settings/actions'
import { setDbPeriods, clearDbPeriods, setDbStatus, setDbImportConfi } from './store/database/actions'
class AdminApi {
    constructor (socket, store) {
        this.socket = socket
        this.store = store
        
        this.bind()
    }

    bind () {
        this.socket.on('tok', this.tok.bind(this))
        //auth
        this.socket.on('auth.user', this.authUser.bind(this))
        this.socket.on('auth.logout', this.authLogout.bind(this))
        this.socket.on('auth.msg', this.authMsg.bind(this))
        //config
        this.socket.on('config.data', this.configData.bind(this))
        this.socket.on('users.data', this.usersData.bind(this))
        this.socket.on('config.permissions', this.configPermissions.bind(this))
        //database
        this.socket.on('database.periods', this.databasePeriods.bind(this))
        this.socket.on('database.status', this.databaseStatus.bind(this))
        this.socket.on('database.config', this.databaseConfig.bind(this))

        //MESSAGES
        this.socket.on('msg', this.showMsg.bind(this))
        this.socket.on('errmsg', this.showErrMsg.bind(this))
    }

    databaseConfig (config) {
        this.store.dispatch(setDbImportConfi(config))
    }

    databaseStatus (status) {
        console.log(status)
        this.store.dispatch(setDbStatus(status))
    }

    databasePeriods (periods) {
        this.store.dispatch(setDbPeriods(periods))
    }

    configPermissions (data) {
        console.log(data)
        this.store.dispatch(setConfigPermissions(data))
    }

    showErrMsg (data) {
        notification.error(data)
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
