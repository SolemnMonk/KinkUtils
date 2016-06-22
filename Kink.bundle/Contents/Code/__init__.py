import urllib, urllib2, HTMLParser, re, platform, sys
from datetime import datetime

# Kink.com
AGENT_NAME = "Kink.com"
AGENT_LANGUAGES = [Locale.Language.English]
AGENT_PRIMARY_PROVIDER = True
AGENT_ACCEPTS_FROM = [ 'com.plexapp.agents.localmedia' ]
KINK_ID_REGEX = "^[0-9]+"
KINK_BASE_SHOOT_URL = "http://www.kink.com/shoot/%s"
KINK_BASE_MODEL_URL = "http://www.kink.com/model/%s"
KINK_BASE_RATING_URL = "http://www.kink.com/api/ratings/%s"
KINK_HEADERS = {"User-Agent" : "Plex Agent"}

ACTORS = []
SITE_DIRS = []

####################################################################################################
def Start():
	Log.Info("[" + AGENT_NAME + "] Starting Kink.com Agent")
	HTTP.CacheTime = CACHE_1WEEK
	pass
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

def StripTags(response):
	tag_regex = "<.*?>"
	return re.sub(tag_regex, "", response)

def PerformKinkSearch(shoot_id):
	data = {"id" : shoot_id}
	
	shoot_url = KINK_BASE_SHOOT_URL % shoot_id
	data["url"] = shoot_url
	
	#request = urllib2.Request(shoot_url, headers=KINK_HEADERS)
	#response = urllib2.urlopen(request)
	response = HTTP.Request(url=shoot_url, headers=KINK_HEADERS).content
	response_long = response
	response = response_long.replace('\n', "")
	response = response.replace('\r', "")
	
	data["title"] = PerformTitleSearch(response)
	data["date"] = PerformDateSearch(response)
	data["summary"] = PerformSummarySearch(response_long)
	data["actors"] = PerformActorSearch(response)
	data["tags"] = PerformTagSearch(response)
	data["rating"] = PerformRatingSearch(shoot_id)
	data["studio"] = PerformStudioSearch(response)
	data["cover"] = PerformCoverArtSearch(response)
	
	data["id"] = data["id"].zfill(5)
	
	return data
	
def PerformKinkUpdate(shoot_id):
	data = {"id" : shoot_id}
	
	shoot_url = KINK_BASE_SHOOT_URL % shoot_id
	data["url"] = shoot_url
	
	#request = urllib2.Request(shoot_url, headers=KINK_HEADERS)
	#response = urllib2.urlopen(request)
	response = HTTP.Request(url=shoot_url, headers=KINK_HEADERS).content
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
		title = title.replace("'S", "'s").replace("n'T", "n't").replace("'Re", "'re")
		title = StripTags(title)
		return title
	else:
		return ""
	
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
	
def PerformActorSearch(response):
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
	
	#request = urllib2.Request(rating_url, headers=KINK_HEADERS)
	#response = urllib2.urlopen(request)
	response = HTTP.Request(url=rating_url, headers=KINK_HEADERS).content
	#response = response.read()
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
		return "Foot Worship"
####################################################################################################
class KinkAgent(Agent.Movies):
	name = AGENT_NAME
	languages = AGENT_LANGUAGES
	primary_provider = AGENT_PRIMARY_PROVIDER
	accepts_from = AGENT_ACCEPTS_FROM
		
	def getSiteDirs(self):
		global SITE_DIRS
		
		#f = Resource.Load("site_map.txt").split('\n')
		SITE_DIRS = Resource.Load("site_map.txt").split('\n')
		#f.close()
		
		for i in range(0, len(SITE_DIRS)):
			SITE_DIRS[i] = SITE_DIRS[i].split('=')
			SITE_DIRS[i][0] = SITE_DIRS[i][0].strip()
			SITE_DIRS[i][1] = SITE_DIRS[i][1].strip()
		
	def getActors(self):
		global ACTORS
		
		#f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "model_reference.txt"), "r")
		ACTORS = Resource.Load("model_reference.txt").split('\n')
		#f.close()
		
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
		
	def work(self, filename):
		self.getSiteDirs()
		self.getActors()
		
		Log.Info("[Python] Python version: " + platform.python_version())
		
		name = urllib.unquote(filename).decode('utf8')
		Log.Info("[" + AGENT_NAME + "] File path = " + name)
		name = name.split("\\")
		name = name[len(name) - 1]
		Log.Info("[" + AGENT_NAME + "] File name = " + name)
		
		shoot_id = re.match(KINK_ID_REGEX, name)
		if shoot_id is not None:
			shoot_id = shoot_id.group(0)
			Log.Info("[" + AGENT_NAME + "] Shoot ID = " + shoot_id)
		
		data = PerformKinkSearch(shoot_id)
		
		Log.Info("[" + AGENT_NAME + "] Printing data for shoot id " + shoot_id)
		for d in sorted([x for x in data if x != "date" and x != "actors" and x != "tags"]):
			Log.Info("[" + AGENT_NAME + "]     " + d + ": " + str(data[d]))
		Log.Info("[" + AGENT_NAME + "]     date:")
		for d in sorted(data["date"]):
			Log.Info("[" + AGENT_NAME + "]         " + d + ": " + data["date"][d])
		Log.Info("[" + AGENT_NAME + "]     tags:")
		for d in sorted(data["tags"]):
			Log.Info("[" + AGENT_NAME + "]         " + d)
		for d in sorted(data["actors"]):
			Log.Info("[" + AGENT_NAME + "]     actor " + d + ':')
			for e in sorted(data["actors"][d]):
				Log.Info("[" + AGENT_NAME + "]         " + str(e) + ": " + str(data["actors"][d][e]))
				
		return data
				
	def convertMonth(self, month_name):
		if month_name == "January":
			return 1
		elif month_name == "February":
			return 2
		elif month_name == "March":
			return 3
		elif month_name == "April":
			return 4
		elif month_name == "May":
			return 5
		elif month_name == "June":
			return 6
		elif month_name == "July":
			return 7
		elif month_name == "August":
			return 8
		elif month_name == "September":
			return 9
		elif month_name == "October":
			return 10
		elif month_name == "November":
			return 11
		elif month_name == "December":
			return 12
		
	def search(self, results, media, lang, manual):
		data = self.work(media.filename)
		Log.Info("ID: " + data["id"])
		result_id = "kink.shoot." + data["id"]
		result_name = data["title"]
		result_year = data["date"]["year"]
		result_score = 100
		results.Append(MetadataSearchResult(id=result_id, name=result_name, year=result_year, score=result_score, lang=Locale.Language.English))
		return
	
	def update(self, metadata, media, lang, force):
		data = self.work(media.items[0].parts[0].file)
		
		metadata.id = str("kink.shoot." + data["id"])
		metadata.title = str(data["title"])
		metadata.summary = ("Shoot ID: " + data["id"] + "<br/><br/>" + data["summary"]).replace("<br/>", "\n")
		metadata.rating = float(data["rating"]) * 2
		date = data["date"]["year"] + '-' + str(data["date"]["month"]) + '-' + data["date"]["day"]
		metadata.originally_available_at = datetime.strptime(str(date), "%Y-%m-%d")
		metadata.year = int(data["date"]["year"])
		metadata.content_rating = "NC-17"
		metadata.studio = "Kink.com"
		metadata.collections.clear()
		metadata.genres.clear()
		metadata.collections.add(data["studio"])
		metadata.genres.add(data["studio"])
		for t in data["tags"]:
			#metadata.collections.add(t)
			metadata.genres.add(t)
		
		metadata.roles.clear()
		for a in data["actors"]:
			if data["actors"][a]["gender"] == "Male":
				continue
			Log.Info("[" + AGENT_NAME + "] Creating role for actor " + a)
			role = metadata.roles.new()
			role.name = data["actors"][a]["name"]
			Log.Info(role.name)
		Log.Info("[" + AGENT_NAME + "]" + str(len(metadata.roles)))
		Log.Info("[" + AGENT_NAME + "]" + str(metadata.roles))
		for i in metadata.roles:
			Log.Info("[" + AGENT_NAME + "]" + str(i))
			
		Log.Info(data["cover"])
		metadata.posters[data["cover"]] = Proxy.Media(HTTP.Request(data["cover"]).content)
		return
####################################################################################################