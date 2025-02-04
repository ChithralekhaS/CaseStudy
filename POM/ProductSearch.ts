export class SerachProduct
{


public page: any
public clickSearch: any
public serachFeild: any
public product : any
public expect : any
public category : any
public subCategory: any
public filter : any
public productName : any
public addToCart: any
public goToCart : any
public subTotal : any 
public price : any
    constructor(page, expect){
        this.expect = expect
        this.page = page
        this.serachFeild = page.locator("input#js--search-option")
        this.clickSearch = page.locator("button#go-to-search-page")
        this.product = page.locator("p.product-name")
        this.category = page.locator("li.category-item.js--category-item")
        this.subCategory = page.locator("a.d-block")
        this.filter = page.locator("select#browse-filter")
        this.productName = page.locator("p.product-name")
        this.addToCart = page.locator("a.btn.btn-cart")
        this.goToCart = page.locator("a.icon-wrapper.dropdown-toggle-cart")
        this.subTotal = page.locator("p#subtotal")
        this.price = page.locator("p.price")
    

    }

    async searchProduct(product: String){
        const count =  await this.product.count()
        for(var i =0; i<count ; i++){
            var productName =  await this.product.nth(i).textContent()
         
            if (productName.includes(product.toUpperCase()))
                 {
                  await this.expect(productName).toContain(product.toUpperCase());
                  //validation to ensure expected product is displaying.
                  }
     
                  else{
                    console.log(`Test case failed, because "${productName}" does not contain "USB"`);
                    //Considering that search is based on terms, so product namw which doesnt contain search term will be failed.
                    await this.expect(productName).toContain(product.toUpperCase());
                  }
            
         }
    }

    async selectCategory(Category:String, SubCategory: string){
        await this.page.waitForSelector(Category)
        await this.page.hover(Category)
        
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector(SubCategory)
        await this.page.click(SubCategory)

    }

    async addProductToCart(Product:string){
        var count = await this.productName.count();
        for(var i=0; i<count; i++){
          var productName = await this.productName.nth(i).textContent()
          if (productName == Product){
            await this.productName.nth(i).click();
            await this.page.waitForTimeout(3000)
            var Price = await this.price.textContent()
            await this.addToCart.click();
            //this will work with only once, beacuse if same product is added in cart, the button changes to  go to cart.
            await this.page.waitForTimeout(3000)
            await this.goToCart.click();
            var subTotal =  await this.subTotal.textContent()
            this.expect(Price).toBe(subTotal);
         }
        
        }
    }
}