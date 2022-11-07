
export class HomePage {
      constructor(page) {
        this.page = page;
        this.searchBox = page.locator('.search-box-text');
        this.searchButton = page.locator('button', { hasText: 'Search' });
        this.headerLinks = page.locator('.header-links')
      }
    
        async searchProduct(productName){
            await this.searchBox.fill(productName)
            await this.searchButton.click()
        }
    
        async getHeaderText(){
            return await this.headerLinks.innerText();
        }

    }