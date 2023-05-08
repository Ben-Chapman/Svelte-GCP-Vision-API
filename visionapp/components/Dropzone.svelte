<!--
 Copyright 2023 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->
<script>
  import Dropzone from "dropzone";
  import { onMount } from "svelte";

  import { imageData } from "../src/lib/stores";

  let filename = "";
  let imageDropped = false;
  let haveThumbnail = false;

  /**
   * Instantiate and configure Dropzone JS. This function is called by the
   * onMount() lifecycle function at the end of this <script> block. onMount()
   * will fire as soon as this component has been mounted to the DOM. So when
   * App.svelte loads this component, Dropzone JS is loaded and setup for use.
   */
  function createDropzone() {
    let myDropzone = new Dropzone(document.body, {
      // By default, when you upload an image through Dropzone JS, the image is
      // POSTed to some URL. We're not doing that, so specifying the URL as
      // an anchor which doesn't actually do anything.
      url: "#",
      thumbnailWidth: 800,
      thumbnailHeight: null,
      maxFiles: 1,
      acceptedFiles: "image/*", // Only accept image files
      previewsContainer: ".preview-container",
      clickable: false, // Prevent the ability to click the dropzone to upload

      // When a file is dropped, don't do anything. We'll process the uploaded
      // file using event handlers below.
      autoProcessQueue: false,

      // We're using a custom Dropzone "template", which is used to customize
      // the look and feel of Dropzone JS for this application. The template
      // is defined in the <html> section below.
      previewTemplate: document.getElementById("custom-template").innerHTML,
    });

    // This project is designed to accept only one image at a time. So when an
    // image is dropped and before it's uploaded, remove any previously uploaded
    // images from the dropzone. If no previous images are present, the remove
    // operation has no effect.
    myDropzone.on("drop", function () {
      imageDropped = true;
      console.log("Drop detected, removing files");
      filename = ""; // Reset the filename variable
      myDropzone.removeAllFiles();
    });

    // This eventhandler fires when the dropped image has been uploaded from the
    // user's computer.
    myDropzone.on("addedfile", function (file) {
      console.log(`A new image has been dropped: ${file.upload.filename}`);
      const reader = new FileReader();
      reader.onload = () => {
        // The reader.result contains the uploaded image data as a data:URL
        // containing a base64 encoded string. Splitting the data:URL, and
        // storing the base64 string in the Svelte store imageData
        // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASA -> /9j/4AAQSkZJRgABAQEASA
        imageData.set(reader.result.split(",")[1]);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      // reader.readAsDataURL() is used to read the contents of the uploaded
      // file
      reader.readAsDataURL(file);
    });

    // This eventhandler fires when the image thumbnail has been generated
    myDropzone.on("thumbnail", function (file) {
      console.log(`Thumbnail generated for ${file.upload.filename}`);
      // After the thumbnail has been generated, set the filename and
      // haveThumbnail variables
      filename = file.upload.filename;
      haveThumbnail = true;
    });
  } // end of dropzone configuration

  // When App.svelte loads this component, Dropzone JS is loaded and setup for use.
  onMount(createDropzone);
</script>

<main>
  <div class="preview-container" />
  <!-- A Svelte conditional. If the imageDropped variable is false, show the
  "Drop Image" message. Otherwise show the dropped image filename. -->
  {#if !imageDropped}
    <h1>Drop image here!</h1>
  {:else}
    <p>{filename}</p>
  {/if}

  <!-- This is the Dropzone JS template customized for this app. In this example
  the file size, success ✔, error ✘ and error message were removed, and an
  image-preview class attribute was added for styling. See:
  https://docs.dropzone.dev/configuration/basics/layout for more detail -->
  <div id="custom-template">
    <div class="dz-preview dz-file-preview">
      <div class="dz-image">
        <img class="image-preview" data-dz-thumbnail />
      </div>
      <div class="dz-progress">
        <span class="dz-upload" data-dz-uploadprogress />
      </div>
      <div class="dz-error-message"><span data-dz-errormessage /></div>
    </div>
  </div>
</main>

<style>
  .preview-container {
    align-self: flex-end;
  }
  .image-preview {
    /* Scale portrait images to fit within their container */
    max-height: 83ch;

    /* Scale landscape images to be slightly more narrow than their container */
    max-width: 95%;
    padding-top: 1.3rem;
    filter: drop-shadow(2px 2px 18px rgba(0, 0, 0, 0.7));
  }
</style>
