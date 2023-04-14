<script>
  import { onMount } from "svelte";
  import { annotationResults, isProcessing } from "../src/lib/stores";
  import { annotateImage } from "../src/lib/vision-api";

  import Dropzone from "dropzone";

  function createDropzone() {
    let myDropzone = new Dropzone("#my-dropzone", {
      url: "#",
      dictDefaultMessage: "Drop file here or click to upload!!!!!!!!",
      thumbnailMethod: "contain",
      thumbnailWidth: 200,
      maxFiles: 1,
      acceptedFiles: "image/*",
      previewsContainer: "",
      autoProcessQueue: false,
    });

    myDropzone.on("addedfile", function (file) {
      console.log(`Added here ${file}`);
      const reader = new FileReader();
      reader.onload = () => {
        // When a file is dropped, write a base-64 encoded string to a Svelte store
        $annotationResults = annotateImage(reader.result.split(",")[1]);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsDataURL(file);
    });
  } // end of dropzone configuration

  onMount(createDropzone);
</script>

<main>
  <div class="container dz dropzone" id="my-dropzone" style="margin-top: 30px" />
</main>

<style>
  .dz {
    width: 80vw;
    height: 50vh;
    background-color: red;
  }
</style>
