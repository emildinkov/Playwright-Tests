const NAVBAR = {
    NAV_NAVBAR: 'nav.navbar',
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGIN_BUTTON: 'a[href="/login"]',
    REGISTER_BUTTON: 'a[href="/register"]',
}

const LOGIN_FORM = {
    LOGIN_FORM: '#login-form',
    EMAIL: 'input[id="email"]',
    PASSWORD: 'input[id="password"]',
    LOGIN_BUTTON: 'input[type="submit"]'
}

const REGISTER_FORM = {
    REGISTER_FORM: 'form[id="register-form"]',
    EMAIL: '#register-form input[id="email"]',
    PASSWORD: '#register-form input[id="password"]',
    REPEAT_PASSWORD: '#register-form input[id="repeat-pass"]',
    REGISTER_BUTTON: '#register-form input[type="submit"]'
}

const LOGGED_USER_NAVBAR = {
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    MY_BOOKS_BUTTON: 'a[href="/profile"]',
    ADD_BOOK_BUTTON: 'a[href="/create"]',
    LOGOUT_BUTTON: 'a[id="logoutBtn"]',
    WELCOME_MESSAGE: '//span[text()= "Welcome, peter@abv.bg"]'
}

const CREATE_FORM_BOOK = {
    TITLE: 'input[id="title"]',
    DESCRIPTION: 'textarea[id="description"]',
    IMAGE: 'input[id="image"]',
    TYPE: 'select[id="type"]',
    ADD_BOOK_BUTTON: '#create-form input[type="submit"]'
}

const ALL_BOOKS_LIST = '#dashboard-page li[class="otherBooks"]';

const NO_BOOKS_MESSAGE = '.no-books';

const LIKE_BUTTON = '//a[text()="Like"]';

const DETAILS_BUTTONS = '//a[text()="Details"]';

const DETAILS_DESCRIPTION = '//h3[text()="Description:"]';


const LOGGED_USER_DETAILS_BOOK = {
    EDIT_BUTTON: '//a[text()="Edit"]',
    DELETE_BUTTON: '//a[text()="Delete"]'
}


export {
    NAVBAR,
    LOGIN_FORM,
    LOGGED_USER_NAVBAR,
    REGISTER_FORM,
    CREATE_FORM_BOOK,
    ALL_BOOKS_LIST,
    NO_BOOKS_MESSAGE,
    DETAILS_BUTTONS,
    DETAILS_DESCRIPTION,
    LOGGED_USER_DETAILS_BOOK,
    LIKE_BUTTON,



}