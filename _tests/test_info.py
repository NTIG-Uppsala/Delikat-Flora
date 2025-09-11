from unittest import TestCase, main
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

from os import path, getcwd



class TestWebsite(TestCase):

    # Settings for how testing runs
    dontclosebrowser = True  # if true then the browser is kept open after the tests are finished, otherwise it is closed
    hidewindow = False  # displays the browser while the tests are running

    # setUpClass is run BEFORE the FIRST test
    @classmethod
    def setUpClass(cls):
        chr_options = Options()

        if cls.dontclosebrowser:
            chr_options.add_experimental_option("detach", True)

        if cls.hidewindow:
            chr_options.add_argument("--headless")

        cls.browser = webdriver.Chrome(options=chr_options)

    # tearDownClass is run AFTER the LAST test
    @classmethod
    def tearDownClass(cls):
        pass  # Do nothing

    # setUp is run BEFORE EVERY TEST
    def setUp(self):
        pass  # Do nothing

    # tearDown is run AFTER EACH TEST
    def tearDown(self):
        self.browser.get('about:blank')  # go to a blank page to avoid previous tests affecting later ones


    # HERE THE TESTS BEGINS
    # index.html
    def testPageText(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("DELIKAT", self.browser.page_source)
    
    def testPageText2(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("STÄNGT", self.browser.page_source)
        
    def testPageText3(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("32H", self.browser.page_source)
    
    def testPageText4(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("Öppet", self.browser.page_source)
        
    def testPageText5(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("Måndag", self.browser.page_source)
        
    def testPageText6(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("12-18", self.browser.page_source)

    def testPageText7(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("Konsultation", self.browser.page_source)
    
    # VATButton testing (products.html)
    def testVATbutton(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "input#toggleVAT")
        VATbutton.click()
        self.assertIn("320", self.browser.page_source)

    def testVATbuttonTwice(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "#toggleVAT")
        VATbutton.click()
        VATbutton.click()
        self.assertIn("400", self.browser.page_source)
        self.assertNotIn("320", self.browser.page_source)
        
    def testVATbutton201(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "#toggleVAT")
        for i in range(201):
            VATbutton.click()
        self.assertIn("320", self.browser.page_source)
        
    def testVATbutton200(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "#toggleVAT")
        for i in range(200):
            VATbutton.click()
        self.assertIn("400", self.browser.page_source)
        self.assertNotIn("320", self.browser.page_source)
        
    def testVATRemember(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "#toggleVAT")
        VATbutton.click()
        self.assertIn("320", self.browser.page_source)
        self.browser.get("http://localhost:8000/website/index.html")
        self.browser.get("http://localhost:8000/website/products.html")
        time.sleep(1)
        self.assertIn("320", self.browser.page_source)
        
    def testPostalCodeCorrect(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("981 38")        
        confirmButton.click()
        time.sleep(1)
        self.assertIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är 39 kr", self.browser.page_source)
        self.assertNotIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)

    def testPostalCodeNotCorrect(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("989 31")
        confirmButton.click()
        time.sleep(1)
        self.assertIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)

    def testPostalCodeCorrectWithoutSpace(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("98138")
        confirmButton.click()
        time.sleep(1)
        self.assertIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är 39 kr", self.browser.page_source)
        self.assertNotIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)

    def testPostalCodeNonValid(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("aidwjdopawjdpoawjdpojwapdjw")
        confirmButton.click()
        time.sleep(1)
        self.assertIn("Detta är inte ett giltigt postnummer. Försök igen", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)

    def testPostalCodeIncorrectThenCorrect(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("99999")
        confirmButton.click()
        time.sleep(1)
        self.assertIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)
        inputBox.send_keys("981 39")
        confirmButton.click()
        time.sleep(1)
        self.assertIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är 19 kr", self.browser.page_source)
        self.assertNotIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)

    def testPostalCodeNoInput(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        confirmButton.click()
        time.sleep(1)
        self.assertIn("Skriv in ett postnummer i rutan", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)

    # CSS File
    def testCSSText(self):
        self.browser.get("http://localhost:8000/website/style.css")
        self.assertIn("Swirl", self.browser.page_source)




# this bit is here so that the tests run if the file is run as a regular python program
if __name__ == '__main__':
    main(verbosity=2)
