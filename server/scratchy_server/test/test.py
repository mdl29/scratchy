from tavern.core import run
from glob import glob

for test in glob("test_*.yaml"):
	run(test)
