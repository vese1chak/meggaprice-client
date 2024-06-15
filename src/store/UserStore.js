import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._profile = []
        this._supportMessages = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setProfile(user) {
        this._profile = user
    }
    setSupportMessages(messages) {
        this._supportMessages = messages
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get profile() {
        return this._profile
    }
    get supportMessages() {
        return this._supportMessages
    }
}