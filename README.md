# Blueprint Builder

This repo objective is to help you to build nodes and blueprints for flowbuild using an IDE instead of the flowbuild studio.

## Flowbuild Compatibility

The repo presumes you are using the flowbuild API version 2.0.1 and engine version 2.8.0.

## Environment Variables

In order to actually sync with yoor engine, you need to set your ```FLOWBUILD_URL``` in your .env file.

## Scripts



### PLOP Scripts

The repo uses PLOP scripts to help build diagram templates and node specs.

You can call ```npm run plop``` or just ````plop``` if you wish to install plop globally.

Available Templates
- blueprints
- node