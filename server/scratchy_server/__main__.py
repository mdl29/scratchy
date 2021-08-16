# -*- coding: utf-8 -*-
import sys
import os

from flask.cli import cli


# TODO: documentation
def main():
    os.environ['FLASK_APP'] = 'scratchy_server.app'
    os.environ['FLASK_ENV'] = 'development'
    os.environ['DEBUG_METRICS'] = "True" # Needed for prometheus to work. See : https://stackoverflow.com/a/66650309 
    sys.exit(cli.main(args=['run', '--host=0.0.0.0'], prog_name="python -m flask"))


if __name__ == '__main__':
    main()
