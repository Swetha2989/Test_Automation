import { webkit }  from 'playwright';
import {expect} from 'chai';
import { LoginPage  } from '../pages/login-page.js';
import { HomePage } from '../pages/home-page.js';
import { ProductPage }  from '../pages/product-page.js';
import dotenv from "dotenv";

dotenv.config();

const browser = await webkit.launch({
    headless: true
});
const context = await browser.newContext( { ignoreHTTPSErrors: true } )
const page = await context.newPage({ ignoreHTTPSErrors: true })

/* SETUP */
before(async () => {  
    await page.goto('https://demo.nopcommerce.com/');
  })
  
/* describe(Test Scenario) test (Test Case)*/  
describe("Login and Add To cart",async()=>{

    it('should display error message as (Login was unsuccessful) with invalid credentials ', async () => {
        const loginPage = new LoginPage(page);
        //Reusable login module
        await loginPage.login(process.env.UI_USERNAME, process.env.INVALID_PASSWORD);
        let hasErrorMessage = await page.isVisible('text=Login was unsuccessful')
        expect(hasErrorMessage, "Expected Error Message not found").to.be.true;
    });

    it('should be able to login with valid credentials', async () => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        //Reusable login module
        await loginPage.login(process.env.UI_USERNAME, process.env.UI_PASSWORD);
        expect(await homePage.getHeaderText(), 'Not signed in successfully').contains('Log out')
    });   

    it('should be able to verify the price of product Asus N551JK-XO076H Laptop is 1500', async () => {
        const homePage = new HomePage(page);
        const prodcutPage = new ProductPage(page);

        /* Search product from homepage */
        await homePage.searchProduct('Asus N551JK-XO076H Laptop');

        /* Get Product details from product page */
        let productsInfo = await prodcutPage.getProductList();
        expect(productsInfo, 'Product not found').contains('Asus N551JK-XO076H Laptop');
        expect('$1,500.00', 'Product Price is not matched').contains(await prodcutPage.getProdPrice());
    });

    it('should be able to display the message after adding to cart', async () => {
       const products = await page.$$('.product-item .details' );
        /* Loop through to locate our required product 
        (When same webelement found multiple times  
            for eg: search with 3 char - 
                'len' in search box gives 2 laptops ) */
        let addToCart;
        for (const product of products) {
            if ((await product.innerText()).includes('Asus N551JK-XO076H Laptop')) {
                addToCart = await product.$('xpath =//button[text()="Add to cart"]');
                break;
            }
        }
        await addToCart.click()
        expect('The product has been added to your shopping cart').equals(await page.locator('.bar-notification-container >> .content').innerText())
    });
})

/* TEARDOWN */
after(async () => {  
  await browser.close();

  })