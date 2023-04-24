<script>
  import Flex from "svelte-flex";
  import Dropzone from "../components/Dropzone.svelte";
  import Annotations from "../components/Annotations.svelte";
</script>

<main>
  <!-- <Flex justify="around" align="center" class="flexbox"> -->
    <div class="file-drop-section">
      <Dropzone />
    </div>

    <div class="annotation-section">
      <Annotations />
    </div>
  <!-- </Flex> -->
</main>

<style>
  /* .file-drop-section {
    background-color: #ffffff24;
    border-radius: 10px;
    flex: 2;
    height: 100%;
    align-self: center;
  }
  .annotation-section {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  } */
  /* Hide the scrollbar in Chrome */
  :global(.annotation-section::-webkit-scrollbar) {
    display: none;
  }

  /* :global(body) {
    background-color: #3d3d3d;
    color: #ffffff;
    font-family: "Encode Sans Condensed", sans-serif;
  } */
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
