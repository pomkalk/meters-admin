class User {
    constructor (user) {
        this.user = user
        this._parse()
    }

    _parse () {
        // if (this.isRoot()) return
        this._permissions = [...this.user.permissions.matchAll(/\[(.+?)\]/gm)].reduce((t, v) => {
            let sp = v[1].split('.')
            let acc = sp[1].split('')
            return { ...t, [sp[0]]: acc}
        }, {})
    }

    _checkAccess (access) {
        return Object.keys(this._permissions).includes(access)
    }

    _checkPermission (access, perm) {
        let a = this._permissions[access]
        if (!a) return false
        if (a[0] === '*') return true
        return perm.every(x=>a.includes[x])
    }

    can (access) {
        // if (this.isRoot()) return true
        console.log('bobob', access)
        if (access.length == 0) return new Error('Bad access query.')
        let a = access.split('.')
        if (a.length == 1) {
            return this._checkAccess(a[0])
        } else {
            if (a[1].length == 0) return new Error('Bad permission query.')
            let s = a[1].split('')
            return this._checkPermission(a[0], a[1])
        }
    }

    get id () {
        return this.user.id
    }

    get name () {
        return this.user.name
    }

    get username () {
        return this.user.username
    }

    get isRoot() {
        return this.user.root ? true : false
    }

    can (access) {
        
    }

    getName () {
        return this.name
    }
}

export default User
