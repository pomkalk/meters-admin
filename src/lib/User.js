class User {
    constructor (user) {
        this._user = user
    }

    static create (user) {
        if (user) return new User(user)
        return null
    }

    _checkAccess (access) {
        return Object.keys(this._user.permissions).includes(access)
    }

    _checkPermission (access, perm) {
        let a = this._user.permissions[access]
        if (!a) return false
        if (a[0] === '*') return true
        return perm.every(x=>{
            return a.includes(x)
        })
    }

    can (access) {
        if (Array.isArray(access)) {
            return access.some(x => this.can(x))
        }
        if (access.length == 0) return new Error('Bad access query.')
        let a = access.split('.')
        if (a.length == 1) {
            return this._checkAccess(a[0])
        } else {
            if (a[1].length == 0) return new Error('Bad permission query.')
            let s = a[1].split('')
            return this._checkPermission(a[0], s)
        }
        return false
    }

    getName () {
        return this._user.name
    }
}

export default User
