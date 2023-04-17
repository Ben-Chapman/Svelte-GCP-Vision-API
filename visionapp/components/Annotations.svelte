<script>
  import { tableRows } from "../src/lib/stores";
  import SvelteTable from "svelte-table";

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
      value: (v) => v.confidence,
      sortable: true,
    },
  ];

  $: rows = $tableRows;
</script>

<main>
  <SvelteTable {columns} {rows} />
</main>

<style>
</style>
