import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsUrl = "http://localhost:5000/api/post";

  commentUrl = "http://localhost:5000/api/comment";

  constructor(private http : HttpClient) { }

  getAllPosts() : Observable<any> {
    return this.http.get(`${this.postsUrl}/getAllPosts`);
  }

  createPost(data : any) : Observable<any> {
    return this.http.post<any>(`${this.postsUrl}/createPost`, data);
  }
  
  likePost(postId : string, userId : string) : Observable<any> {
    return this.http.post<any>(`${this.postsUrl}/likePost/${postId}`, userId);
  }

  deletePost(postId : string) : Observable<any> {
    return this.http.delete(`${this.postsUrl}/deletePost/${postId}`)
  }

  editPost(postId : string, data : any) :Observable<any> {
    return this.http.put<any>(`${this.postsUrl}/editPost/${postId}`, data);
  }

  // Comment Apis
  addComment(data : any) : Observable<any> {
    return this.http.post<any>(`${this.commentUrl}/addComment`, data);
  }

  getComments(postId : string) : Observable<any> {
    return this.http.get(`${this.commentUrl}/getAllComments/${postId}`);
  }


}
