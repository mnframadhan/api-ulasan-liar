import { ReviewResponse } from "./review-model";

export type CreateUserRequest = {
    name: string;
    jenis: string;
    description: string;
  }
  
export type UserResponse = {
    name: string;
    created_at: string;
    jenis: string;
    description: string;
    gambar1: string;
    gambar2: string;
  }


export type UserAndReviewsResponse = {
  user: UserResponse;
  reviews: ReviewResponse[];
}