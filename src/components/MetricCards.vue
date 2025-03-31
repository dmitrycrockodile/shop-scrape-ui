<script>
export default {
  name: "MetricsList",
  props: {
    metrics: Array,
  },
};
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div
        v-for="(metric, index) in metrics"
        :key="index"
        class="col-lg-4 col-md-6 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-header text-center pb-0">
            <h5 class="text-primary">{{ metric.retailer_title }}</h5>
          </div>
          <div class="card-body pt-0">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <img
                  :src="metric.retailer_logo"
                  :alt="`${metric.retailer_title} logo`"
                  class="retailer-logo"
                />
              </li>
              <li class="list-group-item">
                <strong>Average Rating:</strong>
                {{ metric.avg_rating.toFixed(2) }}
              </li>
              <li class="list-group-item">
                <strong>Average Price:</strong> ${{
                  metric.avg_price.toFixed(2)
                }}
              </li>
              <li class="list-group-item">
                <strong>Average Images Count:</strong>
                {{ metric.avg_images_count.toFixed(2) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  border: none;
  background: transparent;
}
.retailer-logo {
  width: 280px;
  height: auto;
  min-height: 180px;
  max-height: 200px;
  border-radius: 5px;
}
</style>
