const BASE_URL = "http://localhost:3000";

const TEST_URL = {
    TEST_HOME_URL: BASE_URL + "/",
    TEST_LOGIN_URL: BASE_URL + "/login",
    TEST_REGISTER_URL: BASE_URL + "/register",
    TEST_CATALOG_URL: BASE_URL + "/catalog",
    TEST_CREATE_URL: BASE_URL + "/create",
}

const TEST_USER = {
    EMAIL: 'peter@abv.bg',
    PASSWORD: '123456'
}

const RANDOM_USER = Math.floor(Math.random()*1000);

const TEST_NEW_USER = {
    EMAIL: `newuser@${RANDOM_USER}`,
    PASSWORD: '123456',
    REPEAT_PASSWORD: '123456',
    DIFFERENT_PASSWORD: '000000'
}
const ALERT = {
    ALERT_MESSAGE: 'All fields are required!'
}

const TEST_ADD_BOOK = {
    TITLE: 'New book',
    DESCRIPTION: 'New book description',
    IMAGE: 'https://example.com/book-image.jpg',
    TYPE: {
        FICTION: 'Fiction',
        ROMANCE: 'Romance',
        MISTERY: 'Mistery',
        CLASIC: 'Clasic',
        OTHER: 'Other'
    }
}


export {
    BASE_URL,
    TEST_URL,
    TEST_USER,
    ALERT,
    TEST_NEW_USER,
    TEST_ADD_BOOK,
}