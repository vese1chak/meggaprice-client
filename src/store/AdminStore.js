import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._applications = []
        this._questions = []
        this._dialogs = []
        makeAutoObservable(this)
    }

    setApplications(applications) {
        this._applications = applications
    }
    setQuestions(questions) {
        this._questions = questions
    }
    setDialogs(dialogs) {
        this._dialogs = dialogs
    }

    get applications() {
        return this._applications
    }
    get questions() {
        return this._questions
    }
    get dialogs() {
        return this._dialogs
    }
}