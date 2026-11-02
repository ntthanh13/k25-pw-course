import {test as base} from '@playwright/test';
import { HomePage } from '../pom/home.page';

type MyFixture = {
    homePage : HomePage;
}

export const test = base.extend<MyFixture>({
    homePage: async ({page}, use) => {
        // setup
        const homePage = new HomePage(page);
        await homePage.goHome();
        
        // use for run test
        await use(homePage);

        // teardown
        // teardown action here
    }
});