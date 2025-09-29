from unittest import TestCase, main
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# Settings for how testing runs
dontCloseBrowser = False  # if true then the browser is kept open after the tests are finished, otherwise it is closed
hideWindow = not (dontCloseBrowser)  # displays the browser while the tests are running


class testIndex(TestCase):
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
    # index.html
    def testCompanyName(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("DELIKAT", self.browser.page_source)

    def testOpeningHours(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("STÄNGT", self.browser.page_source)
        self.assertIn("Öppet", self.browser.page_source)
        self.assertIn("Måndag", self.browser.page_source)
        self.assertIn("12-18", self.browser.page_source)

    def testAddress(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("32H", self.browser.page_source)

    def testNavigation(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("Konsultation", self.browser.page_source)
    
    def testDropdownMenuLanguages(self):
        self.browser.get("http://localhost:8000/website/index.html")
        self.assertIn("Välkommen till Delikat Flora", self.browser.page_source)
        self.browser.find_element(By.CSS_SELECTOR, ".flagDropDown").click()
        self.browser.find_element(By.CSS_SELECTOR, "[alt='danish']").click()
        self.assertIn("Velkommen til Delikat", self.browser.page_source)
        try:
            self.browser.find_element(By.CSS_SELECTOR, ".dropDownLabel img").click()
        except:
            pass
        self.browser.find_element(By.LINK_TEXT, "Produkter").click()
        self.assertIn("Vis priser uden moms", self.browser.page_source)
        self.browser.find_element(By.CSS_SELECTOR, ".flagDropDown").click()
        self.browser.find_element(By.CSS_SELECTOR, "[alt='english']").click()
        self.assertIn("Show prices without VAT", self.browser.page_source)
        self.browser.find_element(By.CSS_SELECTOR, ".title").click()  
        self.assertIn("Welcome to Delikat", self.browser.page_source)


# this bit is here so that the tests run if the file is run as a regular python program
if __name__ == "__main__":
    main(verbosity=2)
