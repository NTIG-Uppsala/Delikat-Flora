from unittest import TestCase, main
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

# Settings for how testing runs
dontCloseBrowser = True  # if true then the browser is kept open after the tests are finished, otherwise it is closed
hideWindow = not (dontCloseBrowser)  # displays the browser while the tests are running


class testVAT(TestCase):
    # setUpClass is run BEFORE the FIRST test
    @classmethod
    def setUpClass(cls):
        chr_options = Options()

        if dontCloseBrowser:
            chr_options.add_experimental_option("detach", True)

        if hideWindow:
            chr_options.add_argument("--headless")

        # Wait for elements to appear at most 2 seconds before throwing an exception
        chr_options.timeouts = {"implicit": 2000}

        cls.browser = webdriver.Chrome(options=chr_options)

    # tearDownClass is run AFTER the LAST test
    @classmethod
    def tearDownClass(cls):
        pass  # Do nothing

    # setUp is run BEFORE EVERY TEST
    def setUp(self):
        self.browser.delete_all_cookies()  # clear cookies between test
        self.browser.get("about:blank")  # go to blank page to avoid influence from prior tests

    # tearDown is run AFTER EACH TEST
    def tearDown(self):
        pass  # Do nothing

    # HERE THE TESTS BEGINS
    # VATButton testing (products.html)
    def testVATbutton(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "#toggleVAT")
        self.browser.find_element(By.CSS_SELECTOR, ".priceTag")  # wait for prices to load
        VATbutton.click()
        self.assertIn("320", self.browser.page_source)

    def testVATbuttonTwice(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "#toggleVAT")
        self.browser.find_element(By.CSS_SELECTOR, ".priceTag")  # wait for prices to load
        VATbutton.click()
        VATbutton.click()
        self.assertIn("400", self.browser.page_source)
        self.assertNotIn("320", self.browser.page_source)

    def testVATRemember(self):
        self.browser.get("http://localhost:8000/website/products.html")
        VATbutton = self.browser.find_element(By.CSS_SELECTOR, "#toggleVAT")
        self.browser.find_element(By.CSS_SELECTOR, ".priceTag")  # wait for prices to load
        VATbutton.click()
        self.assertIn("320", self.browser.page_source)
        self.browser.refresh()
        self.browser.find_element(By.CSS_SELECTOR, ".priceTag")  # wait for prices to load
        self.assertIn("320", self.browser.page_source)


# this bit is here so that the tests run if the file is run as a regular python program
if __name__ == "__main__":
    main(verbosity=2)
