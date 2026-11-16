import { test, expect } from '@playwright/test';
import * as data from '../../src/data/login.data';
import { LoginPage } from '../../src/pom/login.page';
import { LostPassPage } from '../../src/pom/lost-pass.page';
import { HomePage } from '../../src/pom/home.page';

test.describe('Authentication Test Suite', async () => {
    test('Verify UI trang authentication', async ({ page }) => {
        const loginPage = new LoginPage(page);
        let lostPassPage: LostPassPage;
        let devEcomPage: HomePage;
        // step 1
        await test.step('Đi tới trang đăng nhập', async () => {
            await loginPage.gotoLoginPage();
            // verify
            // Trang đăng nhập hiển thị thành công:
            // - 2 input username, password enabled
            // - Checkbox remember me enabled
            // - Button login enabled
            await expect(loginPage.usernameInputLoc).toBeVisible();
            await expect(loginPage.passwordInputLoc).toBeVisible();
            await expect(loginPage.rememberMeCheckboxLoc).toBeVisible();
            await expect(loginPage.submitBtnLoc).toBeVisible();
            // Các link hiển thị chính xác, khi click vào navigate tới các page tương ứng:
            // - Register: https://e-commerce-dev.hoctest.com/wp-login.php?action=register => không có link register trong page
            // - Lost your password: https://e-commerce-dev.hoctest.com/wp-login.php?action=lostpassword
            lostPassPage = await loginPage.clickLostPassword();
            const lostPassUrl = await lostPassPage.getPageUrl();
            expect(lostPassUrl).toContain(data.authen_01.lostPassUrl);
            
            // - Go to E-Commerce (DEV): https://e-commerce-dev.hoctest.com/
            await loginPage.gotoLoginPage();
            devEcomPage = await loginPage.clickGoToEcomDev();
            const devEcomUrl = await devEcomPage.getHomeUrl();
            expect(devEcomUrl).toContain(data.authen_01.ecomDevUrl);
        });

    });
});