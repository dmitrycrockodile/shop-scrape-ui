<script>
export default {
  name: "Pagination",
  props: {
    pagination: { type: Object, required: true },
  },
  methods: {
    setPage(page) {
      this.$emit("setPage", page);
    },
  },
};
</script>

<template>
  <div v-if="pagination.last_page > 1" class="row">
    <div class="col-12 d-flex justify-content-center wow fadeInUp animated">
      <ul class="pagination text-center">
        <!-- <li v-if="pagination.current_page !== 1" class="next">
          <a @click.prevent="setPage(1)" href="#0">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
        </li> -->
        <template v-for="link in pagination.links" :key="link.label">
          <template v-if="Number(link.label)">
            <li
              v-if="
                (pagination.current_page - link.label > -2 &&
                  pagination.current_page - link.label < 2) ||
                Number(link.label) === 1 ||
                Number(link.label) == pagination.last_page
              "
            >
              <a
                @click.prevent="setPage(link.label)"
                href="#0"
                :class="link.active ? 'active' : ''"
                >{{ link.label }}</a
              >
            </li>
            <li
              v-else-if="
                pagination.current_page - link.label == 2 ||
                pagination.current_page - link.label == -2
              "
            >
              <a href="#0"> ... </a>
            </li>
          </template>
        </template>
        <!-- <li
          v-if="pagination.current_page !== pagination.last_page"
          class="next"
        >
          <a @click.prevent="setPage(pagination.current_page + 1)" href="#0">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pagination li a {
    margin: 0px 5px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #eeeeee;
    background: transparent;
    font-size: 12px;
    color: #555555;
    font-family: inherit;
    border-radius: 50%;
    transition: all 0.3s;
    line-height: 1.1;
}
.pagination li a i {
    font-size: 12px;
    line-height: 0;
}
.pagination li a:hover {
    background-color: #2dce89;
    color: #fff;
}
.pagination li a.active {
    background-color: #2dce89;
    color: #fff;
    border: 1px solid #2dce89;
}
      
@media (min-width: 767px) {
    .pagination li a {
        width: 50px;
        height: 50px;
        font-size: 16px;
    }
    .pagination li a i {
        font-size: 16px;
        line-height: 1.1;
    }
}
</style>
