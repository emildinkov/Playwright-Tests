import { test, expect } from "@playwright/test";
import { LOGIN_FORM, NAVBAR, LOGGED_USER_NAVBAR, REGISTER_FORM, CREATE_FORM_BOOK, ALL_BOOKS_LIST, NO_BOOKS_MESSAGE, DETAILS_BUTTONS, DETAILS_DESCRIPTION, LOGGED_USER_DETAILS_BOOK, LIKE_BUTTON } from "../utils/locators.js";
import { ALERT, BASE_URL, TEST_ADD_BOOK, TEST_NEW_USER, TEST_URL, TEST_USER } from "../utils/constants.js";

// Navigation Bar for Guest Users
test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
});

test('Verify That the "Login" Button Is Visible', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
});

test('Verify That the "Register" Button Is Visible', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
});

// Navigation Bar for Logged-In Users
test('Verify That the "All Books" Link Is Visible', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);   // Изчакай този URl да се зареди !
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LOGGED_USER_NAVBAR.ALL_BOOKS_LINK)).toBeVisible();

});

test('Verify That the "My Books" Link Is Visible', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LOGGED_USER_NAVBAR.MY_BOOKS_BUTTON)).toBeVisible();
});

test('Verify That the "Add Book" Link Is Visible', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LOGGED_USER_NAVBAR.ADD_BOOK_BUTTON)).toBeVisible();
});

test('Verify That the User is Email Address Is Visible', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LOGGED_USER_NAVBAR.WELCOME_MESSAGE)).toBeVisible();
});

// Login form test
test('Submit the Form with Valid Credentials', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Submit the Form with Empty Input Fields', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

test('Submit the Form with Empty Email Input Field', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

test('Submit the Form with Empty Password Input Field', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

// Register form tests
test('Submit the Form with Valid Values', async ({ page }) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(TEST_NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.PASSWORD).fill(TEST_NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(TEST_NEW_USER.REPEAT_PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Submit the Form with Empty Values', async ({ page }) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Submit the Form with Empty Email', async ({ page }) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.PASSWORD).fill(TEST_NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(TEST_NEW_USER.REPEAT_PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Submit the Form with Empty Password', async ({ page }) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(TEST_NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(TEST_NEW_USER.REPEAT_PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Submit the Form with Empty Confirm Password', async ({ page }) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(TEST_NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.PASSWORD).fill(TEST_NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Submit the Form with Different Passwords', async ({ page }) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(TEST_NEW_USER.EMAIL);
    await page.locator(REGISTER_FORM.PASSWORD).fill(TEST_NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(TEST_NEW_USER.DIFFERENT_PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

test('Registration with already existing data', async ({ page }) => {
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(REGISTER_FORM.PASSWORD).fill(TEST_NEW_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REPEAT_PASSWORD).fill(TEST_NEW_USER.REPEAT_PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});

// "Add Book" Page tests
test("Add book with correct data", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_USER_NAVBAR.ADD_BOOK_BUTTON).click();

    await page.locator(CREATE_FORM_BOOK.TITLE).fill(TEST_ADD_BOOK.TITLE);
    await page.locator(CREATE_FORM_BOOK.DESCRIPTION).fill(TEST_ADD_BOOK.DESCRIPTION);
    await page.locator(CREATE_FORM_BOOK.IMAGE).fill(TEST_ADD_BOOK.IMAGE);
    await page.locator(CREATE_FORM_BOOK.TYPE).selectOption(TEST_ADD_BOOK.TYPE.FICTION);
    await page.locator(CREATE_FORM_BOOK.ADD_BOOK_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test("Add book with empty title field", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_USER_NAVBAR.ADD_BOOK_BUTTON).click();

    await page.locator(CREATE_FORM_BOOK.DESCRIPTION).fill(TEST_ADD_BOOK.DESCRIPTION);
    await page.locator(CREATE_FORM_BOOK.IMAGE).fill(TEST_ADD_BOOK.IMAGE);
    await page.locator(CREATE_FORM_BOOK.TYPE).selectOption(TEST_ADD_BOOK.TYPE.FICTION);
    await page.locator(CREATE_FORM_BOOK.ADD_BOOK_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_CREATE_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
});

test("Add book with empty description field", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_USER_NAVBAR.ADD_BOOK_BUTTON).click();

    await page.locator(CREATE_FORM_BOOK.TITLE).fill(TEST_ADD_BOOK.TITLE);
    await page.locator(CREATE_FORM_BOOK.IMAGE).fill(TEST_ADD_BOOK.IMAGE);
    await page.locator(CREATE_FORM_BOOK.TYPE).selectOption(TEST_ADD_BOOK.TYPE.FICTION);
    await page.locator(CREATE_FORM_BOOK.ADD_BOOK_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_CREATE_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
});

test("Add book with empty image URL field", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_USER_NAVBAR.ADD_BOOK_BUTTON).click();

    await page.locator(CREATE_FORM_BOOK.TITLE).fill(TEST_ADD_BOOK.TITLE);
    await page.locator(CREATE_FORM_BOOK.DESCRIPTION).fill(TEST_ADD_BOOK.DESCRIPTION);
    await page.locator(CREATE_FORM_BOOK.TYPE).selectOption(TEST_ADD_BOOK.TYPE.FICTION);
    await page.locator(CREATE_FORM_BOOK.ADD_BOOK_BUTTON).click();

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
    });

    await page.waitForURL(TEST_URL.TEST_CREATE_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CREATE_URL);
});

// All Books Page tests
test("Login and verify all books are displayed", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const allBooksElements = page.locator(ALL_BOOKS_LIST);
    const allBooksCount = await allBooksElements.count();
    expect(allBooksCount).toBeGreaterThan(0);
});

test("Login and verify no books are displayed", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_USER_NAVBAR.MY_BOOKS_BUTTON).click();

    const noBooksMessage = await page.textContent(NO_BOOKS_MESSAGE);

    expect(noBooksMessage).toBe('No books in database!');
});

test("Verify That Logged-In User Sees Details Button and Button Works Correctly", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const detailsButtons = page.locator(DETAILS_BUTTONS);
    expect(detailsButtons).toBeVisible;

    await detailsButtons.first().click();
    await expect(page.locator(DETAILS_DESCRIPTION)).toBeVisible();
});

test("Verify That Guest User Sees Details Button and Button Works Correctly", async ({ page }) => {
    await page.goto(BASE_URL);

    await page.locator(NAVBAR.ALL_BOOKS_LINK).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)

    const detailsButtons = page.locator(DETAILS_BUTTONS);
    expect(detailsButtons).toBeVisible;

    await detailsButtons.first().click();
    await expect(page.locator(DETAILS_DESCRIPTION)).toBeVisible();
});

test("Verify If Edit and Delete Buttons Are Visible for Creator", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const detailsButtons = page.locator(DETAILS_BUTTONS);

    await detailsButtons.first().click();
    await expect(page.locator(LOGGED_USER_DETAILS_BOOK.EDIT_BUTTON)).toBeVisible();
    await expect(page.locator(LOGGED_USER_DETAILS_BOOK.DELETE_BUTTON)).toBeVisible();
});

test("Verify If Edit and Delete Buttons Are Not Visible for Non-Creator", async ({ page }) => {
    
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const detailsButtons = page.locator(DETAILS_BUTTONS);
    await detailsButtons.first().click();
    
    await expect(page.locator(LOGGED_USER_DETAILS_BOOK.EDIT_BUTTON)).not.toBeVisible();
    await expect(page.locator(LOGGED_USER_DETAILS_BOOK.DELETE_BUTTON)).not.toBeVisible();
});

test("Verify If Like Button Is Not Visible for Creator", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const detailsButtons = page.locator(DETAILS_BUTTONS);
    await detailsButtons.first().click();

    await expect(page.locator(LIKE_BUTTON)).not.toBeVisible();
});

test("Verify If Like Button Is Visible for Non-Creator", async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const detailsButtons = page.locator(DETAILS_BUTTONS);
    await detailsButtons.first().click();

    await expect(page.locator(LIKE_BUTTON)).toBeVisible();
});

// Logout Functionality
test('Verify That the "Logout" Button Is Visible', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LOGGED_USER_NAVBAR.LOGOUT_BUTTON)).toBeVisible();
});

test('Verify That the "Logout" Button Redirects Correctly', async ({ page }) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await page.locator(LOGGED_USER_NAVBAR.LOGOUT_BUTTON).click();

    const redirectedURL = page.url();
    expect(redirectedURL).toBe(TEST_URL.TEST_CATALOG_URL);
});





