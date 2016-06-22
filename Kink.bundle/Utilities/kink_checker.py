import urllib, urllib2, HTMLParser, re, platform, sys, os.path, os
from datetime import datetime

KINK_ID_REGEX = "^[0-9]+"
KINK_BASE_SHOOT_RELATIVE_URL = "/?shoot/"
KINK_SHOOT_REGEX = KINK_BASE_SHOOT_RELATIVE_URL + '(' + KINK_ID_REGEX[1:] + ')'
KINK_BASE_LATEST_URL = "http://www.kink.com/channel/%s/latest/"
KINK_HEADERS = {"User-Agent" : "Plex Agent"}
KINK_DIR = "D:\\Media\\Porn\\Kink.com\\"
SITE_DIRS = []
RESULT_FILE_PATH = os.path.join(os.path.join(os.path.expanduser"~", "Desktop"), "kink_checker_results.md")

def GetLatestShootsPage(channel_name):
	site_url = KINK_BASE_LATEST_URL % channel_name
	
	request = urllib2.Request(site_url, headers=KINK_HEADERS)
	response = urllib2.urlopen(request)
	response = response.read()
	response = response.replace('\n', "")
	response = response.replace('\r', "")
	
	return response

def GetLatestShootIds(page):
	matches = re.findall(KINK_SHOOT_REGEX, page)
	if matches is not None:
		matches = list(set(matches))
		if len(matches) is 20:
			return matches
		else:
			return None
	
def GetExistingShootIds(dir):
	path = os.path.join(KINK_DIR, dir)
	ids = []
	
	for s in [x for x in os.listdir(path) if x.endswith(".mp4")]:
		match = re.search(KINK_ID_REGEX, s)
		if match is not None:
			ids.append(str(int(match.group(0))))
	
	ids = list(set(ids))
	if len(ids) > 0:
		return ids
	else:
		return None
	
def WriteError(error):
	message = []
	message.append(datetime.now().strftime("%Y.%m.%d@%H:%M:%S:%f"))
	message.append("==========================")
	message.append("Error Encountered")
	message.append("-----------------")
	message.append(error)
	
	file = open(RESULT_FILE_PATH, "a")
	for l in message:
		file.write(l + "\n")
	file.close()
	
def WriteResult(shoots):
	message = []
	message.append(datetime.now().strftime("%Y.%m.%d@%H:%M:%S:%f"))
	message.append("==========================")
	if len(shoots) > 1:
		message.append("New Shoots Found")
		message.append("----------------")
	else:
		message.append("New Shoot Found")
		message.append("---------------")
	for i in range(0, len(shoots)):
		shoots[i] = shoots[i] + '\n'
	message.append("".join(shoots))
	
	file = open(RESULT_FILE_PATH, "a")
	for l in message:
		file.write(l + "\n")
	file.close()
	
def GetSiteDirs():
	global SITE_DIRS
	
	f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "site_map.txt"), "r")
	SITE_DIRS = f.readlines()
	f.close()
	
	for i in range(0, len(SITE_DIRS)):
		SITE_DIRS[i] = SITE_DIRS[i].split('=')
		SITE_DIRS[i][0] = SITE_DIRS[i][0].strip()
		SITE_DIRS[i][1] = SITE_DIRS[i][1].strip()
	
def Main():
	GetSiteDirs()

	missing_shoots = []

	for site_dir in SITE_DIRS:
		print "Checking " + site_dir[0]
		
		latest_shoots_page = GetLatestShootsPage(site_dir[1])
		latest_shoot_ids = GetLatestShootIds(latest_shoots_page)
		if latest_shoot_ids is None:
			WriteError("Not enough IDs found for " + site_dir[0] + '.')
			continue
		existing_shoot_ids = GetExistingShootIds(site_dir[0])
		if existing_shoot_ids is None:
			WriteError("Existing shoot IDs not found for " + site_dir[0] + '.')
			continue
		
		for i in latest_shoot_ids:
			if i not in existing_shoot_ids:
				missing_shoots.append(site_dir[0] + "; ID: " + str(i))
	
	if len(missing_shoots) > 0:
		WriteResult(missing_shoots)

if __name__ == "__main__":
	Main()