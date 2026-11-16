import { Locator, Page } from "@playwright/test";
import { LostPassPage } from "./lost-pass.page";
import { HomePage } from "./home.page";

export class LoginPage {
    page:Page
    loginUrl: string;
    usernameInputLoc: Locator;
    passwordInputLoc: Locator;
    visiblePassLoc: Locator;
    submitBtnLoc: Locator;
    rememberMeCheckboxLoc: Locator;
    lostPassLoc: Locator;
    ecomDevLoc: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginUrl = "https://e-commerce-dev.hoctest.com/wp-admin";
        this.usernameInputLoc = page.locator('//input[@id="user_login"]');
        this.passwordInputLoc = page.locator('//input[@id="user_pass"]');
        this.visiblePassLoc = page.locator('//span[@class="dashicons dashicons-visibility"]');
        this.rememberMeCheckboxLoc = page.locator('//input[@id="rememberme"]');
        this.submitBtnLoc = page.locator('//input[@id="wp-submit"]');
        this.lostPassLoc = page.locator('//a[@class="wp-login-lost-password"]');
        this.ecomDevLoc = page.locator('//a[@href="https://e-commerce-dev.hoctest.com/"]');
    }

    async gotoLoginPage() {
        await this.page.goto(this.loginUrl);
    }
    async clickLostPassword() {
        await this.lostPassLoc.click();
        return new LostPassPage(this.page);
    }
    async clickGoToEcomDev() {
        await this.ecomDevLoc.click();
        return new HomePage(this.page);
    }

}