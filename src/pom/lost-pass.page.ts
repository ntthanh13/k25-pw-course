import { Page } from "@playwright/test";
// import { LoginPage } from "./login.page";

export class LostPassPage {
    page: Page;
    lostPassUrl: string

    constructor(page: Page) {
        this.page = page;
        this.lostPassUrl = "https://e-commerce-dev.hoctest.com/wp-login.php?action=lostpassword"
    }

    async getPageUrl() {
        return this.page.url();
    }
}