import { Page, Locator } from '@playwright/test';

export class CommonComponents {
    // propeties
    page: Page;
    headerTitleLoc: Locator;
    headerSearchFieldLoc: Locator;
    headerSearchBtnLoc: Locator;
    myAccountIconLoc: Locator;
    cartIconLoc: Locator;
    menuHomeLoc: Locator;
    menuShopLoc: Locator;
    menuBlogLoc: Locator;

    // constructor
    constructor(page: Page) {
        this.page = page;
        this.headerTitleLoc = page.getByRole('heading', { name: 'E-commerce site testing' });
        this.headerSearchFieldLoc = page.getByPlaceholder('Search products...', { exact: true });
        this.headerSearchBtnLoc = page.locator('//button[@class="header-search-button"][@type="submit"]');
        this.myAccountIconLoc = page.locator('//div[@class="header-my-account"]');
        this.cartIconLoc = page.locator('//div[@class="header-cart"]');
        this.menuHomeLoc = page.getByRole('link', { name: "Trang chủ" });
        this.menuShopLoc = page.getByRole('link', { name: "Danh sách khoá học" });
        this.menuBlogLoc = page.getByRole('link', { name: "Blog" });
    }

    // method
    async clickTitleHeader() {
        await this.headerTitleLoc.click();
    }
    async inputSearch(inputText: string) {
        await this.headerSearchFieldLoc.fill(inputText);
    }
    async clickSearchButton() {
        await this.headerSearchBtnLoc.click();
    }
    async clickMyAccount() {
        await this.myAccountIconLoc.click();
    }
    async clickCart() {
        await this.cartIconLoc.click();
    }
    async clickMenuHome() {
        await this.menuHomeLoc.click();
    }
    async clickMenuShop() {
        await this.menuShopLoc.click();
    }
    async clickMenuBlog() {
        await this.menuBlogLoc.click();
    }
}