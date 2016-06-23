# Kink Utils #

## What Is This? ##

Kink Utils is my attempt at creating a set of tools to ease the gathering and organizing of 
everything I can download from any site in the Kink.com network. 

## Is This Safe? Is It Safe For Work? ##

It's safe unless you make it otherwise. That said, this project is not safe for work. There are no 
images, video, or any other media included in Kink Utils, but there is definitely NSFW text 
sprinkled throughout the code. This is a necessity. If Kink Utils were a movie, I'd give it an R 
rating...maybe an NC-17.

## What Do I Need To Run It? ##

Everything is written in Python 2.7.x. I would have chosen Python 3.x but this started as a Plex 
metadata agent and the Python interpretter that Plex uses is something in the 2.7.x branch.

## What's The License? ##

MIT. Have fun, people!

## What's Included? ##

I've got 3 tools included as of the initial commit:
* kink_util.py
* kink_checker.py
* \_\_init\_\_.py
* Miscellaneous files

### kink_util.py ###

kink_util.py is a self-contained utility to download metadata related to Kink.com shoots and save 
it out to a text file specifically for MP3Tag to read. The following is gathered and compiled:
* Title
* Release date
* Synopsis
* Actors
* Tags
* User rating
* Studio/site
* Cover image

It does this by looking at the first 1-5 characters of the filename and using that as a shoot ID. 
By default, Kink.com shoot filenames are, by default, always prepended by a numeric string which is 
their ID. Without this ID, kink_util.py can do nothing. The cover image is saved in the directory 
containing the shoot, and the filename is just the shoot ID padded with 0s to make the name 5 
characters. Each line in the text file is an entry for 1 file containing everything but the image data.

### kink_checker.py ###

kink_checker.py is meant to be run as a scheduled task. It checks to see if your library has all 
of the 20 newest the shoots for each site that you have saved. If it finds missing shoots then it 
outputs a markdown file to ~/Desktop notifying you of which sites have new shoots and the IDs of 
those shoots.

### \_\_init\_\_.py ###

__init__.py is currently the entirety of the Plex metadata agent and gathers all the same 
information as kink_util.py, then hands it off to Plex to keep your library nice and organized.

### Miscellaneous Files ###

* 3 out of date PDFs that are for Plex plugin development
* model_reference.txt to help catalogue models that don't actually have model pages on Kink.com
* site_map.txt to reference the properly formatted site names with their code-friendly names that 
are used in Kink.com's pages
*kink_site_javascript_2016.06.17.js which is a formatted copy of Kink.com's custom Javascript 
obtained on the date in the filename
* Info.plist to list and register the metadata agent with a Plex server
* Another copy of the aforementioned text files

## MP3Tag Info ##

MP3Tag is capable of applying metadata to MP4 files. It can handle other file types, too, but I'm 
only concerned with MP4 files. Here are the format strings I've written and where they're used.

`%_path%|%comment%|%album%|%title%|%TDAT%|%year%|%artist%|%TIT2%|%POPM%|%composer%|%albumartist%`
This is used when importing tag data from a text file into MP4 files.

`Kink.com\%album%\$cutLeft(%comment%,10) (%year%.$right(%TDAT%,2).$left(%TDAT%,2)) - %title%`
This is my preferred format string for renaming a file according to its tag. The format is 
something like `Kink.com\<site>\<ID> (<year>.<month>.<day>) - <title>.mp4` You can use absolute 
paths with this, too, for more precision.

`$cutLeft(%comment%,10).jpg`
This is for creating a custom MP3Tag action to import the covert image. "Import cover from file" 
and "Import cover as" should be "Front Cover." I recommend checking the box to delete any existing 
cover art.

## What's Next? ##

* Abstract out the Kink.com-specific code from the 2 files that use it
* Determine a better way to find and reference the text files needed in the code
* Properly and fully test the Plex agent
* Cache actor data as it's found to reduce network calls
* Automate the production of HTML from the markdown that kink_checker.py spits out
* Improve exception handling
