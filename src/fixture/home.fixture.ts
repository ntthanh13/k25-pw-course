import { test as base } from '@playwright/test';
import { HomePage } from '../pom/home.page';
import { LoginPage } from '../pom/login.page';

type MyFixture = {
    homePage: HomePage;
    loginPage: LoginPage;
}

export const test = base.extend<MyFixture>({
    homePage: async ({ page }, use) => {
        // setup
        const homePage = new HomePage(page);
        await homePage.goHome();

        // use for run test
        await use(homePage);

        // teardown
        // teardown action here
    }
});

export const testAuthen = base.extend<MyFixture>({
    loginPage: async ({ page }, use) => {
        // setup
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();

        // use for run test
        await use(loginPage);

        // teardown
    }
});