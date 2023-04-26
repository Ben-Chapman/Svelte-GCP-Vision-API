<script>
  import SvelteTable from "svelte-table";
  import { tableRowData } from "../src/lib/stores";

  const columns = [
    {
      key: "description",
      title: "Description",
      value: (v) => v.description,
      sortable: true,
    },
    {
      key: "confidence",
      title: "Confidence Value",
      value: (v) => `${v.confidence}  %`,
      sortable: true,
    },
  ];

  $: rows = $tableRowData;
</script>

<main>
  <div class="annotation-results">
    <SvelteTable
      {columns}
      {rows}
      sortBy="confidence"
      sortOrder="0"
      classNameThead="table-head"
      classNameTbody="table-body"
    />
  </div>
</main>

<style>
  .annotation-results {
    flex-grow: 1;
  }
  :global(.table-head) {
    font-weight: 500;
    font-size: 1.2rem;
  }

  :global(.table-body) {
    font-weight: 300;
    font-size: 1rem;
  }
</style>
