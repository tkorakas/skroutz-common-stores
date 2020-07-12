# Skroutz common stores

> A Chrome extension that finds all the common stores that sell the products you want on Skroutz.

## Installation

- Download and unzip the latest [release](https://github.com/tkorakas/skroutz-common-stores/releases/latest)
- Open Chrome and go to "chrome://extensions"
- Enable developer mode from the top right corner
- Load unpacked and browse the dist folder you unzipped on the first step

## How to use

- First you have to [intall](#installation) the extension
- Navigate to Skroutz and find a product you want to buy
- Click on the "Add product to list" button that added by the Skroutz common stores extension
- Find another product and click again the "Add product to list"
- All the common stores now have a blue border
- If you have already added product to list another button named "Show common stores" is available to show the common stores for the products on your list

## Setup

```
git clone https://github.com/tkorakas/skroutz-common-stores.git
npm install
```

## Build

```
npm run build
```

## Run watch mode on development

```
npm run watch
```

## Load extension to chrome

Load `dist` directory

## Test
`npm test`

## Release

Create a new tag with the prefix "v" for example `v1.0.0` and GitHub actions will generate a new release and will upload extension as artifact.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Roadmap

- [ ] Tests
- [ ] Show how many items are in the list
- [ ] Show which items are in the list and give the ability to delete them
- [ ] Implement using Neighbourhood (graph theory)
 