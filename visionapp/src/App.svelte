<script>
  import Flex from "svelte-flex";
  import Dropzone from "../components/Dropzone.svelte";
  import Annotations from "../components/Annotations.svelte";
</script>

<main>
  <Flex justify="around" align="center" class="flexbox">
    <div class="file-drop-section">
      <Dropzone />
    </div>

    <div class="annotation-section">
      <Annotations />
    </div>
  </Flex>
</main>

<style>
  .file-drop-section {
    background-color: #ffffff24;
    border-radius: 10px;
    flex: 2;
    height: 100%;
    align-self: center;
  }
  .annotation-section {
    flex: 1;
    height: 100%;
    overflow: scroll;
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
</style>
