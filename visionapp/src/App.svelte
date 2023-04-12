<script>
  import { annotationResults, isProcessing } from "./lib/stores";
  import Dropzone from "./Dropzone.svelte";

  let results;
  let imageProcessing;

  annotationResults.subscribe((result) => {
    results = result;
  });

  isProcessing.subscribe((status) => {
    imageProcessing = status;
  });
</script>

<main>
  <Dropzone />
  <div>
    {#await results}
      <p>...waiting</p>
    {:then resp}
      <p>The response is {resp}</p>
    {:catch error}
      <p style="color: red">{error}</p>
    {/await}
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
