### Image Store

This is mern stuck application designed to store images by the users.

### Project Description

The user can see images on the first mount if signed in. If the user is not signed in then he can register or sign-in on the button in the app bar. When the user logs in, all the images are shown on the screen. Users can upload a new image on the form at the top of the screen, or update or delete images that are already on their profile. When the user clicks on the image, he sees the image in full format. Users can rotate images on both sides of the screen.

On the server side, I used Node.js with an express framework for routing and middleware. As for the database for users and images, I used MongoDB. On the front I used React.js, and for managing the global state I used Redux. For testing, I mostly used Redux dev tools. For style, I mostly used material-UI components and CSS.

If you want to clone and use this project you must have your own mongodb url connection, and you must create your json web token secret and expiration date on the .env file on the server side.
