import {test, expect} from '@playwright/test'
import {Login} from '../POM/login'
//import { allure } from 'allure-playwright';
var data = JSON.parse(JSON.stringify(require('../Utils/SignUp.json')))
var dataSet = JSON.parse(JSON.stringify(require('../Utils/login.json')))

test.skip('Sign Up', async ({page})=>{

    var singUp = new Login(page)
    await singUp.navigateTo()
    await singUp.loginButton.click()
    await page.waitForTimeout(2000)
    await singUp.clickSignUp.click()
    
    
    await singUp.name.fill(data.Name)
    await singUp.email.fill(data.Email)
    await singUp.phone.fill(data.PhoneNumber)
    await singUp.password.fill(data.Password)
    await singUp.agreement.check({force :true})
    await singUp.confirmSignUp.click()
    await page.waitForTimeout(3000)
    const errorMessage = await singUp.validationMessage.isVisible();

    if (errorMessage) {
        expect(errorMessage).toBe(false);
           
      } else {
       
        await expect(singUp.confirmSignUp).toBeEnabled(); 
      }
    
    
});


test('Verifying User Login With valid login',async ({page})=>{

    var singUp = new Login(page)
    await singUp.navigateTo()
    await singUp.loginButton.click()
    await singUp.userName.fill(dataSet.validEmail)
    await singUp.userPassword.fill(dataSet.validPassword, { delay: 100 })
    await singUp.signInButton.click()
    await page.waitForTimeout(3000)
    await page.screenshot({ path: 'validLogin.png' });
        
});

test('Verifying User Login With invalid login',async ({page})=>{

  var singUp = new Login(page)
  await singUp.navigateTo()
  await singUp.loginButton.click()
  await singUp.userName.fill(dataSet.invalidEmail)
  await singUp.userPassword.fill(dataSet.inValidPassword)
  await singUp.signInButton.click()
  await page.waitForTimeout(3000)
  await expect(singUp.validation).toBeVisible()
   
 
  
});