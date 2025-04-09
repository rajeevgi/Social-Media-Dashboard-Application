import { Component, EventEmitter, Output } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  postData: string = '';

  @Output() postCreated = new EventEmitter<void>(); 

  constructor(private postService: PostService) {}

  addPost() {
    if (this.postData.trim() === '') return;

    const postPayload = {
      content: this.postData,
      userId: localStorage.getItem('User-data'),
    };

    this.postService.createPost(postPayload).subscribe(
      () => {
        alert('Post Created Successfully!');
        this.postData = '';
        this.postCreated.emit(); // notify parent to close modal & refresh
      },
      (err) => console.error(err)
    );
  }
}
