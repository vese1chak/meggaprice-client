import {makeAutoObservable} from 'mobx';

export default class GoodStore {
    constructor() {
        // На будущее: синтаксис _ перед переменной означает, что вручную её НЕЛЬЗЯ менять
        this._types = [];
        this._values = [];
        this._goods = [];
        this._cartGoods = [];
        this._favoriteGoods = [];
        this._recomendations = [];
        this._searchValue = '';
        this._selectedType = {};
        this._selectedValue = {};
        makeAutoObservable(this);
    }
    setTypes(types) {
        this._types = types;
    }
    setValues(values) {
        this._values = values;
    }
    setGoods(goods) {
        this._goods = goods;
    }
    setCartGoods(goods) {
        this._cartGoods = goods;
    }
    setFavoriteGoods(goods) {
        this._favoriteGoods = goods;
    }
    setSearchValue(text) {
        this._searchValue = text;
    }
    setSelectedType(type) {
        this._selectedType = type;
    }
    setSelectedValue(value) {
        this._selectedValue = value;
    }
    setRecomendations(recomendations) {
        this._recomendations = recomendations
    }

    get types() {
        return this._types;
    }
    get values() {
        return this._values;
    }
    get goods() {
        return this._goods;
    }
    get cartGoods() {
        return this._cartGoods;
    }
    get favoriteGoods() {
        return this._favoriteGoods;
    }
    get searchValue() {
        return this._searchValue;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedValue() {
        return this._selectedValue;
    }
    get recomendations() {
        return this._recomendations
    }
}