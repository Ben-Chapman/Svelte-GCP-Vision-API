<script>
  import SvelteTable from "svelte-table";
  import { tableRowData } from "../src/lib/stores";

  // Defining the structure of our table columns
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
</script>

<main>
  <div class="annotation-results">
    <!-- Using the SvelteTable component to build an HTML table containing the
    results from the Vision API. The "rows" data is stored in a Svelte store
    named tableRowData. The "columns" data is defined above. -->
    <SvelteTable
      {columns}
      rows={$tableRowData}
      sortBy="confidence"
      sortOrder="0"
      classNameThead="table-head"
      classNameTbody="table-body"
    />
  </div>
</main>

<style>
  :global(.table-head) {
    font-weight: 500;
    font-size: 1.2rem;
  }

  :global(.table-body) {
    font-weight: 300;
    font-size: 1rem;
  }

  .annotation-results {
    flex-grow: 1;
  }
</style>
