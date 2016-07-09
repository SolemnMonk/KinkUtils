import urllib, urllib2, HTMLParser, re, platform, sys, os.path, os, markdown
from datetime import datetime

KINK_ID_REGEX = "^[0-9]+"
KINK_BASE_SHOOT_RELATIVE_URL = "/?shoot/"
KINK_SHOOT_REGEX = KINK_BASE_SHOOT_RELATIVE_URL + '(' + KINK_ID_REGEX[1:] + ')'
KINK_BASE_URL = "http://www.kink.com/channel/%s/latest/page/%s"
KINK_HEADERS = {"User-Agent" : "Plex Agent"}

SITE_DIRS = []

RESULT_FILE_PATH = os.path.join(os.path.join(os.path.expanduser("~"), "Desktop"), "kink_checker_results.htm")

ALL_SHOOTS_LOCAL_MESSAGE = "All shoots found for existing site directories!"
NEW_SHOOT_FOUND_MESSAGE = "New Shoot Found"
NEW_SHOOTS_FOUND_MESSAGE = "New Shoots Found"

def GetShootsPage(channel_name, page_num):
	if page_num > 0:
		site_url = KINK_BASE_URL % (channel_name, page_num)
	else:
		site_url = (KINK_BASE_URL % (channel_name, ""))[:-6]
		
	request = urllib2.Request(site_url, headers=KINK_HEADERS)
	response = urllib2.urlopen(request)
	response = response.read()
	response = response.replace('\n', "")
	response = response.replace('\r', "")
	
	return response

def GetShootIds(page):
	matches = re.findall(KINK_SHOOT_REGEX, page)
	if matches is not None:
		matches = list(set(matches))
		if len(matches) > 0:
			return matches
		else:
			return None
	
def GetExistingShootIds(path, dir):
	path = os.path.join(path, dir)
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
	
def WriteResult(result):
	message = []
	time = datetime.now().strftime("%Y.%m.%d@%H:%M:%S:%f")
	message.append(time + '\n')
	message.append(("=" * len(time)) + '\n')
	
	lines = []
	if result == ALL_SHOOTS_LOCAL_MESSAGE:
		message.append(result + '\n')
		message.append(('-' * len(ALL_SHOOTS_LOCAL_MESSAGE)) + '\n')
	elif len(result) is 1:
		message.append(NEW_SHOOT_FOUND_MESSAGE + '\n')
		message.append(("-" * len(NEW_SHOOT_FOUND_MESSAGE)) + '\n')
		result = result[0].split('|')
		message.append(result[0] + "\n\n* " + result[1] + '\n')
	else:
		message.append(NEW_SHOOTS_FOUND_MESSAGE + '\n')
		message.append(("-" * len(NEW_SHOOTS_FOUND_MESSAGE)) + '\n')
		current_site = ""
		for i in result:
			line = i.split('|')
			if line[0] != current_site:
				current_site = line[0]
				lines.append('\n' + current_site + "\n\n")
			link = line[1].split(' ')[1]
			link = '[' + link + "](http://www.kink.com/shoot/" + link + ')'
			lines.append('* ID: ' + link + '\n')
		message += lines
	
	message = "".join(message)
	message = markdown.markdown(message)
	if os.path.exists(RESULT_FILE_PATH):
		file = open(RESULT_FILE_PATH, "r")
		message += file.read()
		file.close()
	file = open(RESULT_FILE_PATH, "w")
	file.write(message + '\n')
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
	start = datetime.now()
	print "Run start: " + str(start)
	
	if len(sys.argv) is not 2:
		print "Invalid arguments!"
		sys.exit(0)
			
	path = sys.argv[1]
	
	if not os.path.isdir(path):
		print "Not a valid directory!"
		sys.exit(0)
	else:
		GetSiteDirs()

		missing_shoots = []
		
		for site_dir in SITE_DIRS:
			print "Checking " + site_dir[0]
			
			if not os.path.exists(os.path.join(path, site_dir[0])):
				print "Directory for " + site_dir[0] + " does not exist."
				continue
			existing_shoot_ids = GetExistingShootIds(path, site_dir[0])
			
			if existing_shoot_ids is None or len(existing_shoot_ids) is 0:
				WriteError("Existing shoot IDs not found for " + site_dir[0] + '.')
				continue
			
			found_remote = True
			shoot_ids = []
			
			while len(shoot_ids) % 20 is 0 and found_remote:
				page_num = (len(shoot_ids) / 20)
				latest_shoots_page = GetShootsPage(site_dir[1], page_num)
				latest_shoot_ids = GetShootIds(latest_shoots_page)

				if latest_shoot_ids is None or len(latest_shoot_ids) is 0:
					found_remote = False
					continue
				else:
					shoot_ids += latest_shoot_ids
			
			if len(shoot_ids) is 0:
				WriteError("No IDs found for " + site_dir[0] + '.')
				continue
			
			shoot_ids = list(set(shoot_ids))
			
			print "\tRemote shoot count: " + str(len(shoot_ids))
			print "\tLocal shoot count: " + str(len(existing_shoot_ids))
			if len(shoot_ids) == len(existing_shoot_ids):
				continue
			for i in shoot_ids:
				if i not in existing_shoot_ids:
					missing_shoots.append(site_dir[0] + "|ID: " + str(i))
		
	if len(missing_shoots) > 0:
		missing_shoots.sort()
		WriteResult(missing_shoots)
	else:
		WriteResult(ALL_SHOOTS_LOCAL_MESSAGE)
		
	end = datetime.now()
	print "Run start: " + str(start)
	print "Run end: " + str(end)
	print "Duration: " + str(end - start)

if __name__ == "__main__":
	Main()