<script>
  import Flex from "svelte-flex";
  import { Circle3 } from "svelte-loading-spinners";

  import Dropzone from "../components/Dropzone.svelte";
  import Annotations from "../components/Annotations.svelte";

  import { annotateImage } from "./lib/vision-api";
  import { imageData } from "./lib/stores";
</script>

<!--
  Using the <svelte:head> element to insert/replace elements in the application's
  document.head. Specifically, changing the <title> and adding a Google Font we're
  using throughout the site.
-->
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
  <div class="logo">
    <img src="../visionapp-logo.png" alt="The VisionApp Logo" class="logo" />
  </div>

  <!-- This Flex container is the primary container for the site. -->
  <Flex direction="row" class="flexbox">
    <div class="file-drop-section">
      <!-- Including the dropzone component -->
      <Dropzone />
    </div>
    <!--
      This is a Svelte conditional statement which contains an {#await} block.

      If we have imageData (an uploaded image), then instantiate the {#await}
      block. The {#await} block is calling the annotateImage() function, and
      works with the Promise returned from that function. When the Promise is
      pending (waiting for a response from the Vision API), a waiting spinner is
      shown. When the promise has been fulfilled ({:then}) display the Annotations
      component. If the promise was rejected ({:catch}), display the resulting
      error message.
    -->
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
  :global(body) {
    background-color: #3d3d3d;
    color: #ffffff;
    font-family: "Encode Sans Condensed", sans-serif;
  }

  :global(.flexbox) {
    height: 80vh;
  }

  .file-drop-section {
    flex: 2;
    height: 100%;
    width: 80vw;
    align-self: center;
    background-color: #ffffff24;
    border-radius: 10px;
    object-fit: contain;
  }

  .annotation-section {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    justify-content: center;
  }

  /* Hide the annotation section scrollbar in Chrome */
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

  .logo {
    height: 7rem;
    text-align: left;
  }
</style>
