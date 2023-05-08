# Explore the GCP Vision API in a Svelte Web Application
A proof of concept showcasing the integration of the [GCP Vision API](https://cloud.google.com/vision) into a [Svelte](https://svelte.dev) single page web application.

<p align="center">
<img src="https://user-images.githubusercontent.com/5124569/236921604-d3566070-6a3f-4abb-848b-fbeb0745ac7d.gif" width="60%" style="text-align: center">
  </p>


## Getting started

### Install and Configure Cloud Vision API

- Follow the Vision API
  [getting started instructions](https://cloud.google.com/vision/docs/detect-labels-image-client-libraries#before-you-begin)
  to set up your GCP environment
  - Ensure that you have successfully completed the following:
    - Have a new or existing GCP project with billing enabled
    - Have [enabled](https://console.cloud.google.com/flows/enableapi?apiid=vision.googleapis.com) the GCP Vision API
    - Installed and initialized the Google Cloud CLI
- **Note:** For this demo project you will be using your GCP user account for
  authentication, and we will not be using any of the Vision API client libraries.
- To validate you have everything setup correctly, from your Terminal issue the
  following curl command which [sends a request to the Vision API](https://cloud.google.com/vision/docs/detect-labels-image-command-line#make_an_image_annotation_request) to annotate the
  following image:

  ![A landscape photo of the Eiffel Tower](https://storage.googleapis.com/cloud-samples-data/vision/eiffel_tower.jpg)

```
curl -X POST \
    -H "Authorization: Bearer "$(gcloud auth print-access-token) \
    -H "X-Goog-User-Project: $(gcloud config get project)" \
    -H "Content-Type: application/json; charset=utf-8" \
    https://vision.googleapis.com/v1/images:annotate \
    -d \
    '{
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": "gs://cloud-samples-data/vision/eiffel_tower.jpg"
            }
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
              "maxResults": 3
            },
            {
              "type": "OBJECT_LOCALIZATION",
              "maxResults": 1
            },
            {
              "type": "TEXT_DETECTION",
              "maxResults": 1,
              "model": "builtin/latest"
            }
          ]
        }
      ]
    }'
```

- The response back from this curl request is expected to be a JSON object
  containing the annotation results from the Vision API. If you receive any error
  messages, review the error response and revisit the setup instructions.

## Download and configure the Svelte GCP Vision web application

- Clone this repository to your local workstation
  - From your Terminal: `git clone git@github.com:Ben-Chapman/Svelte-GCP-Vision-API.git`
- Ensure that you have the [Node.js and the Node Package Manager (npm) packages installed](https://nodejs.org/en/download/package-manager):
  - macOS using Homebrew: `brew install npm`
  - Linux:
    - Debian/Ubuntu: `apt install npm`
    - Arch Linux: `pacman -S npm`
    - Fedora: `dnf install npm`
- Once Node JS and npm have been installed, install the Node JS packages needed
  to run this application:
  - `cd Svelte-GCP-Vision-API/visionapp/`
  - `npm install`

## Run the Svelte GCP Vision app

- To run the application, ensure you're in the `Svelte-GCP-Vision-API/visionapp`
  directory and issue the following command:
  - `npm run dev`
- This process should complete in a few seconds, and when it has, visit
  http://localhost:5173 to see this application running on your local workstation.
- From the Svelte [documentation](https://svelte.dev/blog/svelte-for-new-developers):
  > Running the dev script starts a program called Vite. Vite's job is to take your application's source files, pass them to other programs (including Svelte, in our case) and convert them into the code that will actually run when you open the application in a browser.
  >
  > Speaking of which, open a browser and navigate to http://localhost:5173. This is your application running on a local web server (hence 'localhost') on port 5173.
  >
  > Try changing src/App.svelte and saving it. The application will update with your changes.

That's it! You now have a copy of the Svelte GCP Vision app running. Try dragging
and dropping an image onto the web page, and if everything is setup correctly,
you'll receive the GCP Vision API results right in your browser.

## Tips:

- If you're using Visual Studio Code, install the [Svelte VS Code plugin](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), otherwise explore the other
  Svelte IDE [integrations](https://sveltesociety.dev/tools#editor-support)
