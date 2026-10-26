import { Page } from "@playwright/test";
import { CommonComponents } from "./common.components";

export class HomePage extends CommonComponents {
    // propety
    homeUrl: string;
    
    // constructor
    constructor(page:Page){
        super(page);
        this.homeUrl = "https://e-commerce-dev.betterbytesvn.com"
    }

    // method
    async goHome(){
        await this.page.goto(this.homeUrl);
    }
}