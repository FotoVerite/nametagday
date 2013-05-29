#!/usr/bin/python

import argparse, csv, collections

Location = collections.namedtuple('Location', "key name lat lng")
Member = collections.namedtuple('Member', "key first_name last_name email phone leader times location_key canceled referer_id")

def parse_locations(filename):
	result = {}
	with open(filename) as fd:
		reader = csv.reader(fd)
		for (key, name, d, d, d, d, d, d, lat, lng, d7, d, d, d) in reader:
			key = int(key)
			result[key] = Location(key, name, float(lat), float(lng))
	return result

def parse_members(filename):
	result = {}
	with open(filename) as fd:
		reader = csv.reader(fd)
		for (key, first_name, last_name, email, d, d, phone, leader, times, location_key, d, d, canceled, d, referer_id) in reader:
			key = int(key)
			times = [int(t.strip()) for t in times.replace("\\", "").split('-') if t.strip()]
			canceled = (canceled != '0')
			location_key = int(location_key)
			referer_id = int(referer_id) if referer_id != "\\N" else None
			leader = (leader != "0")
			if not leader:
				result[key] = Member(key, first_name, last_name, email, phone, leader, times, location_key, canceled, referer_id)
	return result

def go():
	parser = argparse.ArgumentParser()
	parser.add_argument('locations')
	parser.add_argument('members')
	parser.add_argument('--fixed-assignments')
	parser.add_argument('--out')
	args = parser.parse_args()

	locations = parse_locations(args.locations)
	members = parse_members(args.members)

	print "%d locations" % len(locations)
	print "%d members" % len(members)


if __name__ == "__main__":
	go()
