<script>
  import Flex from "svelte-flex";
  import Dropzone from "../components/Dropzone.svelte";
  import Annotations from "../components/Annotations.svelte";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { imageData, tableRowData } from "./lib/stores";

  import { Circle3 } from "svelte-loading-spinners";
  import { annotateImage } from "./lib/vision-api";
</script>

<svelte:head>
  <title>VisionApp</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed:wght@300;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <Flex justify="left">
    <img src="../visionapp-logo.png" alt="The VisionApp Logo" class="logo" />
  </Flex>

  <Flex justify="around" align="center" class="flexbox">
    <div class="file-drop-section">
      <Dropzone />
    </div>

    {#if $imageData}
      <div class="annotation-section">
        {#await annotateImage($imageData)}
          <div class="waiting-spinner">
            <Circle3 />
            Waiting for results...
          </div>
        {:then}
          <Annotations />
        {:catch error}
          <div class="error-message">
            {error}
          </div>
        {/await}
      </div>
    {/if}
  </Flex>
</main>

<style>
  .file-drop-section {
    flex: 2;
    height: 100%;
    align-self: center;
    background-color: #ffffff24;
    border-radius: 10px;
  }

  .annotation-section {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    justify-content: center;
  }
  /* Hide the scrollbar in Chrome */
  :global(.annotation-section::-webkit-scrollbar) {
    display: none;
  }
  .waiting-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }
  .error-message {
    font-weight: 300;
    color: #ff4f4f;
    padding-left: 1rem;
    padding-top: 2rem;
  }
  :global(body) {
    background-color: #3d3d3d;
    color: #ffffff;
    font-family: "Encode Sans Condensed", sans-serif;
  }
  :global(.flexbox) {
    width: 80vw;
    height: 80vh;
    align-items: center;
  }
  .logo {
    height: 7rem;
    margin-bottom: 1.25rem;
    align-items: baseline;
  }
</style>
