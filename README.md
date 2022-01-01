<div align="center">

<h1> Kobra</h1>
<img src="./.github/logo.svg" alt="drawing" width="100"/>

**A visual programming language (like Scratch) for Machine Learning**

[![Build Status - Cirrus][]][build status] [![Twitter handle][]][twitter badge] [![Discord Chat](https://img.shields.io/discord/881840851637133342?logo=discord&style=social)](https://discord.gg/wRfnr4MYPZ)

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

All environment variables should go in a `.env.local` file at the root of the project directory. If you're developing Kobra with our infrastructure, you can use these environment variables (they're all public, so don't worry about us putting them here):

```
NEXT_PUBLIC_GQL_URI=https://api.cr.kobra.dev/

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBeiMHtIRQQB-VXcwhV5qbcwWslZ3mjAW8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=kobra1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=kobra1

NEXT_PUBLIC_APP_HOSTED_URL=http://localhost:3000/
NEXT_PUBLIC_DATASET_API=https://datasets-api.cr.kobra.dev/dataset
```

Otherwise, here are the descriptions of the environment variables:

-   `NEXT_PUBLIC_GQL_URI`: URL to GraphQL API (see the [API repository](https://github.com/kobra-dev/API))
-   Firebase details:
    -   `NEXT_PUBLIC_FIREBASE_API_KEY`
    -   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase project domain (like `kobra1.firebaseapp.com`)
    -   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: like `kobra1`
-   `NEXT_PUBLIC_APP_HOSTED_URL`: URL that the app is being hosted at (used to generate the URL to copy to your clipboard when you click share)
-   `NEXT_PUBLIC_DATASET_API`: URL to the dataset API (see the [dataset API repository](https://github.com/kobra-dev/datasets-api))

##### GraphQL codegen

We use [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) to generate types and functions for our GraphQL API. To run the tool, use `yarn gql-codegen`. By default this uses our instance of the API but you can change it in the `codegen.yml` file.

##### Other core repositories

-   [`API`](https://github.com/kobra-dev/API): GraphQL API (connects to PostgreSQL database)
-   [`datasets-api`](https://github.com/kobra-dev/datasets-api): API for datasets (connects to S3 bucket or similar)
-   [`kobra.js`](https://github.com/kobra-dev/kobra.js): Machine learning library for JavaScript
-   [`docs`](https://github.com/kobra-dev/docs): Our documentation site
-   [`kobra.dev`](https://github.com/kobra-dev/kobra.dev): Our landing page
-   [`better-react-spreadsheet`](https://github.com/kobra-dev/better-react-spreadsheet): A better spreadsheet widget for React

## Contributing

We appreciate your help!
Before contributing, we highly recommend discussing potential changes with our team on our [Discord server](https://discord.gg/wRfnr4MYPZ)!

[build status - cirrus]: https://github.com/kobra-dev/Kobra/actions/workflows/ci.yml/badge.svg?branch=dev&event=push
[build status]: https://github.com/kobra-dev/Kobra/actions
[twitter badge]: https://twitter.com/intent/follow?screen_name=kobra_dev
[twitter handle]: https://img.shields.io/twitter/follow/kobra_dev.svg?style=social&label=Follow
[discord badge]: https://img.shields.io/discord/?label=Discord&style=social
