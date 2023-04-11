# Frontend Development Is Easier Than Ever

## Get your application out of the terminal and onto the web

### Create the Web app

- `npm init vite`
- `cd visionapp`
- `npm install`

### Install and Configure Cloud Vision API Node Library

- Follow the
  [getting started instructions](https://cloud.google.com/vision/docs/detect-labels-image-client-libraries#before-you-begin)
  to setup your GCP environment
- `npm install --save @google-cloud/vision`
- Setup your Application Default Credentials:
  - `gcloud auth application-default login`

### Notes:

- If you're using Visual Studio Code, install the [Svelte VS Code plugin](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), otherwise explore the other
  Svelte IDE [integrations](https://sveltesociety.dev/tools#editor-support)
