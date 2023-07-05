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
    static async QuestionById(q_id: number){
        return api.request(`/all/question/${q_id}`, 'GET', null);
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
    static async OtherUserShortInfo(id?: number){
        return api.request(`/all/profile/info/${id}`, 'GET', null)
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
    static async CommunityInfo(id: any){
        return api.request(`/all/community/info/${id}`, 'GET', null);
    }
    static async NotJoinCommunity(id: any){
        return api.request(`/all/community/${id}/not_join`, "DELETE", null)
    }
    static async JoinCommunity(id: any){
        return api.request(`/all/community/${id}/join`, "POST", null)
    }
//-------------------------------Category-----------------------------------------
    static async ListOfCategories(param?: number, body?: number[]){
        return api.request(`/all/category/list?request_time=${param}`, 'POST', body);
    }
    static async AddCategories(body?: any){
        return api.request(`/all/category/add`, 'POST', body);
    }
//-------------------------------Folloing-------------------------------------------
    static async FollowUser(body?: number){
        return api.request(`/all/follow`, 'POST', body);
    }
    static async UnfollowUser(body?: number){
        return api.request(`/all/follow`, 'DELETE', body);
    }
//------------------------------Post------------------------------------------------
    static async UserPosts(user_id: any, body?: any){
        return api.request(`/all/post/user/${user_id}`, 'POST', body)
    }
    static async CommunityPosts(community_id: any, body?: any){
        return api.request(`/all/post/com/${community_id}`, 'POST', body)
    }
    static async FeedPosts(body?: any){
        return api.request(`/all/post/feed`, 'POST', body)
    }
//-------------------------------------------------------------------------------
    static async QuestionUpVote(q_id: number){
        return api.request(`/all/question/upvote/${q_id}`, 'PATCH', null)
    }
    static async QuestionDownVote(q_id: number){
        return api.request(`/all/question/downvote/${q_id}`, 'PATCH', null)
    }
//------------------------Thunh nas---------------------------------------------
    static async ListFollowing(owner_id: number, body?: any){
        return api.request(`/all/profile/info/following/${owner_id}`, 'POST', body)
    }
    static async ListFollower(owner_id: number, body?: any){
        return api.request(`/all/profile/info/follower/${owner_id}`, 'POST', body)
    }

    static async ListComment(answer_id: number, body?: any){
        return api.request(`/all/comment/ofanswer/${answer_id}`, 'POST', body);
    }
    static async ListAnswer(q_id: number){
        return api.request(`/all/answer/ofquestion/${q_id}`, 'GET', null);
    }
}