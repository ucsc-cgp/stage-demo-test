# stage-demo-test
Contains end-to-end and integration tests for CGP's core demos

## Set-up
This repository uses Cypress.io for end-to-end testing. To run it you need the following JavaScript tools on your system:
* Node Version Manager (nvm, we use version 0.33.11)
* Node.js (we use version 8.14.0)
* Node package manager [_npm_](https://www.npmjs.com/) (we use version 6.4.1)

If you need to install them and you use Ubuntu 18, [this](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/) link has instructions to install all of the above. Next navigate to [Cypress.io](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements) and follow the installation instructions for your system. The file `cypress.json` contains settings. It currently only has an entry for the Dockstore homepage. Cypress runs best with Chrome.

## End-to-end testing using Cypress

Clone this repository, `cd` into it, and start the Cypress server by executing
```bash
node_modules/.bin/cypress open
```
This opens a window which has a tab labeled `</> Tests`. In there you find all tests. Double-clicking one of the listed tests will launch them in a separate Cypress browser window. We have used the inspect function in the Cypress browser to inspect DOMs in detail.

