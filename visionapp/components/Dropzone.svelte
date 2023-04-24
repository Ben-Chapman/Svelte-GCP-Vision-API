<script>
  import { onMount } from "svelte";
  import { annotateImage } from "../src/lib/vision-api";

  import Dropzone from "dropzone";
  let filename = "";

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

    myDropzone.on("addedfile", function (file) {
      console.log(`Added here ${file.upload.filename}`);
      const reader = new FileReader();
      reader.onload = () => {
        filename = file.upload.filename;
        // When a file is dropped, annotate it
        annotateImage(reader.result.split(",")[1]);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsDataURL(file);
    });
  } // end of dropzone configuration

  onMount(createDropzone);
</script>

<main>
  <div class="preview-container" />
  {#if filename === ""}
    <h1>Drop image here!</h1>
  {:else}
    <p>{filename}</p>
  {/if}
  <div id="custom-template">
    <div class="dz-preview dz-file-preview">
      <div class="dz-image"><img data-dz-thumbnail /></div>
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
</style>
