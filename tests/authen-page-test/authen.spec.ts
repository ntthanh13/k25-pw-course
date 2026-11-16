import { test, expect } from '@playwright/test';
import { testAuthen } from '../../src/fixture/home.fixture';
import * as data from '../../src/data/login.data';
import { LoginPage } from '../../src/pom/login.page';
import { LostPassPage } from '../../src/pom/lost-pass.page';
import { HomePage } from '../../src/pom/home.page';
import { AdminPage } from '../../src/pom/admin.page';

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
            await expect(loginPage.loginBtnLoc).toBeVisible();
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
    
    testAuthen('Verify đăng nhập thành công với username và password đúng', async ({ loginPage }) => {
        let adminPage: AdminPage;
        // step 1
        await test.step('Điền thông tin username, password, click button login', async () => {
            adminPage = await loginPage.loginSuccess(data.authen_02.username, data.authen_02.password);
            // Verify
            // - Đăng nhập thành công, chuyển hướng tới https://e-commerce-dev.hoctest.com/wp-admin/
            const adminUrl = await adminPage.getPageUrl();
            expect(adminUrl).toContain(data.authen_02.loginSuccessUrl);
            // - Trang dashboard hiển thị; có 3 block: "At a Glance", "Activity", "WordPress Events and News" hiển thị
            await expect(adminPage.boxAtAGlanceLoc).toBeVisible();
            await expect(adminPage.boxActivityLoc).toBeVisible();
            await expect(adminPage.boxNewsLoc).toBeVisible();
        })

    })
});