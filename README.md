# truecaller-blog
# Solution

1. Framework used: Vue 2.

2. Routing:
    - The application has two main pages: a main page and a blog details page.
    - Two routes are created: one for the home page and another for the details page.
    - An additional 404 page is implemented to handle unknown routes.

3. API Services:
    - The APIs are implemented as services and stored in the services folder for better maintenance.

4. Packages Used:
    - dompurify: The primary use of dompurify is to eliminate threats in dynamic HTML. Since dynamic HTML content is used in many places, it is better to sanitize it before usage.
    - vue-router: Offical vue package to handle routes and for navigation 

5. Styling:
    - I have not utilized any designing component packages. Instead, I leveraged CSS to build a responsive UI.

6. Componentization:
    - Major parts of the application are componentized to improve code maintainability.

7. Folder Structure:
    - The project follows a folder structure inspired by Angular, with separate folders for pages and components, to enhance code maintenance.

8. Installation guide:
    -  npm install
        - For installing all the neccessary project dependencies
    -   npm run serve 
        - To run the project and visualize the solution.