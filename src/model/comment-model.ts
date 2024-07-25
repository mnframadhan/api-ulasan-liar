export type CreateCommentRequest = {
    comment: string;
}

export type CommentResponse = {
    user_id: number;
    comment: string;
}