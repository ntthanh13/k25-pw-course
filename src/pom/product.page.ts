import { Locator, LocatorScreenshotOptions, Page } from "@playwright/test";
import { CommonComponents } from "./common.components";

export class ProductPage extends CommonComponents {
    productNameLoc: Locator;
    originPriceLoc: Locator;
    salePriceLoc: Locator;
    productDescriptionLoc: Locator;
    btnAddToCartLoc: Locator;
    tabDescriptionLoc: Locator;
    tabReviewLoc: Locator;
    reviewFormLoc: Locator;
    yourRatingLoc: Locator;
    yourReview: Locator;
    yourNameLoc: Locator;
    yourEmailLoc: Locator;
    saveInforCheckboxLoc: Locator;
    btnSubmit: Locator;
    star1Loc: Locator;
    star2Loc: Locator;
    star3Loc: Locator;
    star4Loc: Locator;
    star5Loc: Locator;
    commentTextLoc: Locator;

    constructor(page: Page) {
        super(page);
        this.productNameLoc = page.locator('//h1[@class="product_title entry-title"]');
        this.originPriceLoc = page.locator('//p[@class="price"]/del/span');
        this.salePriceLoc = page.locator('//p[@class="price"]/ins/span');
        this.productDescriptionLoc = page.locator('//div[@class="woocommerce-product-details__short-description"]');
        this.tabDescriptionLoc = page.locator('//a[@href="#tab-description"]');
        this.tabReviewLoc = page.locator('//a[@href="#tab-reviews"]');
        this.btnAddToCartLoc = page.locator('//button[@name="add-to-cart"]');
        this.reviewFormLoc = page.locator('//div[@id="reviews"]');
        this.yourRatingLoc = page.locator('//p[@class="stars"]');
        this.yourReview = page.locator('//textarea[@id="comment"]');
        this.yourNameLoc = page.locator('//input[@id="author"]');
        this.yourEmailLoc = page.locator('//input[@id="email"]');
        this.saveInforCheckboxLoc = page.locator('//input[@id="wp-comment-cookies-consent"]');
        this.btnSubmit = page.locator('//input[@name="submit"]');
        this.star1Loc = page.locator('//a[@class="star-1"]');
        this.star2Loc = page.locator('//a[@class="star-2"]');
        this.star3Loc = page.locator('//a[@class="star-3"]');
        this.star4Loc = page.locator('//a[@class="star-4"]');
        this.star5Loc = page.locator('//a[@class="star-5"]');
        this.commentTextLoc = page.locator('//div[@class="comment-text"]');
    }

    async selectRating(rating: number) {
        if (rating === 1) {
            await this.star1Loc.click();
        } else if (rating === 2) {
            await this.star2Loc.click();
        } else if (rating === 3) {
            await this.star3Loc.click();
        } else if (rating === 4) {
            await this.star4Loc.click();
        } else if (rating === 5) {
            await this.star5Loc.click();
        };
    }
    async enterReview(review: string) {
        await this.yourReview.fill(review);
    }
    async enterUserInfor(name: string, email: string) {
        await this.yourNameLoc.fill(name);
        await this.yourEmailLoc.fill(email);
    }
    async checkSaveInfor(check: boolean) {
        if (check) {
            await this.saveInforCheckboxLoc.check();
        } else {
            await this.saveInforCheckboxLoc.uncheck();
        };
    }
    async submitReview() {
        await this.btnSubmit.click();
    }
}