import sys, os, os.path, re, subprocess, json
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile

SITE_DIRS = []
CREDENTIAL_STORE = []
CURRENT_CREDENTIALS = {}

def GetSiteDirs():
	global SITE_DIRS
	
	try:
		f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "site_map.txt"), "r")
		SITE_DIRS = f.readlines()
		f.close()
	except IOError as e:
		print "Could not find site_map.txt"
		sys.exit(1)
	
	for i in range(0, len(SITE_DIRS)):
		SITE_DIRS[i] = SITE_DIRS[i].split('=')
		SITE_DIRS[i][0] = SITE_DIRS[i][0].strip()
		SITE_DIRS[i][1] = SITE_DIRS[i][1].strip()

def GetCredentials():
	global CURRENT_CREDENTIALS
	global CREDENTIAL_STORE
	
	try:
		f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "users.json"), "r")
		contents = f.read()
		f.close()
	except IOError as e:
		print "Could not find users.json"
		sys.exit(1)
	
	CREDENTIAL_STORE = json.loads(contents)
	CURRENT_CREDENTIALS["username"] = CREDENTIAL_STORE["kink"]["accounts"]["all"]["username"]
	CURRENT_CREDENTIALS["password"] = CREDENTIAL_STORE["kink"]["accounts"]["all"]["password"]

def StudioLookUp(studio):
	for studio_map in SITE_DIRS:
		if studio == studio_map[1]:
			return studio_map[0]

def StripTagsAndDoubleSpaces(string):
	tag_regex = "<.+?>"
	string = re.sub(tag_regex, "", string)
	old = None
	new = string
	while old != new:
		old = new
		new = re.sub("  ", " ", string)
	return new

def FindAndDismissContentModal(browser):
	try:
		content_modal = browser.find_element_by_xpath("//form[@id='viewingPreferences']/button[1]")
		content_modal.click()
		WebDriverWait(browser, 30).until(ec.staleness_of(content_modal))
	except:
		print "Content modal not found. Continuing."
		
def Login(browser, url, site_name):
	try:
		browser.get("http://www.kink.com/login?returnUrl=" + url)
		FindAndDismissContentModal(browser)
		login_form = browser.find_element_by_xpath("//form[@id='login']")
		username_box = browser.find_element_by_xpath("//input[@type='text' and @id='usernameLogin']")
		password_box = browser.find_element_by_xpath("//input[@type='password' and @id='passwordLogin']")
		
		username_box.send_keys(CURRENT_CREDENTIALS["username"])
		password_box.send_keys(CURRENT_CREDENTIALS["password"])
		
		login_form.submit()
		WebDriverWait(browser, 30).until(ec.title_is("Latest " + site_name + " Shoots"))
	except:
		print "Login failed!"
		sys.exit(1)

def ShootsOnPage(browser):
	try:
		shoots_container = browser.find_element_by_xpath("//body/div[@class='container']/div[@class='shoot-list']")
		shoots = shoots_container.find_elements_by_xpath("//div[@class='shoot']")
		return shoots
	except:
		print "Could not find shoot list on page!"
		sys.exit(1)

def OpenTab(browser, url, title):
	try:
		browser.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 't') 
		browser.get(url)
		title = StripTagsAndDoubleSpaces(title)
		#print "Expected title: '" + title + " | Kink.com'"
		print "Page title: '" + browser.title + "'"
		WebDriverWait(browser, 30).until(ec.title_is(title.strip() + " | Kink.com"))
	except:
		print "Error opening tab!"
		sys.exit(1)

def QueueDownload(browser, download_location):
	try:
		member_panel = browser.find_element_by_xpath("//div[@class='member-content']/div[@class='full']")
		member_panel.click()
		file_link = member_panel.find_element_by_xpath("ul/li/a[text()='LARGE']")
		ActionChains(browser).context_click(file_link).perform()
	except:
		print "Exception encountered while finding download link!"
		return
	
	try:
		ahk_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "firefox_automation.exe")
		subprocess.call([ahk_path, "download", download_location], shell=False)
	except:
		print "Could not run AutoHotKey script!"

def CloseTab(browser, site_name):
	try:
		browser.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 'w') 
		WebDriverWait(browser, 30).until(ec.title_is("Latest " + site_name + " Shoots"))
	except:
		print "Exception while closing tab!"
		sys.exit(1)

def GoToNextPage(browser):
	try:
		next_page = browser.find_element_by_xpath("//body/div[@class='container']/div[@class='shoot-list']/a")
		return next_page
	except NoSuchElementException:
		print "No button found for next page, expecting this to be the last page."
		return None

def Logout(browser):
	try:
		browser.get("http://www.kink.com/logout")
	except:
		print "Could not log out. Oh well."
		sys.exit(1)

def Main():
	GetSiteDirs()
	GetCredentials()
	
	try:
		profile = FirefoxProfile("C:/Users/MrNakaan/AppData/Roaming/Mozilla/Firefox/Profiles/75txmt6e.Selenium/")
		sys.exit(0)
		browser = webdriver.Firefox(profile)
		browser.implicitly_wait(5)
	except:
		print "Exception while creating browser instance!"
		sys.exit(1)
	
	if sys.argv[1].startswith("channel="):
		channel_name = sys.argv[1][8:]
		site_name = StudioLookUp(channel_name)
		url = "http://kink.com/channel/" + channel_name + "/latest/"
	elif sys.argv[1].startswith("url="):
		url = sys.argv[1][4:]
		channel_name = re.search("channel/(.*?)/", url)
		if channel_name is not None:
			channel_name = channel.group(1)
			site_name = StudioLookUp(channel_name)
		else:
			print "Could not find channel name in url."
			sys.exit(0)
	else:
		print "Please specify either the 'url=<url>' or the 'channel=<channel>' option"
		sys.exit(0)
	print url
	print channel_name
	print site_name
	sys.exit(0)
	download_location = os.path.dirname(os.path.realpath(__file__))
	if sys.argv[2].startswith("download="):
		download_location = sys.argv[2][9:]
	
	Login(browser, url, site_name)
	
	ahk_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "firefox_automation.exe")
	shoots = ShootsOnPage(browser)
	shoot_count = 0
	while len(shoots) > 0:
		for shoot in shoots:
			shoot_count += 1
			try:
				title = shoot.get_attribute("data-title")
				href = shoot.find_element_by_xpath("a[1]").get_attribute("href")
			except:
				continue
			
			print "Now grabbing shoot " + str(shoot_count)
			OpenTab(browser, href, title)
			
			QueueDownload(browser, download_location)

			CloseTab(browser, site_name)

		try:
			next_page = GoToNextPage(browser)
			if next_page is None:
				subprocess.call([ahk_path, "monitor"], shell=False)
				print "Rip complete!"
				browser.close()
				sys.exit(0)
			else:
				browser.get(next_page.get_attribute("href"))
				WebDriverWait(browser, 30).until(ec.staleness_of(next_page))
			
				subprocess.call([ahk_path, "monitor"], shell=False)
		except:
			print "Exception while parsing data for next page!"
			sys.exit(1)
		
			shoots = ShootsOnPage(browser)
		
if (__name__ == "__main__") and len(sys.argv) > 1:
	Main()
else :
	print "Please run this script as its own process and specify either the 'url=<url>' or the 'channel=<channel>' option"
