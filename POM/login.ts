export class Login{

    public page: any
    public loginButton: any
    public clickSignUp: any
    public name:any
    public email: any
    public phone : any
    public password : any
    public agreement : any
    public confirmSignUp : any
    public validationMessage : any
    public userName : any
    public userPassword : any
    public signInButton : any
    public LoginValidationMessage: any
    public validation: any

    constructor (page){

        this.page = page
        this.loginButton = page.locator("//span[text()='Login']")
        this.clickSignUp = page.locator("a#signup-tab")
        this.name = page.locator("input[placeholder='Full Name']")
        this.email = page.locator("input#email")
        this.phone = page.locator("input#phone")
        this.password = page.locator("input#password")
        this.agreement = page.locator('role=checkbox[name="I agree to the Terms of Use and Privacy Policy"]')
        this.confirmSignUp = page.locator("input.btn.btn-sign__up")
        this.validationMessage = page.locator("span#message")
        this.userName = page.locator("input[placeholder='Email']").nth(0)
        this.userPassword = page.locator("input[placeholder='Password']").nth(0)
        this.signInButton = page.locator("input.btn.btn-sign__in")
        this.LoginValidationMessage = page.locator("div.text-danger")
        this.validation = page.locator("span#message")

    }

    async navigateTo(){
        await this.page.goto("https://techshopbd.com/");
    }

}