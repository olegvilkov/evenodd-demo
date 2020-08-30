
https://evenodd-demo.web.app

## Серверная часть
**[Серверная часть](functions/README.md)** реализована через Firebase cloud functions. Код на TypeScript. Функция-триггер, которая реагирует на запись данных в Firestore. Эта функция определяет, когда игра завершилась и кто победитель.

<hr>

This project was bootstrapped with [Create React App](https://github.com/facebook/createreact-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run emulator`

Запускает эмелятор Firestore <br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.
The Firebase Emulators make it easier to fully validate your app's behavior and verify your Firebase Security Rules configurations.<br />
For more information see [Test Security Rules Guides](https://firebase.google.com/docs/rules/emulator-setup)

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:server`

Запускает тестирование firestore security rules (./firestore.rules).<br />
Перед запуском тестирования необходимо запустить в отдельном терминале эмулятор Firestore (`npm run emulator`).


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
