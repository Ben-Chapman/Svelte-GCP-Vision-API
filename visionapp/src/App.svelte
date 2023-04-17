<script>
  import Flex from "svelte-flex";
  import Dropzone from "../components/Dropzone.svelte";

  import Annotations from "../components/Annotations.svelte";
</script>

<main>
  <!-- <Flex class="flexbox"> -->
  <div class="file-drop">
    <Dropzone />
  </div>

  <div>
    <Annotations />
  </div>
  <!-- </Flex> -->
</main>

<style>
  .file-drop {
    /* width: 50%; */
    height: 300px;
    background-color: purple;
  }
  :global(body) {
    background-color: #3d3d3d;
    color: #0084f6;
  }
  :global(.flexbox) {
    background-color: aquamarine;
    width: 80vw;
    max-height: 100vh;
  }
</style>
