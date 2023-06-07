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
    static async RandomQuestion(body?: any){
        return api.request('/all/post', 'GET', body);
    }
    static async QuestionById(body: any, q_id: number){
        return api.request(`/all/question/${q_id}`, 'GET', body);
    }
    static async AnswerandComment(body: any){
        return api.request(`/all/card/comments`, 'POST', body);
    }  
    static async AnswerQuestion(body : any){
        return api.request('/all/answer', 'POST', body);
    }
    static async CommentAnswer(body: any, answer_id : number){
        return api.request(`/all/comment/${answer_id}`, 'POST', body);
    }
    static async ShortUserInfo(body?: any){
        return api.request('/all/profile/info', 'GET', body)
    }
    static async AddMoreProfileInfo(body?: any){
        return api.request('/all/profile/update', 'POST', body)
    }
//-------------------------------community----------------------------------------
    static async CreateCommunity(body: any){
        return api.request(`/all/community/create`, 'POST', body);
    }
    static async UserCommunity(body?: any){
        return api.request('/all/community/communities', 'GET', body);
    }
    static async CommunityRecommend(body?: any){
        return api.request(`/all/community/communities/recommend`, 'POST', body);
    }
    static async JoinRecommendCommunity(body?: any){
        return api.request(`/all/community/communities/recommend/join`, 'POST', body);
    }
//-------------------------------Category-----------------------------------------
    static async ListOfCategories(param?: number, body?: number[]){
        return api.request(`/all/category/list?request_time=${param}`, 'POST', body);
    }
    static async AddCategories(body?: any){
        return api.request(`/all/category/add`, 'POST', body);
    }   
}