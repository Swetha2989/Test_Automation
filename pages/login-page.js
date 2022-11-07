
export  class LoginPage {
      constructor(page) {
        this.page = page;
        this.emailBox = page.locator('#Email');
        this.password = page.locator('#Password');
        this.loginButton = page.locator('button', { hasText: 'Log in' });
        this.loginLink = page.locator('a', { hasText: 'Log in' });
      }
    
      async login(email,pass){
        await this.loginLink.click();
        await this.emailBox.fill(email);
        await this.password.fill(pass);
        await this.loginButton.click()
    }
}