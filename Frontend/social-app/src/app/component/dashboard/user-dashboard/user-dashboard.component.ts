import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { PostService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../../../model/post';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../../model/comment';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  user: User = new User();
  post: Post = new Post();
  comment : Comment = new Comment();
  showDropdown: { [key: string]: boolean } = {};

  dropdownOpen: boolean = false;

  postList: any[] = [];

  postData: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((res: any) => {
      this.postList = res.fetchAll;

      this.postList.forEach(post => {
        this.loadComments(post);
      });
    });
  }

  loadComments (post : any){
    this.postService.getComments(post._id).subscribe(( res : any ) => {
      post.comments = res.comments || [];
      post.commentCount = post.comments.length;
    },
    (error) => {
      console.log('Error Fetching comments.', error);
    }
  );
  }

  getUsernameFromLocalStorage(): string | null {
    const userData = localStorage.getItem('User-data');
    if (userData) {
      try {
        const getUsername = JSON.parse(userData);
        return getUsername.username || null;
      } catch (error) {
        console.error('Error parsing User-data:', error);
        return null;
      }
    }
    return null;
  }

  addPost() {
    if (!this.postData.trim()) {
      alert('Post cannot be empty!');
      return;
    }

    const newPost = { content: this.postData };

    this.postService.createPost(newPost).subscribe(
      (res: any) => {
        alert(`${this.getUsernameFromLocalStorage()} has posted recently..`);
        this.postList.unshift(res.newPost);
        this.postData = '';
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }

  toggleDropdown(postId: string) {
    this.showDropdown[postId] = !this.showDropdown[postId];
  }

  deletePost(postId: string) {
    if (confirm('Are you sure, you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.postList = this.postList.filter((post) => post._id !== postId);
        alert('Post Deleted Successfully...');
      });
    }
  }

  editPost(postId: string) {
    this.postService.editPost(postId, this.post).subscribe((res: any) => {
      alert('Post Updated Successfully...');
      this.postList = res;
    });
  }

  toggleUserDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('User-data');
    localStorage.clear();
    window.location.href = '/app-login';
  }

  toggleComment(postId: string) {
    this.postList = this.postList.map((post) => {
      if (post._id === postId) {
        post.showCommentBox = !post.showCommentBox;
      }
      return post;
    });
  }

  addComment(post: any) {
    if (!post.commentText || post.commentText.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }
  
    const newComment = { postId: post._id, content: post.commentText };
  
    this.postService.addComment(newComment).subscribe(
      (res: any) => {
        alert(`${this.getUsernameFromLocalStorage()} has commented on your post..`);
  
        this.loadComments(post);
  
        if (!post.comments) {
          post.comments = [];
        }  
        post.commentText = '';
        post.showCommentBox = false;
      },
      (error) => {
        console.error("Error creating comment:", error);
      }
    );
  }
  
}
