#!/usr/bin/env python
# coding: utf8

import Queue
import threading
from myDeezerApp import *
import urllib2
import time

def process_input(app):
    while app.connection.active or app.player.active:
#        search_term = urllib2.urlopen("http://localhost:3000/data").read().decode("utf-8")
        search_term = "pantera"
        app.process_search(search_term)
        while app.player.is_playing:
          time.sleep(3)

def log_connect_info(app):
    if app.debug_mode:
        print "---- Deezer NativeSDK version: {}".format(Connection.get_build_id())
        print "---- Application ID: {}".format(app.your_application_id)
        print "---- Product ID: {}".format(app.your_application_name)

def main():
    app = MyDeezerApp(True)
    log_connect_info(app)
    process_input(app)
    return 0


if __name__ == "__main__":
    main()
