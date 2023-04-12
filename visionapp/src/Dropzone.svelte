<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { annotationResults, isProcessing } from "./lib/stores";
  import { annotateImage } from "./lib/vision-api";

  function handleFilesSelect(e) {
    isProcessing.set(true);
    console.log(`Processing in handler ${isProcessing}`);
    e.detail.acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // When a file is dropped, write a base-64 encoded string to a Svelte store
        $annotationResults = annotateImage(reader.result.split(",")[1]);
      };
      $isProcessing = false;
      reader.readAsDataURL(file);
    });
    isProcessing.set(false);
  }
</script>

<main>
  <Dropzone on:drop={handleFilesSelect} accept="image/*" />
</main>

<style>
</style>
