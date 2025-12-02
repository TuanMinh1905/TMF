<template>
  <div class="lg:mb-[20px] lg:w-full lg:bg-white">

    <Wrap attr1="lg:mt-[20px] lg:bg-white ">
      <FilterCategory
        :categories="categoryLv2"
        :selected="selectedLv2"
        :size="sizeMap['category']"
      />
    </Wrap>

    <Wrap
      attr1="lg:mt-[20px] lg:bg-white"
    >
      <BrandList
        :allbrand="allBrand"
      />
    </Wrap>

    <Wrap
      v-if="categoryLv3.length > 0"
      attr1="mt-[20px] lg:bg-white"
    >
      <FilterCategoryLV3
        :categories="categoryLv3"
        :selected-l-v2="selectedLv2"
        :selected-l-v3="selectedLv3"
      />
    </Wrap>

    <Wrap attr1="lg:bg-white lg:mt-[20px] pt-[20px] pb-[50px]">
      <ListProductVertical
        v-if="products.length > 0"
        :products="products"
        :loading="true"
      />
      
      <div
        v-else
        class="flexRow-center pt-[20px]"
      >
        Chưa có sản phẩm
      </div>
    </Wrap>

    <!-- <Wrap
      attr1="lg:mt-[20px] lg:bg-white"
      attr3=""
    >
      <BlogHandbook :allblog="allBlog" />
    </Wrap> -->

    <Wrap
      attr1="lg:mt-[20px]"
    >
      <BannerDowload />
    </Wrap>
  </div>
</template>

<script setup lang="ts">
// import { useBlogStorage } from '~/store/blog'

const props = defineProps({
  categoryLv2: {
    type: Array,
    required: true,
  },

  selectedLv2: {
    type: String,
    required: true,
  },

  categoryLv3: {
    type: Array,
    required: true,
  },

  selectedLv3: {
    type: String,
    required: true,
  },

  products: {
    type: Array,
    required: true,
  },

  brands: {
    type: Array,
    required: false,
    default: () => [],
  },
})

const { sizeMap } = useFilterSizeTokens()
const allBrand = computed(() => props.brands || [])

// const blogStore = useBlogStorage()
// await blogStore.getListBlog('{slug}')
// const allBlog = computed(() => blogStore.listBlog || [])
</script>
