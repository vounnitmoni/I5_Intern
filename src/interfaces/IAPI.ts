export interface IQuestionData{
    id: number;
    question: string;
    body: string; 
    post_duration: Date; 
    community: string;
    answer: number;
    vote: number;
    photo: string[];
}

export interface IAnswerData{
    id: number;
    answer: string;
    vote: number;
    report: number;
    create_time: string;
    create_date: string;
    question_id: number;
    author_id: number;
}

export interface ICommentData{
    id: number;
    comment: string;
    create_stamp: undefined;
    parent_id: undefined;
    user_id: undefined;
    answer_id: undefined;
}

export interface IUserAtt {
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    phone_number?: string;
    bio?: string;
    name_shortcut?: string;
    follower?: number;
    followee?: number;
    profile_pic?: string;
    cover_pic?: string;
}