from tavern.core import run
from glob import glob

for test in glob("*.yaml"): # used a for because map function seem to be imcompatible (see below)
	run(test)

# map(run, glob(".yaml")) print nothing
# print(*map(run, glob(".yaml"))) print some exit code at the end

# if you find how to use map efficiently send me a message