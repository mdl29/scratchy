from setuptools import setup, find_packages

# Merci Sam & Max : http://sametmax.com/creer-un-setup-py-et-mettre-sa-bibliotheque-python-en-ligne-sur-pypi/

setup(
    name='scratchy_server',
    version='0.0.1',
    packages=find_packages(),
    author="Projet LPH",
    author_email="lespetitshackers@mdl29.net",
    description="Scratchy Server",
    install_requires=[],
    # Active la prise en compte du fichier MANIFEST.in
    include_package_data=True,
    url='https://github.com/mdl29/scratchy',
    entry_points={
        'console_scripts': [
            'scratchy-server = scratchy_server.__main__:main']
    },
    scripts=[],

    license="GPL3",
)