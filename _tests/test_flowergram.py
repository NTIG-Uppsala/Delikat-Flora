from unittest import TestCase, main
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By


# Settings for how testing runs
dontCloseBrowser = False  # if true then the browser is kept open after the tests are finished, otherwise it is closed
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
    def testPostalCodeCorrect(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("981 38")
        confirmButton.click()
        self.assertIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är 39 kr", self.browser.page_source)
        self.assertNotIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)

    def testPostalCodeNotCorrect(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("989 31")
        confirmButton.click()
        self.assertIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)

    def testPostalCodeCorrectWithoutSpace(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("98138")
        confirmButton.click()
        self.assertIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är 39 kr", self.browser.page_source)
        self.assertNotIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)

    def testPostalCodeNonValid(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.send_keys("aidwjdopawjdpoawjdpojwapdjw")
        confirmButton.click()
        self.assertIn("Detta är inte ett giltigt postnummer. Försök igen", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)

    def testPostalCodeIncorrectThenCorrect(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        inputBox = self.browser.find_element(By.CSS_SELECTOR, ".postalCodeInput")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        inputBox.clear()
        inputBox.send_keys("99999")
        confirmButton.click()
        self.assertIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)
        inputBox.clear()
        inputBox.send_keys("981 39")
        confirmButton.click()
        self.assertIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är 19 kr", self.browser.page_source)
        self.assertNotIn("Tyvärr, vi levererar inte till detta postnummer", self.browser.page_source)

    def testPostalCodeNoInput(self):
        self.browser.get("http://localhost:8000/website/flowergram.html")
        confirmButton = self.browser.find_element(By.CSS_SELECTOR, ".confirmButton")
        confirmButton.click()
        self.assertIn("Skriv in ett postnummer i rutan", self.browser.page_source)
        self.assertNotIn("Ja, detta postnummer kan vi leverera till! Priset för din leverans är", self.browser.page_source)


# this bit is here so that the tests run if the file is run as a regular python program
if __name__ == "__main__":
    main(verbosity=2)
