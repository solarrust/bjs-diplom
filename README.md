# Дипломное задание к курсу «Основы JavaScript»

## Задание

Вы помогаете крипто-стартапу сделать сайт-биржу, на котором можно обменивать деньги на внутреннюю валюту этой компании (она называются **Нетоины**) и передавать эту валюту между пользователям сервиса.
Ваша задача состоит в том, чтобы написать класс `Profile`, содержащий все необходимые методы. Методы описаны в **Части 1**.

Программа, которую требуется реализовать, состоит из двух частей:

### Часть 1

1. Класс «Пользователь» (`Profile`). Он должен уметь выполнять все основные функции. Для этого реализуйте методы:

-   _Добавление нового пользователя_.
-   _Авторизация_.
-   _Добавление денег в личный кошелек_. 
-   _Конвертация валют_.
-   _Перевод токенов другому пользователю_.

2. Функция, которая возвращает текущий курс **Нетоинов** по отношению к другим валютам. Курс потребуется для метода конвертации валют.

### Часть 2
Функция, которая последовательно выполнит следующие пункты:

-   Добавление двух разных пользователей.
-   Зачисление одному из них на счет 500000 евро.
-   Конвертация денег на счету пользователя из текущей валюты в **Нетоины**.
-   Передача **Нетоинов** от одного пользователя второму пользователю.

## Выполнение задания

### 1. Начало работы

1. Установите [NodeJS](https://nodejs.org/en/) для своей операционной системы. Если NodeJS уже был установлен ранее, обновите его до последней версии.
1. Склонируйте данный репозиторий.
1. Откройте терминал и перейдите в папку со склонированным репозиторием.
1. Выполните команду `npm install`.
1. Выполните команду `npm i -g nodemon`.

Убедитесь, что выполняете команды с правами администратора.

### Запуск сервера

1. Чтобы запустить сервер для биржи, выполните команду `npm start` из терминала в папке с репозиторием. Убедитесь, что в консоли в увидели надпись `App is listening on port 1337`.
1. Перейдите по [ссылке](http://localhost:1337) и убедитесь, что видите надпись **Биржа **Нетоинов****

Чтобы остановить работу сервера, нажмите комбинацию `Ctrl+C` в терминале. После этого все данные будут утеряны. 

Обратите внимание, что в консоли может появляться ошибка **вставить скрин ошибки уже созданного юзера**
Эта ошибка решается перезапуском сервера.

### 2. Решение задания

В папке с проектом находятся два файла: `./static/api-connector.js` и `./static/main.js`.

В файле `./static/api-connector.js` реализован класс `ApiConnector`, который умеет делать все необходимые запросы к серверу. Каждый метод данного класса выполняет только две вещи: отправляет запрос на сервер и принимает его ответ.

Используйте методы данного класса при реализации методов класса `Profile`. Только так данные будут записаны на сервер. 
Самостоятельно писать функционал связи с сервером не нужно, поскольку в данном курсе эта тема не изучалась.

Ваша задача, используя методы класса `ApiConnector` для взаимодействия с сервером, реализовать методы класса `Profile` для выполнения необходимых операций.

Файл `./static/main.js` предназначен для вашего кода.

### Решение первой части задания

1. В файле `main.js` объявите класс `Profile`.
2. Реализуйте конструктор класса. Экземпляр класса принимает на вход объект со следующими ключами:
* Имя пользователя — _строка_.
* Реальное имя — _объект_ с ключами имя и фамилия.
* Пароль — _строка_.
3. Реализуйте метод _Добавление нового пользователя_ — метод вызывается с данными, полученными из конструктора класса.
4. Реализуйте метод _Авторизация_ — метод вызывается с данными, полученными из конструктора класса.
5. Реализуйте метод _Добавление денег в личный кошелек_ — метод принимает на вход объект с двумя ключами: валюта (_строка_) и количество денег (_число_). 
6. Реализуйте метод _Конвертация валют_ — метод принимает на вход объект с тремя ключами: из какой валюты конвертируем (_строка_), в какую валюту конвертируем (_строка_), количество конвертируемых денег (_число_).
7. Реализуйте метод _Перевод токенов другому пользователю_ — метод принимает на вход объект с двумя ключами: кому (_строка_, имя пользователя), количество денег (_число_).

При реализации методов активно используйте коллбэки (`callback`). Это позволит последовательно выполнять действия внутри функции из **Часть 2**.

Пример правильного метода:

```javascript
addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }
```
После реализации всех методов класса `Profile` за его пределами реализуйте функцию получения курса валют с сервера. 
В данной функции нужно использовать метод `getStocks` у класса `ApiConector`. 
Изучите, что возвращает данный метод и как следует использовать полученную информацию для конвертации валюты в **Нетокоины**.

### Решение второй части задания

1. В файле `main.js`, после класса `Profile` и функции получения курса валют объявите функцию `main`. 
2. Функция не принимает параметров.
3. Внутри функции объявите две переменные с экземплярами класса `Profile`. Передайте любые выдуманные значения в качестве аргументов.
4. Вызовите метод создания пользователя для одной из созданых переменных. В результате на сервере будет создан новый пользователь.
5. В случае удачного создания пользователя вызовите метод авторизации для того же пользователя, которого вы только что создали.
6. В случае удачной авторизации вызовите метод добавления денег на счёт для авторизованного пользователя.
7. В случае удачного добавления денег на счёт вызовите метод конвертации денег из текущей валюты в **Нетокоины**. Обратите внимание, что для корректной конвертации вам потребуется получить данные из функции получения курса валют.
8. В случае удачной конвертации вызовите метод создания второго пользователя, используя вторую переменную с экземпляром класса `Profile`. 
9. После удачного создания второго пользователя авторизуйте его. 
10. После успешной авторизации второго пользователя вызовите метод перевода денег у первого пользователя. 
11. В конце файла вызовите функцию.

Заготовка для функции:

```javascript
function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
        } else {
                console.log(`Added 500000 euros to Ivan`);
        });
}

main();
```

По ходу выполнения диплома проверяйте корректность работы кода в консоли браузера. 
При возникновении ошибки внимательно прочитайте текст ошибки и постарайтесь самостоятельно найти и решить проблему, вызывающую появление ошибки.

### Пример выводов в консоль успешно решенного задания

![Пример вывода](/output.png)

1. Чтобы выключить приложение, остановите процесс, запущенный при помощи команды `npm start` нажатием комбинации клавиш `Ctrl + C`
1. Перейдите по [ссылке](http://localhost:1337) и убедитесь, что не видите надпись **Биржа "Неткоин"**
---

Исходный код дипломной работы нужно разместить на [GitHub](https://github.com/).

### Как правильно задавать вопросы дипломному руководителю?

**Что следует делать, чтобы все получилось:**

-   Попробуйте найти ответ в лекциях, материалах и домашних заданиях курса. После этого воспользуйтесь Гуглом. В случае любой сложности вы можете задать вопрос дипломному руководителю. Но лучше иметь «на руках» несколько попыток самостоятельного решения проблемы.
-   В одном вопросе лучше описывать одну проблему. Так ответ дипломного руководителя будет максимально эффективным и полезным.
-   По возможности прикрепляйте к вопросу скриншоты и стрелочкой показывайте где не получается. Программу для этого можно скачать здесь https://app.prntscr.com/ru/.
-   По возможности задавайте вопросы в комментариях к коду.
-   Начинайте работу над дипломом как можно раньше! Чтобы было больше времени на правки.
-   Делайте диплом по частям, а не всё сразу. Иначе есть шанс, что нужно будет всё переделывать 🙂

**Что следует делать, чтобы ничего не получилось:**

-   Писать вопросы вида «Ничего не работает. Не запускается. Всё сломалось.»
-   Откладывать диплом на последний момент.
