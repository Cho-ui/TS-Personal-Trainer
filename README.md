# Personal Trainer Web Application

This project is a CRA-bootstrapped TypeScript port of an earlier course project, whose repository 
along with a more detailed(for now) readme.md can be found here:

https://github.com/Cho-ui/Personal-Trainer-React-Front

The API the app is based on is a resource used on multiple courses, and thus might cause issues with how the app is behaving based on the information other course participants have saved to the DB. In case of errors in functionality, send an empty POST request to https://customerrest.herokuapp.com/reset. This resets the DB to contain the default mock data designed to be used in the assignment.

The project will be used as a learning tool in implementing various technologies to a web application,
including styling, logic and end-to-end testing, git workflows, docker etc.

The most immediate step in further development will be uncoupling the project from it's current
course-work related REST Api, and building a similar solution for CRUD use with the .NET Core Framework. 
Once this has been achieved, both projects will be moved to a shared overall project folder for clarity.
Deployment will also be done at that point.
