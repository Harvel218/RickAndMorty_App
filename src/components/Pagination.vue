<template>
  <div class="pagination container">
    <button
      type="button pagination__nav"
      :class="{
        active: currentPage != 1,
      }"
      @click="setPrevPage"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6667 3.33334V12.6667L3.33335 8L10.6667 3.33334Z"
          fill="#A9B1BD"
        />
      </svg>
    </button>
    <div class="pagination__elements">
      <button
        type="button"
        v-for="value in pagesArray"
        :key="value"
        @click="setCurrentPage(value)"
        :class="{
          active: isPageActive(value),
          disabled: isPageDisabled(value),
        }"
      >
        <span class="pointer" v-if="isPointerActive(value)">...</span>
        <span class="value" v-else>{{ value }}</span>
      </button>
    </div>
    <button
      type="button pagination__nav"
      :class="{
        active: currentPage != allPages,
      }"
      @click="setNextPage"
    >
      <svg
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.333344 0.333336V9.66667L7.66668 5L0.333344 0.333336Z"
          fill="#A9B1BD"
        />
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "Pagination",
  props: {
    totalPages: { type: Number, required: true },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const currentPage = ref<number>(Number(route.query.page) || 1);
    let allPages = ref<number>(props.totalPages);

    const pagesArray = computed(() => {
      return Array.from({ length: allPages.value }, (_, index) => index + 1);
    });

    const setPrevPage = () => {
      if (currentPage.value === 1) {
        return;
      }
      currentPage.value = currentPage.value - 1;
    };

    const setNextPage = () => {
      if (currentPage.value === pagesArray.value.length) {
        return;
      }
      currentPage.value = currentPage.value + 1;
    };

    const setCurrentPage = (page: number) => {
      currentPage.value = page;
    };

    const isPageActive = (page: number) => {
      return currentPage.value === page;
    };

    const isPageDisabled = (page: number) => {
      return (
        currentPage.value !== page &&
        page > 2 &&
        page != pagesArray.value.length &&
        currentPage.value != page - 1 &&
        currentPage.value != page + 1 &&
        currentPage.value != page - 2 &&
        currentPage.value != page + 2
      );
    };

    const isPointerActive = (page: number) => {
      return (
        (page === currentPage.value - 2 || page === currentPage.value + 2) &&
        page > 2 &&
        page != pagesArray.value.length
      );
    };

    watch(currentPage, (value) => {
      router.push({ query: { page: `${value}` } });
    });

    return {
      pagesArray,
      setPrevPage,
      setNextPage,
      setCurrentPage,
      isPageActive,
      isPageDisabled,
      isPointerActive,
      currentPage,
      allPages,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
