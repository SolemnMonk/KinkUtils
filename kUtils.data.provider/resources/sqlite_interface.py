import sqlite3, sys, argparse, os.path, re

db = os.path.join(os.path.dirname(os.path.realpath(__file__)), "kUtils.sqlite")

def buildArgParser():
	parser = argparse.ArgumentParser(description="Handle SQLite commands for kUtils.")
	parser.add_argument("-b", "--build", action="store_true", dest="build", help="Build the initial database. If a database file exists, the -f option must be included for this to execute.")
	parser.add_argument("-f", "--force", action="store_true", dest="force", help="Force the chosen operations if possible.")
	parser.add_argument("-s", "--sql-file", action="store", dest="file", help="The path to the SQL file to read and execute.")
	parser.add_argument("-q", "--query", action="store", dest="query", help="The query to execute. This takes precedence over -s")
	return parser
	
def executeScript(cursor, file):
	build = open(file, "r")
	
	for line in build.readlines():
		if line.strip() is not "":
			cursor.execute(line)
	
	build.close()
	
def buildAnyway(force):
	return (not os.path.exists(db) or (force and os.path.exists(db)))
	
def build(args):
	if (os.path.exists(db)):
		connection = sqlite3.connect(db)
		cursor = connection.cursor()
		cursor.execute("SELECT name FROM sqlite_master WHERE type = 'table' AND name <> 'sqlite_sequence'")
		for row in cursor.fetchall():
			cursor.execute("DROP TABLE " + row[0])
		cursor.close()
		connection.close()
	
	connection = sqlite3.connect(db, isolation_level=None)
	cursor = connection.cursor()
	
	executeScript(cursor, args.file)
	connection.close()
	
def readResults(cursor):
	pattern = re.compile("([^\\\\])(['])")
	results = []
	
	for row in cursor:
		mutableRow = list(row)
		for i in range(0, len(mutableRow)):
			if isinstance(mutableRow[i], str):
				while pattern.search(mutableRow[i]):
					mutableRow[i] = pattern.sub("\\1\\\\\\2", mutableRow[i])
			else:
				mutableRow[i] = str(mutableRow[i])
			
		mutableRow = "'" + "','".join(mutableRow) + "'"
		mutableRow = mutableRow.replace("', '", "','")
		results.append(str(mutableRow))
		
	return results
	
def execute(args, connection):
	cursor = connection.cursor()
	if args.query is not None:
		cursor.execute(args.query)
	elif args.file is not None:
		executeScript(cursor, args.file)
		
	results = readResults(cursor)
	results = "|".join(results)
	
	return results
	
def main():
	parser = buildArgParser()
	args = parser.parse_args()
	if (args.build and buildAnyway(args.force)):
		build(args)
	else:
		connection = sqlite3.connect(db, isolation_level=None)
		results = execute(args, connection)
		sys.stdout.write(results)
		connection.close()
	
if __name__ == "__main__":
	main()
else:
	sys.exit(1)