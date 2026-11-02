import { expect } from '@playwright/test';
import { test } from '../../src/fixture/home.fixture.ts'
import * as data from '../../src/data/home.data.ts';

test.describe('Home page test', async () => {

    test('HOME_001: Home visible verification', async ({ homePage }) => {
        // test steps
        await test.step('Go to home page', async () => {
            await homePage.goHome();

            // Verify test step
            // Header including expected text
            await expect(homePage.headerTitleLoc).toHaveText(data.home_001.titleText);
            // Search field including expected place holder text
            await expect(homePage.headerSearchFieldLoc).toHaveAttribute('placeholder', data.home_001.searchPlaceHolderText);
            // Menu tab list text
            await expect(homePage.menuHomeLoc).toHaveText(data.home_001.menuHomeText);
            await expect(homePage.menuShopLoc).toHaveText(data.home_001.menuShopText);
            await expect(homePage.menuBlogLoc).toHaveText(data.home_001.menuBlogText);
        })
    });


    test('HOME_002: Search function verification', async ({ homePage }) => {
        // test steps
        await test.step('Search with keyword', async () => {
            await homePage.inputSearch(data.home_002.searchInput);
            await homePage.clickSearchButton();

            // Verify test step
            // Verify search result text content
            await expect(homePage.searchResultCountLoc).toBeVisible();
            // Verify number item searched
            const searchCount = await homePage.getSearchCountNumber();
            await expect(homePage.searchResultItemListLoc).toHaveCount(searchCount);
            // Verify all searched item including searched text
            // Lowercase search key for compare without exact lower/upper
            const lowerCaseSearchKey = data.home_002.searchInput.toLowerCase();
            // Get search items text, then compare to search key
            const searchedItemName = await homePage.getSearchItemText()
            for (let i = 0; i < searchCount; i++) {
                const lowerCaseItemName = searchedItemName[i].toLowerCase();
                expect(lowerCaseItemName).toContain(lowerCaseSearchKey);
            };
        });
    });

    test('PRODUCT_001: Verify product page displaying correct product information', async ({ homePage }) => {
        // 
        console.log(await homePage.defaultListItemLoc.allTextContents());
    })
});