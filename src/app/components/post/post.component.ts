import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import {
  faThumbsDown,
  faThumbsUp,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post;

  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;
  faShareSquare = faShareSquare;
  uid = null;
  upvote = 0;
  downvote = 0;

  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
    private toastr: ToastrService
  ) {
    this.auth.getUser().subscribe((user) => {
      this.uid = user?.uid;
    });
  }

  ngOnInit(): void {}

  //TODO: BUG IN UPDATING IN CHANGE
  ngOnChanges(): void {
    if (this.post.vote) {
      Object.values(this.post.vote).map((val: any) => {
        if (val.upvote) {
          this.upvote += 1;
        }
        if (val.downvote) {
          this.downvote += 1;
        }
      });
    }
  }

  upvotePost() {
    console.log('You like the post');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote: 1,
    });
  }
  downvotePost() {
    console.log('You dislike the post');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote: 1,
    });
  }

  getInstaUrl() {
    return `https://instagram.com/${this.post.instaId}`;
  }
}
