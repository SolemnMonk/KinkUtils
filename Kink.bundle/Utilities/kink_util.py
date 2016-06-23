import urllib, urllib2, HTMLParser, re, platform, sys, os.path, socket
from datetime import datetime
#from socket import error

# Kink.com
DEBUG = False
KINK_ID_REGEX = "^[0-9]+"
KINK_BASE_SHOOT_URL = "http://www.kink.com/shoot/%s"
KINK_BASE_MODEL_URL = "http://www.kink.com/model/%s"
KINK_BASE_RATING_URL = "http://www.kink.com/api/ratings/%s"
KINK_HEADERS = {"User-Agent" : "Kink Util"}

SITE_DIRS = []
ACTORS = []

missing_actors = {}

####################################################################################################
def PerformKinkSearch(shoot_id):
	data = {"id" : shoot_id}
	
	shoot_url = KINK_BASE_SHOOT_URL % shoot_id
	data["url"] = shoot_url
	
	request = None
	response = None
	try:
		request = urllib2.Request(shoot_url, headers=KINK_HEADERS)
		response = urllib2.urlopen(request)
	except urllib2.HTTPError as e:
		raise IOError("HTTPError while opening shoot page.\nError: " + str(e))
	except urllib2.URLError as e:
		raise IOError("URLError while opening shoot page.\nError: " + str(e))
	response_long = response.read()
	response = response_long.replace('\n', "")
	response = response.replace('\r', "")
	
	# Uncomment to spit out the HTML that's being worked with.
	#f = open(os.path.join(os.path.expanduser("~"), shoot_id + ".txt"), "w")
	#f.write(response_long)
	#f.close()
	
	stage = None
	try:
		stage = "title"
		data["title"] = PerformTitleSearch(response)
		stage = "date"
		data["date"] = PerformDateSearch(response)
		stage = "summary"
		data["summary"] = PerformSummarySearch(response_long)
		stage = "actors"
		data["actors"] = PerformActorSearch(response, shoot_id)
		stage = "tags"
		data["tags"] = PerformTagSearch(response)
		stage = "rating"
		data["rating"] = PerformRatingSearch(shoot_id)
		stage = "studio"
		data["studio"] = PerformStudioSearch(response)
		stage = "cover"
		data["cover"] = PerformCoverArtSearch(response)
	except re.error as e:
		raise IOError("Regular expression error raised in " + stage + " stage.\nError: " + str(e) + 
		"\n\nHTML:" + response)
	except urllib2.HTTPError as e:
		raise IOError("HTTPError raised during stage" + stage + ".\nError: " + str(e))
	except urllib2.URLError as e:
		raise IOError("URLError raised during stage" + stage + ".\nError: " + str(e))
		
	data["id"] = data["id"].zfill(5)
	
	return data
	
def PerformKinkUpdate(shoot_id):
	data = {"id" : shoot_id}
	
	shoot_url = KINK_BASE_SHOOT_URL % shoot_id
	data["url"] = shoot_url
	
	request = urllib2.Request(shoot_url, headers=KINK_HEADERS)
	response = urllib2.urlopen(request)
	response_long = response.read()
	response = response_long.replace('\n', "")
	response = response.replace('\r', "")
	
	data["rating"] = PerformRatingSearch(shoot_id)
	data["cover"] = PerformCoverArtSearch(response)
	
	data["id"] = data["id"].zfill(5)
	
	return data
	
def PerformTitleSearch(response):
	# Title is contained in a <h1> with the class "shoot-title"
	title_regex = "<h1 class=\"shoot-title\">(.*?)</h1>"
	match = re.search(title_regex, response)
	if match is not None:
		title = match.group(1).title().strip()
		title = title.replace("'S", "'s")
		title = title.replace("n'T", "n't")
		title = title.replace("'Re", "'re")
		return StripTags(title)
	else:
		return ""
	
def StripTags(string):
	tag_regex = "<.+?>"
	return re.sub(tag_regex, "", string)
	
def PerformDateSearch(response):
	# Date is contained in a MMMM DD, YYYY format wrapped in a <p> tag; MMMM is the full month name
	date = {}
	date["month"] = ""
	date["day"] = ""
	date["year"] = ""
	
	date_regex = "<p>date: (January|February|March|April|May|June|July|August|September|October|November|December) ([0-9]{1,2}), ([0-9]{4})</p>"
	match = re.search(date_regex, response)
	if match is not None:
		date["month"] = ConvertMonth(match.group(1).title().strip())
		date["day"] = match.group(2).strip()
		date["year"] = match.group(3).strip()
		if len(date["month"]) is 1:
			date["month"] = "0" + date["month"]
		if len(date["day"]) is 1:
			date["day"] = "0" + date["day"]
	return date
	
def PerformSummarySearch(response):
	# Summary is contained in a <div> with the class "description"
	summary_regex = "<div class=\"description\">(?!.*Single Shoot Includes.*)(.*?)</div>"
	match = re.search(summary_regex, response, flags=re.M|re.DOTALL)
	if match is not None:
		summary = match.group(1).strip()
		summary = summary.replace("\n", "")
		summary = summary.replace("\r", "")
		summary_break_regex = "<br.*?/>"
		summary = re.sub(summary_break_regex, "<br/>", summary)
		return summary
	else: 
		return ""
	
def PerformActorSearch(response, shoot_id):
	# Actors are contained in a <span> with the class "names"
	actors_regex = "<span class=\"names\">(.+?)</span></p>"
	match = re.search(actors_regex, response)
	if match is None:
		return {}
	else:
		actors_raw = match.group(1).strip()
		actors_raw = actors_raw.replace("<span>,&nbsp;</span>", '|')
		actors_raw = actors_raw.replace("</a>", "")
		actors_raw = actors_raw.replace("<a href=\"/model/", "")
		actors_raw = actors_raw.replace("\">", "`")
		
		actors = {}
		
		for a in actors_raw.split('|'):
			actor_id = a.split('`')[0]
			actors[actor_id] = PerformActorDetailSearch(actor_id)
			if actors[actor_id]["found_online"] == "false" and actors[actor_id]["found_locally"] == "false":
				actors[actor_id]["name"] = a.split('`')[1]
				missing_actors[actor_id] = {}
				missing_actors[actor_id]["name"] = actors[actor_id]["name"]
				missing_actors[actor_id]["id"] = actor_id
				missing_actors[actor_id]["shoot"] = shoot_id
			actors[actor_id]["id"] = actor_id
		
	return actors

def PerformActorDetailSearch(actor_id):
	global ACTORS

	actor = {"id" : actor_id}
	
	for local_actor in ACTORS:
		if local_actor["id"] == actor_id:
			actor["gender"] = local_actor["gender"]
			actor["name"] = local_actor["name"]
			actor["weight"] = local_actor["weight"]
			actor["found_locally"] = "true"
			actor["found_online"] = "false"
			return actor
	
	actor_url = KINK_BASE_MODEL_URL % actor_id
	
	request = urllib2.Request(actor_url, headers=KINK_HEADERS)
	response = urllib2.urlopen(request)
	response = response.read()
	response = response.replace('\n', "")
	response = response.replace('\r', "")
	
	cant_find_model_regex = "Oops, we can't find the model you're looking for at the moment. Please try again later!"
	match = re.search(cant_find_model_regex, response)
	if match is not None:
		actor["found_online"] = "false"
		actor["found_locally"] = "false"
		actor["gender"] = "Unknown"
		actor["name"] = "Unknown"
		actor["weight"] = 0
		
		return actor
	else:
		actor["found_online"] = "true"
		actor["found_locally"] = "unknown"
	
	# Name is contained in a <h1> with the class "page-title"
	name_regex = "<h1 class=\"page-title\">(.+?)</h1>"
	match = re.search(name_regex, response)
	if match is not None:
		actor["name"] = match.group(1).strip()
	else:
		actor["name"] = ""
	
	# Gender is contained in a <td> with a <td> before it containing "Gender:"
	gender_regex = "<tr><td>Gender:</td><td>(.+?)</td></tr>"
	match = re.search(gender_regex, response)
	if match is not None:
		actor["gender"] = match.group(1).title().strip()
	else:
		actor["gender"] = "Unknown"

	actor["weight"] = 1
		
	return actor

def PerformTagSearch(response):
	tags_regex = "<p class=\"starring\">.*?tags:(.*?)</p>"
	match = re.search(tags_regex, response)
	if match is None:
		return []
	else:
		tags_raw = match.group(1).strip()
		tags_raw = tags_raw.replace("<span>,</span>", "")
		tags_raw = tags_raw.replace("</a>", "")
		tags_raw = re.sub("<a href=\".*?>", '|', tags_raw)
		tag_list = tags_raw.split('|')
		tag_list = [x.strip().title() for x in tag_list if x.strip() != ""]
		return tag_list
		
def PerformRatingSearch(shoot_id):
	# Rating is contained in the "data-rating" attribute of a <div>
	rating = 0

	rating_url = KINK_BASE_RATING_URL % shoot_id
	
	request = urllib2.Request(rating_url, headers=KINK_HEADERS)
	response = urllib2.urlopen(request)
	response = response.read()
	response = response.replace('\n', "")
	response = response.replace('\r', "")
	
	#"avgRating":"4.3067"
	rating_regex = "\"avgRating\":\"([.0-9]*)\","
	match = re.search(rating_regex, response)
	rating = 0.0
	if match is not None:
		rating = match.group(1).strip()
		rating = float(rating) if rating is not "" else 0.0
	
	rating = str(rating)
	decimal_location = rating.index('.')
	if len(rating[decimal_location + 1:]) > 2:
		rating = rating[:decimal_location] + '.' + rating[decimal_location + 1:decimal_location + 3]
	elif len(rating[decimal_location + 1:]) < 2:
		while len(rating[decimal_location + 1:]) < 2:
			rating += '0'
	
	rating = str(rating)
	
	return rating
	
def PerformStudioSearch(response):
	studio_regex = "<a .*?class=\"subsite-logo (.+?)\".*?></a>"
	match = re.search(studio_regex, response)
	if match is not None:
		return StudioLookUp(match.group(1).strip().lower())
	else:
		return ""
	
def PerformCoverArtSearch(response):
	cover_regex = "https?://(content|cdnp)\\.kink\\.com/imagedb/(.+?)\\.jpg"
	match = re.search(cover_regex, response)
	if match is not None:
		return match.group(0)
	else:
		return ""
	
def StudioLookUp(studio):
	for studio_map in SITE_DIRS:
		if studio == studio_map[1]:
			return studio_map[0]
	
####################################################################################################
def ConvertMonth(month_name):
	if month_name == "January":
		return "01"
	elif month_name == "February":
		return "02"
	elif month_name == "March":
		return "03"
	elif month_name == "April":
		return "04"
	elif month_name == "May":
		return "05"
	elif month_name == "June":
		return "06"
	elif month_name == "July":
		return "07"
	elif month_name == "August":
		return "08"
	elif month_name == "September":
		return "09"
	elif month_name == "October":
		return "10"
	elif month_name == "November":
		return "11"
	elif month_name == "December":
		return "12"

def GetSiteDirs():
	global SITE_DIRS
	
	f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "site_map.txt"), "r")
	SITE_DIRS = f.readlines()
	f.close()
	
	for i in range(0, len(SITE_DIRS)):
		SITE_DIRS[i] = SITE_DIRS[i].split('=')
		SITE_DIRS[i][0] = SITE_DIRS[i][0].strip()
		SITE_DIRS[i][1] = SITE_DIRS[i][1].strip()

def GetActors():
	global ACTORS
	
	f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "model_reference.txt"), "r")
	ACTORS = f.readlines()
	f.close()
	
	for i in range(0, len(ACTORS)):
		ACTORS[i] = ACTORS[i].split('|')
		tmp_dict = {}
		for j in range(0, len(ACTORS[i])):
			tmp_dict[ACTORS[i][j].split('=')[0].strip()] = ACTORS[i][j].split('=')[1].strip()
		ACTORS[i] = tmp_dict
		
		if "weight" in ACTORS[i]:
			ACTORS[i]["weight"] = int(ACTORS[i]["weight"])
		else:
			ACTORS[i]["weight"] = 1
			
	women = [ACTORS[x] for x in range(0, len(ACTORS)) if ACTORS[x]["gender"] == "Female"]
	women.sort(key=lambda a:a["weight"])
	women = women[::-1]

def Main():
	start = datetime.now()
	print "Run start: " + str(start)
	path = sys.argv[1]
	if not os.path.isdir(path):
		print "Not a valid directory!"
		sys.exit(0)
	else:
		if len(sys.argv) is 3:
			mode = sys.argv[2]
		else:
			mode = "full"
		if mode != "update" and mode != "full":
			mode = "full"
			
		GetSiteDirs()
		GetActors()
			
		site_path_list = []
		if path.endswith("Kink.com") or path.endswith("Kink.com/"):
			print ""
			print "Given Kink.com top-level directory!"
			print "This script will spider through all immediate children!"
			for s in os.listdir(path):
				site_path_list.append(os.path.join(path, s))
		else:
			site_path_list.append(path)
		
		for s in sorted([x for x in site_path_list if os.path.isdir(x)]):
			print ""
			print "Now scanning " + os.path.split(s)[1]
			print ""
			files = os.listdir(s)
			id_regex = re.compile(KINK_ID_REGEX)
			lines = []
			counter = 0
			mp4set = [x for x in files if x.endswith(".mp4")]
			for f in mp4set:
				counter += 1
				match = id_regex.match(f)
				if match is not None:
					id = str(int(match.group(0)))
					got_data = False
					got_cover = False
					while not got_data and not got_cover:
						try:
							if not got_data:
								print "Getting data for " + os.path.basename(f) + " (" + str(counter) + "/" + str(len(mp4set)) + ")"
								if mode == "full":
									shoot_data = PerformKinkSearch(id)
								elif mode == "update":
									shoot_data = PerformKinkUpdate(id)
								got_data = True
							if not got_cover:
								print "Getting cover for " + os.path.basename(f) + " (" + str(counter) + "/" + str(len(mp4set)) + ")"
								DownloadCover(id, s, shoot_data["cover"])
								got_cover = True
						except socket.error:
							continue
					AddLine(shoot_data, s, f, lines, mode)
					if DEBUG:
						for d in sorted(shoot_data):
							print "\t" + d + ": " + str(shoot_data[d])
			WriteToFile(lines, s, mode)
		
		if len(missing_actors) != 0:
			print ""
			print "The following actors could not be found:"
			for a in missing_actors:
				print "    ID: " + a
				print "    Name: " + missing_actors[a]["name"]
				print "    Shoot ID: " + missing_actors[a]["shoot"]
				print ""

	end = datetime.now()
	print "Run end: " + str(end)
	print "Duration: " + str(end - start)
	
def DownloadCover(id, path, url):
	id = id.zfill(5)
	urllib.urlretrieve(url, os.path.join(path, id + url[-4:]))
		
def AddLine(shoot_data, path, file_path, lines, mode):
	line = []
	
	line.append(os.path.join(path, file_path))
	line.append("Shoot ID: " + shoot_data["id"])
	if mode == "full":
		line.append(shoot_data["studio"])
		line.append(shoot_data["title"])
		line.append(shoot_data["date"]["day"] + shoot_data["date"]["month"])
		line.append(shoot_data["date"]["year"])
		
		women = [shoot_data["actors"][x] for x in shoot_data["actors"] if shoot_data["actors"][x]["gender"] == "Female"]
		men = [shoot_data["actors"][x] for x in shoot_data["actors"] if shoot_data["actors"][x]["gender"] == "Male"]
		other = [shoot_data["actors"][x] for x in shoot_data["actors"] if shoot_data["actors"][x]["gender"] != "Male" and shoot_data["actors"][x]["gender"] != "Female"]
		women.sort(key=lambda a:a["weight"])
		men.sort(key=lambda a:a["name"])
		other.sort(key=lambda a:a["name"])
		women = women[::-1]
		line.append('/'.join([x["name"] for x in (women + other + men)]))
		#line.append('/'.join([shoot_data["actors"][x]["name"] for x in shoot_data["actors"]]))
		
		line.append(PrepareComment(shoot_data))
		line.append(str(int(float(shoot_data["rating"]) / 5 * 255)))
		line.append("Kink.com")
		line.append("Kink.com")
	elif mode == "update":
		line.append(str(int(float(shoot_data["rating"]) / 5 * 255)))
		
	lines.append('|'.join(line) + "\n")

def WriteToFile(lines, path, mode):
	if mode == "full":
		f = open(os.path.join(path, "tags.txt"), "w")
	elif mode == "update":
		f = open(os.path.join(path, "updates.txt"), "w")
	f.writelines(lines)
	f.close()

def PrepareComment(shoot_data):
	comment = "";
	comment += "Site: " + shoot_data["studio"] + "<br/><br/>"
	comment += "Shoot ID: " + shoot_data["id"] + "<br/><br/>"
	comment += "Title: " + shoot_data["title"] + "<br/><br/>"
	comment += "Performers: " + ', '.join([shoot_data["actors"][x]["name"] for x in shoot_data["actors"]]) + "<br/><br/>"
	comment += "Date: " + shoot_data["date"]["year"] + '.' + shoot_data["date"]["month"] + '.' + shoot_data["date"]["day"] + "<br/><br/>"
	comment += "Rating: " + shoot_data["rating"] + "<br/><br/>"
	comment += "Tags: " + ", ".join(shoot_data["tags"]) + "<br/><br/>"
	comment += "Synopsis: " + shoot_data["summary"]
	return comment
	
if __name__ == "__main__" and len(sys.argv) > 1:
	Main()