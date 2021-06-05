from tavern.core import run
from glob import glob

for test in glob("test_*.yaml"):
    run(test)


def pytest_tavern_beta_before_every_test_run(test_dict, variables):
    run("test_deleteAll.tavern.yaml")
