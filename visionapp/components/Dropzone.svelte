<script>
  import { onMount } from "svelte";
  import { annotateImage } from "../src/lib/vision-api";

  import Dropzone from "dropzone";

  function createDropzone() {
    let myDropzone = new Dropzone(document.body, {
      url: "#",
      dictDefaultMessage: "Drop Image to Process with the GCP Vision API",
      thumbnailWidth: 800,
      thumbnailHeight: 500,
      maxFiles: 1,
      acceptedFiles: "image/*",
      previewsContainer: ".preview-container",
      autoProcessQueue: false,
      previewTemplate: document.getElementById("custom-template").innerHTML,
    });

    myDropzone.on("addedfile", function (file) {
      console.log(`Added here ${file}`);
      const reader = new FileReader();
      reader.onload = () => {
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
