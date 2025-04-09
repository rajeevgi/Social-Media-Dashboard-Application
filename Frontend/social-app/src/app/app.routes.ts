import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { UserDashboardComponent } from './component/dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './component/dashboard/admin-dashboard/admin-dashboard.component';
import { ListAllPostComponent } from './component/posts/list-all-post/list-all-post.component';
import { CreatePostComponent } from './component/posts/create-post/create-post.component';
import { GetPostByIdComponent } from './component/posts/get-post-by-id/get-post-by-id.component';
import { UpdatePostComponent } from './component/posts/update-post/update-post.component';
import { DeletePostComponent } from './component/posts/delete-post/delete-post.component';
import { LikePostComponent } from './component/posts/like-post/like-post.component';
import { authGuard } from './guard/auth.guard';
import { GetUserComponent } from './component/user/get-user/get-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app-login',
    component: LoginComponent,
  },
  {
    path: 'app-register',
    component: RegisterComponent,
  },
  {
    path: 'app-user-dashboard',
    component: UserDashboardComponent,
    canActivate:[authGuard],
    children: [
      {
        path: '',
        redirectTo: 'list-all-post',
        pathMatch: 'full',
      },
      {
        path: 'list-all-post',
        component: ListAllPostComponent,
        canActivate:[authGuard]
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
        canActivate:[authGuard]
      },
      {
        path: 'get-post-by-id/:id',
        component: GetPostByIdComponent,
        canActivate:[authGuard]
      },
      {
        path: 'update-post/:id',
        component: UpdatePostComponent,
        canActivate:[authGuard]
      },
      {
        path: 'delete-post/:id',
        component: DeletePostComponent,
        canActivate:[authGuard]
      },
      {
        path: 'like-post',
        component: LikePostComponent,
        canActivate:[authGuard]
      },

      {
        path: 'get-user/:username',
        component: GetUserComponent,
        canActivate:[authGuard]
      }
    ],
  },
  {
    path: 'app-admin-dashboard',
    component: AdminDashboardComponent,
    canActivate:[authGuard]
  },
  {
    path: '**',
    redirectTo: 'app-login',
  },
];
