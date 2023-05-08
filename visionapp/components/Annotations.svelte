<!--
 Copyright 2023 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->
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
