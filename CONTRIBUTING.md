# How to contribute to this project ?

1. First you must choose an issue on [the project github](https://github.com/mdl29/scratchy). If you want to do something but no issue is created yet you must create one (try to tag it properly).
2. Fork the project.
3. Create a new branch whith the following name format on your fork : `resolves #ISSUEID Component: title for features/fix`.

> Example : if you want to solve this issue (image below) you should have named your branch `resolvec #138 tool : kickstarter for yannis`.
> Component are : backend / frontend / tools / doc
> ![example issue](./doc/example_issue.png)

4. When you think your code is ready to be merged to the project create a pull request, your code will be review and then you will be able to merge it yourself if it's accepted.

# What are the requirement for proposing a pull request ?

## There are the convention to respect for each programing language

| Language | Convention                                            |
| -------- | ----------------------------------------------------- |
| Python   | [PEP8](https://pep8.org/)                             |
| YAML     | [the linter](https://github.com/adrienverge/yamllint) |

## Other important notes

Try to comment your code in a clear way (we don't ask for a novel but someone who read your code must be able to tell what it does)
