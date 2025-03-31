<script>
export default {
  name: "Currencies Table",
  props: {
    currencies: { type: Array, required: true },
  },
};
</script>

<template>
  <div class="card w-75 m-auto">
    <div
      class="card-header pb-3 d-flex align-items-center justify-content-between"
    >
      <h6 class="pe-4">Currencies</h6>

      <slot name="create-button"></slot>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive ps-4">
        <table class="table align-items-center mb-0 fs-7">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Code
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Symbol
              </th>
            </tr>
          </thead>
          <tbody>
            <h6 class="ms-4 mt-2" v-if="!currencies.length">
              There are no available currencies
            </h6>
            <tr v-for="currency in currencies" :key="currency.id">
              <td>
                <p class="font-weight-bold mb-0">{{ currency.code }}</p>
              </td>
              <td>
                <p class="font-weight-bold mb-0">{{ currency.name }}</p>
              </td>
              <td class="align-middle">
                <p class="font-weight-bold mb-0">{{ currency.symbol }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
