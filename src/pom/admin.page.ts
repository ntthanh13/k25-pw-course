import { Locator, Page } from "@playwright/test";

export class AdminPage {
    page: Page;
    boxAtAGlanceLoc: Locator;
    boxActivityLoc: Locator;
    boxNewsLoc: Locator;

    constructor(page: Page) {
        this.page = page;
        this.boxAtAGlanceLoc = this.page.locator('//div[@aria-label="At a Glance"]');
        this.boxActivityLoc = this.page.locator('//div[@aria-label="Activity"]');
        this.boxNewsLoc = this.page.locator('//div[@aria-label="WordPress Events and News"]');
    }

    async getPageUrl() {
        return this.page.url();
    }
}