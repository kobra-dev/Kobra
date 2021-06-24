<div align="center">


<h1> Kobra</h1>
<img src="./.github/logo.svg" alt="drawing" width="100"/>

**A visual programming language (like Scratch) for Machine Learning**


[![Build Status - Cirrus][]][Build status] [![Twitter handle][]][Twitter badge] [![Discord Chat](https://img.shields.io/discord/755660905173483641?logo=discord&style=social)](https://discord.gg/9aaqVWDtJw)



</div>

## Getting started

To get started, go to [Kobra Studio](https://studio.kobra.dev/editor).

More in-depth info can be found on [our website](https://kobra.dev/) and in the [documentation](https://docs.kobra.dev/).


### Development

##### Local Environment Setup:
1. `git clone https://github.com/kobra-dev/Kobra`
2. `cd Kobra/`
3. `yarn`
4. `yarn dev`

##### Environment variables
All environment variables should go in a `.env.local` file at the root of the project directory.
- `NEXT_PUBLIC_GQL_URI`: URL to GraphQL API (see the [API repository](https://github.com/kobra-dev/API))
- Firebase details:
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase project domain (like `kobra1.firebaseapp.com`)
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: like `kobra1`
- `NEXT_PUBLIC_APP_HOSTED_URL`: URL that the app is being hosted at (used to generate the URL to copy to your clipboard when you click share)

##### GraphQL codegen
We use [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) to generate types and functions for our GraphQL API. To run the tool, use `yarn gql-codegen`. By default this uses our instance of the API but you can change it in the `codegen.yml` file.

##### Other repositories
 - [`API`](https://github.com/kobra-dev/API): GraphQL API
 - [`docs`](https://github.com/kobra-dev/docs): Our documentation site
 - [`kobra.dev`](https://github.com/kobra-dev/kobra.dev): Our landing page
 - [`branding`](https://github.com/kobra-dev/branding): Various assets related to Kobra
 - [`datasets-api`](https://github.com/kobra-dev/datasets-api): Work-in-progress API for storing datasets
 - [`react-console`](https://github.com/kobra-dev/react-console): Our fork of `react-console` with some slight modifications and updated packages
 - [`react-firebase-auth-hooks`](https://github.com/kobra-dev/react-firebase-auth-hooks): Our fork of `react-firebase-hooks` to remove all of the hooks except 
 - [`better-react-spreadsheet`](https://github.com/kobra-dev/better-react-spreadsheet): A better spreadsheet widget for React 
 - [`.github`](https://github.com/kobra-dev/.github): Default files for `kobra-dev` repositories (like code of conduct, license, etc)

## Contributing

We appreciate your help!
Before contributing read our [guidelines](https://github.com/kobra-dev/Kobra/blob/dev/CONTRIBUTING.md)


[Build Status - Cirrus]: https://github.com/kobra-dev/Kobra/actions/workflows/ci.yml/badge.svg?branch=dev&event=push
[Build status]: https://github.com/kobra-dev/Kobra/actions
[Twitter badge]: https://twitter.com/intent/follow?screen_name=kobra_dev
[Twitter handle]: https://img.shields.io/twitter/follow/kobra_dev.svg?style=social&label=Follow
[Discord badge]: https://img.shields.io/discord/?label=Discord&style=social
[Discord server]: https://discord.gg/kobra
