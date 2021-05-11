from tavern.core import run
from glob import glob

for test in glob("*.yaml"):
	if test != "global.yaml":
		run(test)
