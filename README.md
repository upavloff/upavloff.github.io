# Steps to Build this Project

## 1. Start by creating a React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 2. Create your repository Github to host your project

If you want to build a website with a custom domain, use `user.github.io` as the project name, with `user` being your GitHub handle.

## 3. Start building your website and visualize it thanks to GitHub Pages

To do so, run the commands explained in the [tutorial](https://github.com/gitname/react-gh-pages), and don't forget to set the publishing link on the `gh-pages` branch!

You'll have to do a `npm run deploy` each time to update the `gh-pages` branch.

## 4. Add a Custom Domain to GitHub Pages

I used hostinger and followed this [tutorial](https://dev.to/sidmohanty11/how-to-add-a-custom-domain-to-github-pages-hostinger-edition-p4p)

## 5. Last step if a white page occurs

Make sure to not forget the https in the `homepage` field of the `package.json` was enough for me.

Also, add a `?` after the `favico.ico` to make it visible: `<link rel="icon" href="favicon.ico?" />`.

*ALSO* this can be due to the fact that after each `npm run deploy` to update the website the Custom domain in GitHub settings is reseted for some unknown reason. So put it again.


Visit my webpage here: [pavloffulysse.com](https://pavloffulysse.com/)

<img width="1408" alt="image" src="https://github.com/user-attachments/assets/0220ad4f-cf36-4089-a630-789eca1c4846">


--

initial readme:

# Getting Started with Create React App
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
