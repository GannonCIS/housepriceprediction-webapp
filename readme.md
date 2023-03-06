# User guide

### Auth Features

- Registration
- Login
- Verify Login
- Reset Password

### Auth Flow

1.  User need's to register an account using `email` & `password`. User must use a valid email.
    > [http://ec2-54-236-27-190.compute-1.amazonaws.com/register](http://ec2-54-236-27-190.compute-1.amazonaws.com/register)
2.  A verification mail will be sent to the user's `email`.
3.  User need to take the verification code from the mail and verify it from this url:
    > [http://ec2-54-236-27-190.compute-1.amazonaws.com/verify](http://ec2-54-236-27-190.compute-1.amazonaws.com/verify)
4.  After verification user can login to the account from this url:
    > [http://ec2-54-236-27-190.compute-1.amazonaws.com/login](http://ec2-54-236-27-190.compute-1.amazonaws.com/login)
5.  User can also reset his password simply by clicking on **Forget Password?** or by visiting this url:
    > [http://ec2-54-236-27-190.compute-1.amazonaws.com/forgot](http://ec2-54-236-27-190.compute-1.amazonaws.com/forgot)

### Auth Logic

- By default when user goes to the website `http://ec2-54-236-27-190.compute-1.amazonaws.com/` he will be redirected to login page `http://ec2-54-236-27-190.compute-1.amazonaws.com/login`.

- After he is logged in to the website then he can only access the index page `http://ec2-54-236-27-190.compute-1.amazonaws.com/` and other content like `http://ec2-54-236-27-190.compute-1.amazonaws.com/countplot/4`. If you are not logged in you can't access these pages.

### Accessing to the server

> ssh -i access-flask.pem ubuntu@ec2-54-236-27-190.compute-1.amazonaws.com
