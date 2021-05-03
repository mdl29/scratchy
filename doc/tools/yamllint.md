# yamllint

## install yamllint

 Install the dependencies and the package [here](../../server/README.md#how-to-run-package-version)

## how to play

 Run yamllint in a file
 Be careful the path directly after the -c is where is the config file of yamllint from the root directory you need to change it if you are in another directory
```sh
yamllint -c server/scratchy_server/config-yamllint.yaml path_to_file
```

Run yamllint in a directory
Be careful the path directly after the -c is where is the config file of yamllint from the root directory you need to change it if you are in another directory
```sh
yamllint -c server/scratchy_server/config-yamllint.yaml path_to_directory/.
```

 Check the meaning of the error [here](https://yamllint.readthedocs.io/en/stable/rules.html)

 And then change your files to respect yaml style guide