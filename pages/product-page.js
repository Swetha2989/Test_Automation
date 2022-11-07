
export class ProductPage {

     constructor(page) {
       this.page = page;
       this.prodResults = page.locator('.products-wrapper');
       this.prodItem = page.locator('.product-item');
       this.prodTitle = page.locator('.product-item .product-title');
       this.prodPrice = page.locator('.product-item .prices');
       this.productItems = page.locator('.product-item')
       this.addCart = page.locator('button', { hasText: 'Add to cart' })
     }

   async getProductList(){
       return await this.prodResults.innerText();
    }   

   async getProdTitle(){
      return await this.prodTitle;
   }
   
   async getProdPrice(){
       return await this.prodPrice.innerText();
    }

}