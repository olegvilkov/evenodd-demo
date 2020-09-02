# Игра чёт-нечет

Простая многопользовательская игра, в которой игроки загадывают числа и пытаются отгадать, чётное или нечётное число загадал противник.

Поиграть в игру можно тут: https://evenodd-demo.web.app

## Стек
React, Framework7, Flow/TypeScript, Firestore, Firebase functions, Redux, redux-saga

## Установка

*** По команде `npm run deploy` происходит деплой статического клиента на Firebase hosting.  Если открыть сайт, можно поиграть в игру. Решите вопрос с API-ключами для деплоя так, как вы бы сделали это на production сервисе.

*** Следуя инструкциям в Readme, игра должна запускаться без дополнительных настроек.

## Правила игры
* В игре участвует M-игроков.
* Игроки ходят друг за другом по очереди, по принципу round robin.
Во время своего хода игрок пытается угадать, чётное или нечётное число загадал предыдущий участник. Также он загадывает своё число для следующего игрока. За каждое угаданное число игрок получает 1 балл.
* Каждый участник в течение игры делает K-ходов. K=10 и хранится в настройках Firebase Remote Config.
* Игра заканчивается, когда каждый игрок сделал свои K-ходов, и у одного из участников больше очков, чем у других. Для двух игроков: если по истечение 20-ти ходов счёт равный, то игра продолжается до первого разгаданного числа.

Побеждает тот, кто угадал больше чисел.
Первый игрок создаёт игру, называет своё имя и задаёт число участников. Последующие игроки присоединяются к нему, просто указывая своё имя. Как только все игроки вошли, начинается первый ход.  

## Серверная часть
**[Серверная часть](functions/README.md)** реализована через Firebase cloud functions. Код на TypeScript. Функция-триггер, которая реагирует на запись данных в Firestore. Эта функция определяет, когда игра завершилась и кто победитель.

Гарантировать честную игру от клиентов с помощью firestore security rules и firestore-транзакции.

## Клиентская часть
* Экран Создать игру. На этом экране указываем количество игроков и имя первого участника. Кнопка «Создать».
* Экран Присоединиться к игре. Поле, чтобы написать имя нового участника и кнопка «Присоединиться».
* Экран Игра.
    - Компонент для угадывания чёт-нечет и ввод нового числа с кнопкой «Отправить».
    - Пока участник ждёт других игроков, экран блокируется с сообщением «Сейчас не ваш ход».
    - Компонент, который выводит имена игроков и их текущие очки. Текущие очки отображаем в реальном времени.
    - Когда игра закончилась, выводится сообщение, что игра закончена и имя победителя.
* Экран Список игр. Поддержка нескольких игр, которые идут одновременно. Выводятся текущие и завершенные игры.

Все экраны созданы на базе Framework7.
Бизнес-логика для клиента реализована в redux-sagas.

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
