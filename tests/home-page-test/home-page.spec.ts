import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pom/home.page';
import * as data from './home-page-data';

test.describe('Home page test', async () => {
    // using page
    let homePage: HomePage;

    // test.beforeAll

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goHome();
    });

    // test.afterEach
    // test.afterAll

    // HOME_001
    test('HOME_001: Home visible verification', async () => {
        // test steps
        await test.step('Go to home page', async () => {
            await homePage.goHome();

            // Verify home element
            await expect(homePage.headerTitleLoc).toHaveText(data.home_001.titleText);
            await expect(homePage.headerSearchFieldLoc).toHaveAttribute('placeholder', data.home_001.searchPlaceHolderText);
            await expect(homePage.menuHomeLoc).toHaveText(data.home_001.menuHomeText);
            await expect(homePage.menuShopLoc).toHaveText(data.home_001.menuShopText);
            await expect(homePage.menuBlogLoc).toHaveText(data.home_001.menuBlogText);
        })
    });

    // HOME_002
    test('HOME_002: Search function verification', async () => {
        // // pre-condition
        // await test.step('Go to home page', async () => {
        //     await homePage.goHome();
        // })
        // test steps
        await test.step('Search with keyword', async () => {
            await homePage.inputSearch(data.home_002.searchInput);
            await homePage.clickSearchButton();

            // Verify search result
        });
    });
});