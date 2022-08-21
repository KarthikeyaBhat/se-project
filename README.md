# Getting started

First install git on your system and setup ssh keys, to learn how to set up ssh keys [click here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

Go to the directory in which you want to clone this repo and use command:

> `git clone git@github.com:KarthikeyaBhat/se-project.git`

next use command:

> `cd se-project`

# Installing all dependencies

Make sure that you are in `se-project` directory and run this command:

> `npm install`

# Starting development

> `npm start`

Use the above command to start development server and start writing code for your component

**Few tips:**

-   Better put reusable components like cards, navbar,etc... in **src/components** directory
-   Put pictures,svgs,etc.. in `public` directory. Don't import pictures, just put them in public directory and use them without importing
-   If you style div tag directly it might affect div tag of other components too,so better use unique classes for styling your components
-   Try avoiding merge conflicts as much as possible

# Pushing code to the github

Run the following commands in root directory of the project.i.e.,ADG directory

Before pushing your code, make sure that your local repo is upto date with remote repository,just run these commands before you push everytime

Better run these two commands everytime before you start working

> `git fetch`

> `git pull origin main`

To push your changes run these commands:

> `git add .`

> `git commit -m "Commit message"`

> `git push -u origin main`

**Note:** Never ever do force push
