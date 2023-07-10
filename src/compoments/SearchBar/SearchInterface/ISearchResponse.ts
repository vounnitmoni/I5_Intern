export interface ISearchQuestion {
    id: number;
    question: string;
    body: string;
    vote: number;
    answer: string;
    param_separation: string[];
}

export interface ISearchCommunity {
    id: number;
    name: string;
    member: number;
    profile_pic: string;
}

export interface ISearchUser {
    id: number;
    firstname: string; 
    lastname: string;
    username: string;
    follower: number;
    profile_pic: string;
}