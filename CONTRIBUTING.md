# How to contribute to this project ?

## summary :

- [How to contribute to this project ?](#how-to-contribute-to-this-project-)
  - [summary :](#summary-)
  - [**Choose a issue :**](#choose-a-issue-)
  - [**Fork the project :**](#fork-the-project-)
  - [**Create your branch :**](#create-your-branch-)
  - [**Create an issue :**](#create-an-issue-)
  - [**Create a pull request :**](#create-a-pull-request-)
  - [**What are the requirement for proposing a pull request ?**](#what-are-the-requirement-for-proposing-a-pull-request-)
  
  - [**What are the requirement for proposing a pull request ?**](#what-are-the-requirement-for-proposing-a-pull-request-)

     * [Language programming convention](##There-are-the-convention-to-respect-for-each-programing-language) 
     * [Other important notes](##Other-important-notes)

## **Choose a issue :**

You must choose an [issue](https://github.com/mdl29/scratchy/issues) on [the project github](https://github.com/mdl29/scratchy). If you want to do something but no issue is created yet you must create one (try to tag it properly).

## **Fork the project :**

You need to fork [scratchy repository](https://github.com/mdl29/scratchy)

 * >ℹ️ [how to fork a github project ?](https://guides.github.com/activities/forking/)


## **Create your branch :**

 Create a new branch with the following name :
 `ISSUEID-title_of_issue`
  * **example :** `91-create_scratchy_service`

## **Create an issue :**

> ℹ️[Github issue guide](https://guides.github.com/features/issues/)

1. Choose a implicite title (max ~ 13 words),
    your title must be begin by a tag.
    > tags have same name of labels (Front,Back,Doc,Bug,Help...)   
    * **example :** `[Front] Create scratchy service that contains methods for backend requests access`
    ![example issue](doc/example/example-issue.png)
2. write a good description with much details as possible 

3. Assign your issue to yourself if you want to solve it or wait for someone to assign it

4. Add labels, for example in scratchy service issue (picture) we use frontend and enchancement labels.
**see all labels [here](https://github.com/mdl29/scratchy/labels) and their meaning**

4. Add your issue to a project the current one ([V1](https://github.com/mdl29/scratchy/projects/1)) if it is important or the next one if not
because in the future we will go over [V2](https://github.com/mdl29/scratchy/projects/2)
 
5. Add your issue to the current one milestone if it is important or the next one.
  

## **Create a pull request :**  

When you think your code is ready to be merged to the project create a pull request.

1. choose the title:
    when your pull request is ready link to an issue :

    * **example :**` Resolves #ISSUEID : title of the issue `

    If you want to make a pull request to add new features but you don't have an issue, you must be create an issue and in them explain what you want add,resolves...  Finally after you have resolved her you can push your pull request respecting issue and pull request template. 
 
2. make a great description :
    
    Please write a pull request description like this :
      ![example](./doc/example/example-description.png)
    The description must have
    the id of the issue resolved and a message who say what you add or do in your pull request.
    > ℹ️ [how to link a issue and use the keywords](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)(Fixes,resolves...)

    Add [labels](https://github.com/mdl29/scratchy/labels) (Frontend,Backend,documentation...), add to project your pull request(V1,V2) and milestone depending your issue.
    
* **Real Example :**   
   * if you want to solve #91 issue you should have named your pull request : `resolves #91 : Create a scratchy service` 
  ![example-issue](./doc/example/example_pr_title.png)

  * in description you must to link issue with `#91` and write a description of new features. Then add labels , project and milestone
    ![example-pull-request](./doc/example/example-pr.png)
if it's work in progress, set the [pull request status to draft](https://github.blog/2019-02-14-introducing-draft-pull-requests/)
After, set your pull request status to open, wait for a reviewer who approve your code. If the reviewer request change make them and request review again. To finish if the revewier approve your code, the code owner will squash and merge
your commits in pull request to main branch 


## **What are the requirement for proposing a pull request ?**

- ### **There are the convention to respect for each programing language**


    | Language | Convention                                            |
    | -------- | ----------------------------------------------------- |
    | Python   | [PEP8](https://pep8.org/)                             |
    | YAML     | [the linter](https://github.com/adrienverge/yamllint) |

- ### **Other important notes**

   * **comments :**
    Please comment your code in a clear way (we don't ask for a novel but someone who read your code must be able to tell what it does)
