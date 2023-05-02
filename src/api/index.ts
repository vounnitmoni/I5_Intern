import api from "./api";

export default class API {
    static async Login(body: any){
        return api.request('/auth/signin', 'POST', body);
    }
    static async Logout(body: any){
        return api.request('/auth/signout', 'POST', body);
    }
    static async Register(body: any){
        return api.request('/auth/signup', 'POST', body);
    }
    static async AskQuestion(body: any){
        return api.request('/all/question/create', 'POST', body);
    }
}