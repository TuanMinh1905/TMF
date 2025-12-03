<!-- File: pages/introduce.vue -->
<template>
  <div>
    Hello
    <!-- Header + Banner section -->
    <!-- <div class="lg:mb-[20px] lg:w-full lg:bg-white">
      <div class="lg:flex lg:items-center lg:justify-center lg:gap-[24px] lg:pb-[24px]">
        <div class="lg:h-fit lg:w-[1200px]"> -->
          <!-- 🧭 Breadcrumb -->
          <!-- <div class="flex items-center justify-center lg:bg-white lg:pb-[12px]">
            <div class="w-full lg:w-[1200px]">
              <BreadcrumbBase :items="breadcrumbItems" />
            </div>
          </div> -->
          <!-- Banner -->
          <!-- <div class="flex items-center justify-center">
            <BannerListSlider />
          </div>
        </div>
      </div>
    </div> -->

    <!-- <Wrap
      attr1="lg:mt-[20px] lg:bg-white"
      attr3=""
    >
      <IntroduceCategory />
    </Wrap> -->

    <!-- <Wrap
      attr1="lg:mt-[20px] lg:bg-white"
      attr3=""
    >
      <IntroduceList :allbrand="allBrand" />
    </Wrap> -->

    <!-- <Wrap
        attr1="lg:mt-[20px] lg:bg-white"
      >
      <BrandList
        :allbrand="allBrand"
      />
    </Wrap> -->


    <!-- <div class="lg:mb-[20px] lg:w-full lg:bg-white">
      <div class="lg:flex lg:items-center lg:justify-center lg:gap-[24px] lg:pb-[24px]">
        <div class="lg:h-fit lg:w-[1200px]">
          <div class="flex items-center justify-center">
            <BannerListPromo />
          </div>
        </div>
      </div>
    </div> -->

    <!-- <Wrap
      attr1="lg:mt-[20px] lg:bg-white"
      attr3=""
    >
      <IntroduceBlog />
    </Wrap> -->

    <!-- <div class="lg:mb-[20px] lg:w-full lg:bg-white">
      <div class="lg:flex lg:items-center lg:justify-center lg:gap-[24px] lg:pb-[24px]">
        <div class="lg:h-fit lg:w-[1200px]">
          <section class="py-10">
            <ListStore />
            <StoreShowcase />
            <StoreLocator />
          </section>
        </div>
      </div>
    </div> -->

    <!-- <Wrap
      attr1="lg:mt-[20px]"
    >
      <BannerDowload />
    </Wrap> -->
  </div>
</template>

<script setup>
import { useBrandStorage } from '~/store/brand'

const brandStore = useBrandStorage()
brandStore.getBrand()
const allBrand = computed(() => brandStore.brands)



//  Khai báo breadcrumb items
// const breadcrumbItems = [
//   { label: 'Petpet', to: '/' },
//   { label: 'Giới thiệu' },
// ]

</script>