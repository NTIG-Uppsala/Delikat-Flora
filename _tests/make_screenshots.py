from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import base64
import time

# Settings for how testing runs
dontCloseBrowser = False  # if true then the browser is kept open after the tests are finished, otherwise it is closed
hideWindow = not (dontCloseBrowser)  # displays the browser while the tests are running

chr_options = Options()

if dontCloseBrowser:
    chr_options.add_experimental_option("detach", True)

if hideWindow:
    chr_options.add_argument("--headless")


browser = webdriver.Chrome(options=chr_options)

# Make screenshots of all pages in various resolutions
resolutionList = [  # [width, height]
    [1920, 1080],
    [768, 1024],
    [2560, 1440],
    [3840, 2160],
]
fileList = os.listdir("website/")  # get a list of all files in the website folder
pageList = []

# filter for only html dokuments
for file in fileList:
    if file.endswith(".html"):
        pageList.append(file)

# loop through all pages and take a screenshot in every resolution in resolutionList
os.makedirs("_tests/screenshots", exist_ok=True)  # create a screenshot folder if it does not exist
for page in pageList:
    for resolution in resolutionList:
        browser.get("http://localhost:8000/website/" + page)
        browser.set_window_rect(0, 0, resolution[0], resolution[1])
        time.sleep(0.1)
        pageRect = browser.execute_cdp_cmd("Page.getLayoutMetrics", {})
        # configure settings to take a screenshot of the whole page
        screenshotConfig = {
            "captureBeyondViewport": True,
            "fromSurface": True,
            "clip": {
                "width": pageRect["contentSize"]["width"],
                "height": max(pageRect["contentSize"]["height"], resolution[1]),
                "x": 0,
                "y": 0,
                "scale": 1,
            },
        }
        base64png = browser.execute_cdp_cmd("Page.captureScreenshot", screenshotConfig)  # take the screenshot
        with open(f"_tests/screenshots/{page}_{resolution}.png", "wb") as img:
            img.write(base64.urlsafe_b64decode(base64png["data"]))  # save the screenshot as a png in the screenshot folder
