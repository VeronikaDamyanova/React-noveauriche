https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white

# React Project
 
ReactJS final exam project for ReactJS Course in Software University. The project is a fashion blog, where users can create their own account, posts/articles, comments, as well as edit and delete them. The project uses Firebase email/password authentication as well as the Firestore database where users, posts/articles and comments are stored

## Features
- Public and Private part.
- Register and Login for users in order to access Private part of website.
- View all posts in Blog page as well as view the newest posts on the Homepage.
- View a single blog post where they can view other people's comments, add and delete their own comments.
- Create their own blog posts.
- Edit and delete their own posts.

## How to Install
- Clone the repository
- In the directory of the repository run command npm install.
- After the process is finished, run command npm start.

## How to Use

The Project consists of Public and Private part.

### Public part
- In the Public part anonymous users can only visit the Homepage, About, Login and Register.
- Navigating to Register will show the user a form where they can create their own account.
- After registration the user is redirected to Login page.
- After logging in the user can access the Private part of the website.

### Private part
- In the Private part authenticated users can view the latests posts section in the Homepage
- Users have access to Blog page where they can view all the posts or choose from a specific category.
- Clicking on a post/article will redirect the user to the Single post/article page.
- In the Single post/article page, users can view all the information about the post, see other users' comments, add their own comment and delete it.
- Clicking on Create from the navigation will redirect users to a form where they can create their own post. All the fields are required including the select category dropdown.
- Users who click on their own post/article and navigate to the bottom of the page will be able to access their own post private area.
- This post private area consists of Edit and Delete buttons.
- Clicking on Edit button will redirect the user to a form. Currently all the info about the post is shown as a placeholder in the input fields. 
- In order to edit their posts, users currently need to fill all the input fields and then submit in order to edit.

## Future Modifications/Fixes
This is a list of the things I would like to add/fix to the project in the future.
- Rewrite the Edit form
- Find a way to load and send data from/to firebase faster
- Add likes functionality with animations on click events.
- Upgrade the design
- Use scss/sass/less instead of css
