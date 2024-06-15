import {makeAutoObservable} from "mobx";

export default class SellerStore {
    constructor() {
        this._isAuth = false
        this._seller = {}
        this._goods = []
        this._profile = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setSeller(seller) {
        this._seller = seller
    }
    setProfile(profile) {
        this._profile = profile
    }
    setGoods(goods) {
        this._goods = goods
    }

    get isAuth() {
        return this._isAuth
    }
    get seller() {
        return this._seller
    }
    get profile() {
        return this._profile
    }
    get goods() {
        return this._goods
    }
}