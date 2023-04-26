<script>
  import Dropzone from "dropzone";
  import { onMount } from "svelte";

  import { imageData } from "../src/lib/stores";

  let filename = "";
  let imageDropped = false;
  let haveThumbnail = false;

  function createDropzone() {
    let myDropzone = new Dropzone(document.body, {
      url: "#",
      thumbnailWidth: 800,
      thumbnailHeight: null,
      maxFiles: 1,
      acceptedFiles: "image/*",
      previewsContainer: ".preview-container",
      clickable: false,
      autoProcessQueue: false,
      previewTemplate: document.getElementById("custom-template").innerHTML,
    });
    /**
     * This project is desgined to accept only one image at a time. So when an
     * image is dropped and before it's uploaded, remove any previously uploaded
     * images from the dropzone. If no previous images are present, the remove
     * operation has no effect.
     */
    myDropzone.on("drop", function () {
      imageDropped = true;
      console.log("Drop detected, removing files");
      filename = "";
      myDropzone.removeAllFiles();
    });

    myDropzone.on("addedfile", function (file) {
      console.log(`A new image has been dropped: ${file.upload.filename}`);
      const reader = new FileReader();
      reader.onload = () => {
        imageData.set(reader.result.split(",")[1]);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsDataURL(file);
    });

    myDropzone.on("thumbnail", function (file) {
      console.log(`Thumbnail generated for ${file.upload.filename}`);
      filename = file.upload.filename;
      haveThumbnail = true;
    });
  } // end of dropzone configuration

  onMount(createDropzone);
</script>

<main>
  <div class="preview-container" />
  {#if !imageDropped}
    <h1>Drop image here!</h1>
  {:else}
    <p>{filename}</p>
  {/if}
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
    max-width: 95%;
    padding-top: 1.3rem;
    filter: drop-shadow(2px 2px 18px rgba(0, 0, 0, 0.7));
  }
</style>
