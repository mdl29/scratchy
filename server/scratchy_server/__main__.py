# -*- coding: utf-8 -*-
import sys
import os

from flask.cli import cli


# TODO: documentation
def main():
    os.environ['FLASK_APP'] = 'scratchy_server.app'
    os.environ['FLASK_ENV'] = 'development'
    sys.exit(cli.main(args=['run'], prog_name="python -m flask"))


if __name__ == '__main__':
    main()
