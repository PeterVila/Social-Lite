# Social-Lite

A full stack web application for friends who want to share memories and plan out events together. <br />

**Link:**
[Social-Lite](https://social-lite-lfz.herokuapp.com/)

<p align="center">
  <img src="https://user-images.githubusercontent.com/42393951/142703705-8a2bdc26-a4a5-4ffb-bf3e-ff7f6faebc33.png" width="45%" height="525px"/>
&nbsp; &nbsp; &nbsp; &nbsp;
  <img src="https://user-images.githubusercontent.com/42393951/142703708-be804cf7-aaf6-4f56-a22c-a4544dd69cc9.gif" width="45%" height="525px"/>
</p>
## Technologies Used: 
- React.js
- Socketio
- Node.js
- Express.js
- PostgreSQL
- Webpack
- Babel
- Argon2 / JWT
- HTML5
- CSS3
- JavaScript
- Heroku

## Features: 
1. User can create a memory post
2. User can create an event post
3. User can view all posts
4. User can insert a comment on a memory post
5. User can join a list of event attendees
6. User can register
7. User can login
8. User can join a chatroom
9. User can send and receive messages

## Stretch Features:
1. User can view profile pages
2. User can see who is currently online in the chatroom

## System Requirements

- VS Code or any similar IDE supporting JavaScript ES6
- Node.js 10 or higher
- NPM 6 or higher

## Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:PeterVila/final-project.git
    cd final-project
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Create a new database

    ```shell
    createdb <insertName>
    ```

4. Import the example database
    ```shell
    npm run db:import
    ```

5. Create an S3 bucket for your uploads and change AWS variables in .env
    ```shell
    AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXXX
    AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    AWS_S3_BUCKET=some-bucket-name
    ```

6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
