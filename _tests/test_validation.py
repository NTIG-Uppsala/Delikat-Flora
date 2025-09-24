from unittest import TestCase, main
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import os
import time

# Settings for how testing runs
dontCloseBrowser = False  # if true then the browser is kept open after the tests are finished, otherwise it is closed
hideWindow = not (dontCloseBrowser)  # displays the browser while the tests are running


class testValidation(TestCase):
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
    # CSS File
    def testValidation(self):
        fileList = os.listdir("website/")  # get a list of all files in the website folder
        pageList = []

        # filter for only html dokuments
        for file in fileList:
            if file.endswith(".html"):
                pageList.append(file)

        for page in pageList:
            # open w3 validator and find the file input and the submit button
            self.browser.get("https://validator.w3.org/nu/#file")
            fileInput = self.browser.find_element(By.CSS_SELECTOR, "[type='file']")
            fileSubmit = self.browser.find_element(By.ID, "submit")
            # upload the html file to validate and click the submit button.
            fileInput.send_keys(os.path.join(os.getcwd(), "website/", page))
            fileSubmit.click()
            time.sleep(0.05)
            results = self.browser.find_element(By.ID, "results")
            time.sleep(0.05)
            self.assertIn("No errors or warnings to show.", results.text, f"Fault in {page}. ")
            self.browser.get("about:blank")  # go to blank page to avoid influence from prior tests


# this bit is here so that the tests run if the file is run as a regular python program
if __name__ == "__main__":
    main(verbosity=2)
