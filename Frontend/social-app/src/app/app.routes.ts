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

export const routes: Routes = [
    // Default route
    {
        path:'',
        redirectTo: 'app-login',
        pathMatch: 'full'
    },

    {
        path:'app-login',
        component: LoginComponent
    },

    {
        path:'app-register',
        component: RegisterComponent
    },

    {
        path:'app-user-dashboard',
        component:UserDashboardComponent,
        children: [
            {
                path:'list-all-post',
                component:ListAllPostComponent
            },

            {
                path:'create-post',
                component:CreatePostComponent
            },

            {
                path:'get-post-by-id/:id',
                component:GetPostByIdComponent
            },

            {
                path:'update-post/:id',
                component:UpdatePostComponent
            },

            {
                path:'delete-post/:id',
                component:DeletePostComponent
            },

            {
                path:'like-post',
                component:LikePostComponent
            }
        ]
    },

    {
        path:'app-admin-dashboard',
        component:AdminDashboardComponent
    },

    {
        path:'**',
        redirectTo:'app-login',
        pathMatch:'full'
    }
];
