<template>
    <div
        class="w-fit max-w-full py-[20px] lg:flex lg:w-[1200px] lg:flex-col lg:items-center lg:justify-center lg:gap-[32px] lg:rounded-[24px] lg:bg-white lg:pb-[40px] lg:pt-[24px]">
        <div class="flex flex-col lg:w-full">
            <div class="lg:flex lg:items-center lg:justify-between">
                <div class="flex flex-col opacity-80">
                    <span class="text-[20px] font-bold leading-[100%] text-[#000000] lg:text-[24px]">
                        <strong>Video hấp dẫn</strong>
                    </span>
                    <div class="mb-5">
                        <span
                            class="font-normal font-monasans text-[14px] leading-[100%] text-[#6B6B6B] lg:text-[16px]">
                            Chăm boss thêm vui!
                        </span>
                    </div>
                </div>
            </div>
            <Wrap :attr1="'lg:bg-white lg:mb-[20px]'" :attr3="'lg:flex lg:flex-col'">
                <BrandBlog />
            </Wrap>
        </div>
    </div>
</template>

<script setup>
import { useBlogStorage } from '~/store/blog'
const blogStore = useBlogStorage()
blogStore.getFeatureBlog('feature')


definePageMeta({
    middleware: 'layout-switcher',
    transition: 'slide-left',
})
</script>
