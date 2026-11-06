import { expect } from '@playwright/test';
import { test } from '../../src/fixture/home.fixture.ts'
import * as data from '../../src/data/home.data.ts';
import { ProductPage } from '../../src/pom/product.page.ts';
import { product_001 } from '../../src/data/product.data.ts';

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
        let productPage: ProductPage;
        // Step 1
        await test.step('Go to product page', async () => {
            productPage = await homePage.goToProduct1();
            // Verify test steps
            await expect(productPage.productNameLoc).toHaveText(product_001.name);
            await expect(productPage.originPriceLoc).toContainText(product_001.originPrice)
            await expect(productPage.salePriceLoc).toContainText(product_001.salePrice);
            await expect(productPage.productDescriptionLoc).toHaveText(product_001.description);
            await expect(productPage.btnAddToCartLoc).toBeVisible();
        });
        // Step 2
        await test.step('Click to review tab', async () => {
            await productPage.tabReviewLoc.click();
            // Verify test step
            await expect(productPage.reviewFormLoc).toContainText(product_001.noReview);
        });
    });

    test('PRODUCT_002: Verify product review fuction', async ({ homePage }) => {
        let productPage: ProductPage;
        // Step 1
        await test.step('Go to product and view review tab', async () => {
            productPage = await homePage.goToProduct1();
            await productPage.tabReviewLoc.click();
            // Verify test step
            await expect(productPage.reviewFormLoc).toContainText(product_001.noReview);
            await expect(productPage.yourRatingLoc).toBeVisible();
            await expect(productPage.yourReview).toBeVisible();
            await expect(productPage.yourNameLoc).toBeVisible();
            await expect(productPage.yourEmailLoc).toBeVisible();
            await expect(productPage.saveInforCheckboxLoc).toBeVisible();
        });
        // Step 2
        await test.step('Write and submit review product', async () => {
            await productPage.selectRating(product_001.yourRating);
            await productPage.enterReview(product_001.yourReview);
            await productPage.enterUserInfor(product_001.yourName, product_001.yourEmail);
            await productPage.checkSaveInfor(true);
            await productPage.submitReview();
            // Verify test step
            await expect(productPage.commentTextLoc).toContainText(product_001.waitingApprove);
        });
        // Step 3
        await test.step('Refresh page to verify review', async () => {
            await productPage.refreshPage();
            // Verify test step
            await expect(productPage.commentTextLoc).toContainText(product_001.waitingApprove);
        });
        // Step 4
        // await test.step('', async () => { });
    });
});