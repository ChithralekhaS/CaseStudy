import{test,expect} from '@playwright/test'
import { SerachProduct } from '../POM/ProductSearch'
import { Login } from '../POM/login';

var data = JSON.parse(JSON.stringify(require('../Utils/SearchProduct.json')))
var dataSet = JSON.parse(JSON.stringify(require('../Utils/SignUp.json')))
var Data = JSON.parse(JSON.stringify(require('../Utils/Base.json')))


test.describe('Product Search', () => {
    
    test.beforeEach(async ({page}) => {

            var singUp = new Login(page)
               await singUp.navigateTo()
               await singUp.loginButton.click()
               await singUp.userName.fill(dataSet.Email)
               await singUp.userPassword.fill(dataSet.Password)
               await singUp.signInButton.click()
               await page.waitForTimeout(2000)
            
      });


for( var data1 of data){
    test(`Verifying search list for ${data1.product1}`, async ({page})=>{

              var search = new SerachProduct(page, expect)
              await search.serachFeild.fill(data1.product1);
              await search.clickSearch.click();
              await page.waitForTimeout(3000)
              await search.searchProduct(data1.product1)
   
});
      }


    test("Add to Cart", async ({page})=> {
 
             var search = new SerachProduct(page,expect)
             await search.serachFeild.fill(Data.Product);
             await search.clickSearch.click();  
             await page.waitForLoadState('load');
             await search.addProductToCart(Data.Product)

});

})