from tavern.core import run

run('.')


def pytest_tavern_beta_before_every_test_run(test_dict, variables):
    run("test_deleteAll.tavern.yaml")
