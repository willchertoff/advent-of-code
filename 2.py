import re
import numpy as np
import time
import datetime

with open('4.txt') as f:
    data = []
    data.extend(r.strip() for r in f.readlines())

def parseTime(s):
    t = re.search('\[(.*?)\]', s).group(1)
    return datetime.datetime.strptime(t, "%Y-%m-%d %H:%M")


def parseMinute(s):
    return int(re.search('(\:\d\d)', s).group(1).replace(':', ""))

sorted_data = sorted(data, key=parseTime)

records = {}
for r in sorted_data:
    if "Guard" in r:
        g = re.search('(\#\d+)', r).group(1).replace('#', "")
        records[g] = np.zeros(60)


current_guard = 0
current_minute = 0

for r in sorted_data:
    if "Guard" in r:
        current_guard = re.search('(\#\d+)', r).group(1).replace('#', "")
    if "falls asleep" in r:
        current_minute = parseMinute(r)
    if "wakes up" in r:
        new_minute = parseMinute(r)
        new_list = np.zeros(60)
        new_list[current_minute:new_minute] += 1
        lst = records[current_guard]
        records[current_guard] = np.add(new_list,lst)

def longestSlept(records):
    max_guard = 0
    current_max = 0
    for k,v in records.items():
        mx = np.sum(v)
        if mx > current_max:
            max_guard = k
            current_max = mx
    return max_guard

def mostLikelyMinute(records, guardID):
    return np.argmax(records[guardID])

def mostSleptMinute(records):
    g = 0
    mx = 0
    mi = 0 
    for k,v in records.items():
        m = np.amax(v)
        if m > mx:
            mx = m
            g = k
            mi = np.argmax(v)
    return mi*int(g)

g = longestSlept(records)
mlm = mostLikelyMinute(records,g)
print(g)
print(mlm)
print(int(g)*mlm)
print(mostSleptMinute(records))

