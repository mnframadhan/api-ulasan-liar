export type CreateReviewRequest = {
    reviewer_name: string;
    review: string;
    score: number;
}

export type ReviewResponse = {
    user_id: number;
    reviewer_name: string;
    review: string;
    score: number;
}