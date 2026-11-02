import { Locator, Page } from "@playwright/test";
import { CommonComponents } from "./common.components";

export class HomePage extends CommonComponents {
    // propety
    homeUrl: string;
    searchResultHeaderLoc: Locator;
    searchResultCountLoc: Locator;
    searchResultItemListLoc: Locator;
    defaultListItemLoc: Locator;

    // constructor
    constructor(page: Page) {
        super(page);
        this.homeUrl = "https://e-commerce-dev.betterbytesvn.com"
        this.searchResultHeaderLoc = page.locator('//header[@class="woocommerce-products-header"]');
        this.searchResultCountLoc = page.locator('//p[@class="woocommerce-result-count"]');
        this.searchResultItemListLoc = page.locator('//ul[@class="products columns-4"]/li');
        this.defaultListItemLoc = page.locator('//ul[@data-block-name="woocommerce/product-template"]/li');
    }

    // method
    async goHome() {
        await this.page.goto(this.homeUrl);
    }
    async getSearchCountNumber() {
        // get text
        const searchResultCountText = await this.searchResultCountLoc.textContent();
        // slit to array
        if (searchResultCountText !== null) {
            const splittedText = searchResultCountText.split(" ");
            for (let i = 0; i < splittedText.length; i++) {
                const num = parseInt(splittedText[i]);
                if (Number.isInteger(num)) {
                    return num;
                };
            };
        };
        return 0;
    }
    async getSearchItemText() {
        const itemContent = await this.searchResultItemListLoc.allTextContents();
        return itemContent;
    }
}