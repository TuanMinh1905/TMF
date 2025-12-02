<template>
  <footer
    class="flex h-fit w-full flex-col items-center justify-center gap-[25px] bg-white px-[92px] pb-[30px] pt-[100px]"
  >
    <div class="flex w-[1200px] justify-between">
      <div class="flex h-fit w-[249px] flex-col gap-[20px]">
        <NuxtLink :to="localePath('/')">
          <span class="font-Longreach text-[40px] font-normal leading-[100%] text-grayTMF">
            TM - FAHSION
          </span>
        </NuxtLink>
        <div class="flex gap-[6px] rounded-[6px]">
          <div>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 9.63785V18.2188C1.5 19.8756 2.84315 21.2188 4.5 21.2188H19.5C21.1569 21.2188 22.5 19.8756 22.5 18.2188V9.63785L13.5723 15.1318C12.6081 15.7252 11.3919 15.7252 10.4277 15.1318L1.5 9.63785Z"
                fill="#414545"
              />
              <path
                d="M22.5 7.87658V7.71875C22.5 6.0619 21.1569 4.71875 19.5 4.71875H4.5C2.84315 4.71875 1.5 6.0619 1.5 7.71875V7.87658L11.2139 13.8543C11.696 14.151 12.304 14.151 12.7861 13.8543L22.5 7.87658Z"
                fill="#414545"
              />
            </svg>
          </div>
          <!-- target="_blank": mở link ở tab mới (hoặc cửa sổ mới) | rel="noopener": cắt kết nối window.opener giữa trang của bạn và tab mới → chặn tấn công reverse tabnabbing -->
          <a
            :href="gmailLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-grayTMF">
              ilove@tmf.vn
            </span>
          </a>
        </div>

        <div class="flex gap-[6px] rounded-[6px]">
          <div>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 5.46875C1.5 3.8119 2.84315 2.46875 4.5 2.46875H5.87163C6.732 2.46875 7.48197 3.05431 7.69064 3.889L8.79644 8.31218C8.97941 9.04405 8.70594 9.8143 8.10242 10.2669L6.8088 11.2371C6.67447 11.3379 6.64527 11.4854 6.683 11.5884C7.81851 14.6882 10.2805 17.1502 13.3803 18.2857C13.4833 18.3235 13.6309 18.2943 13.7316 18.1599L14.7018 16.8663C15.1545 16.2628 15.9247 15.9893 16.6566 16.1723L21.0798 17.2781C21.9144 17.4868 22.5 18.2367 22.5 19.0971V20.4688C22.5 22.1256 21.1569 23.4688 19.5 23.4688H17.25C8.55151 23.4688 1.5 16.4172 1.5 7.71875V5.46875Z"
                fill="#414545"
              />
            </svg>
          </div>
          <div>
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-grayTMF">
              +84 773772174
            </span>
          </div>
        </div>

        <div class="flex gap-[6px] rounded-[6px]">
          <div>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.5397 23.3198C11.57 23.3373 11.5937 23.3508 11.6105 23.3603L11.6384 23.3758C11.8613 23.4982 12.1378 23.4973 12.3608 23.3762L12.3895 23.3603C12.4063 23.3508 12.43 23.3373 12.4603 23.3198C12.5207 23.2848 12.607 23.2338 12.7155 23.1669C12.9325 23.0333 13.2388 22.8363 13.6046 22.5779C14.3351 22.0618 15.3097 21.2962 16.2865 20.2961C18.2307 18.3056 20.25 15.3149 20.25 11.4687C20.25 6.9124 16.5563 3.21875 12 3.21875C7.44365 3.21875 3.75 6.9124 3.75 11.4687C3.75 15.3149 5.76932 18.3056 7.71346 20.2961C8.69025 21.2962 9.66491 22.0618 10.3954 22.5779C10.7612 22.8363 11.0675 23.0333 11.2845 23.1669C11.393 23.2338 11.4793 23.2848 11.5397 23.3198ZM12 14.4688C13.6569 14.4688 15 13.1256 15 11.4688C15 9.8119 13.6569 8.46875 12 8.46875C10.3431 8.46875 9 9.8119 9 11.4688C9 13.1256 10.3431 14.4688 12 14.4688Z"
                fill="#414545"
              />
            </svg>
          </div>
          <a href="https://maps.google.com/?q=10.7873344,106.7050566">
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-grayTMF">
              2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1
            </span>
          </a>
        </div>
      </div>
      <div class="flex w-[249px] flex-col gap-[14px]">
        <NuxtLink :to="localePath('/')">
          <span class="font-monasans text-[20px] font-medium leading-[150%] text-grayTMF">
            Trang chủ
          </span>
        </NuxtLink>
        <div class="flex flex-col gap-[8px]">
          <NuxtLink :to="localePath(`/category/ao`)">
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-[#59595A]">
              Danh mục
            </span>
          </NuxtLink>
          <NuxtLink :to="localePath('/introduce')">
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-[#59595A]">
              Giới thiệu
            </span>
          </NuxtLink>
          <NuxtLink :to="localePath('/blog')">
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-[#59595A]">
              Cẩm nang TMF
            </span>
          </NuxtLink>
        </div>
      </div>
      <div class="flex w-[249px] flex-col gap-[14px]">
        <NuxtLink :to="localePath('/')">
          <span class="font-monasans text-[20px] font-medium leading-[150%] text-grayTMF">
            TMF
          </span>
        </NuxtLink>
        <div class="flex flex-col gap-[8px]">
          <NuxtLink :to="localePath('/')">
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-[#59595A]">
              Dành cho giới trẻ
            </span>
          </NuxtLink>
          <NuxtLink :to="localePath('/')">
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-[#59595A]">
              Dành cho nam
            </span>
          </NuxtLink>
          <NuxtLink :to="localePath('/introduce')">
            <span class="font-monasans text-[18px] font-normal leading-[150%] text-[#59595A]">
              Tải ứng dụng
            </span>
          </NuxtLink>
        </div>
      </div>
      <div class="flex h-fit w-[249px] flex-col gap-[14px]">
        <NuxtLink :to="localePath('/')">
          <span class="font-monasans text-[20px] font-medium leading-[150%] text-grayTMF">
            Follow TMF
          </span>
        </NuxtLink>
        <div class="flex gap-[14px]">
          <NuxtLink
            :to="localePath('https://www.facebook.com/')"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="52"
              height="53"
              viewBox="0 0 52 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                fill="#F7F7F8"
              />
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                stroke="#F1F1F3"
              />
              <g clip-path="url(#clip0_89_8753)">
                <path
                  d="M38 26.4687C38 19.8413 32.6274 14.4688 26 14.4688C19.3726 14.4688 14 19.8413 14 26.4687C14 32.4582 18.3882 37.4227 24.125 38.323V29.9375H21.0781V26.4687H24.125V23.825C24.125 20.8175 25.9166 19.1562 28.6576 19.1562C29.9701 19.1562 31.3438 19.3906 31.3438 19.3906V22.3437H29.8306C28.34 22.3437 27.875 23.2688 27.875 24.2187V26.4687H31.2031L30.6711 29.9375H27.875V38.323C33.6118 37.4227 38 32.4582 38 26.4687Z"
                  fill="#414545"
                />
              </g>
              <defs>
                <clipPath id="clip0_89_8753">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(14 14.4688)"
                  />
                </clipPath>
              </defs>
            </svg>
          </NuxtLink>
          <NuxtLink
            :to="localePath('https://www.instagram.com/')"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="52"
              height="53"
              viewBox="0 0 52 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                fill="#F7F7F8"
              />
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                stroke="#F1F1F3"
              />
              <path
                d="M26 22.9738C24.065 22.9738 22.505 24.5487 22.505 26.4688C22.505 28.3888 24.08 29.9637 26 29.9637C27.92 29.9637 29.495 28.3888 29.495 26.4688C29.495 24.5487 27.92 22.9738 26 22.9738ZM36.5 26.4688C36.5 25.0138 36.5 23.5888 36.425 22.1337C36.35 20.4538 35.96 18.9538 34.73 17.7388C33.5 16.5088 32.015 16.1187 30.335 16.0437C28.88 15.9687 27.455 15.9688 26 15.9688C24.545 15.9688 23.12 15.9687 21.665 16.0437C19.985 16.1187 18.485 16.5088 17.27 17.7388C16.04 18.9688 15.65 20.4538 15.575 22.1337C15.5 23.5888 15.5 25.0138 15.5 26.4688C15.5 27.9237 15.5 29.3488 15.575 30.8038C15.65 32.4838 16.04 33.9837 17.27 35.1987C18.5 36.4287 19.985 36.8188 21.665 36.8937C23.12 36.9688 24.545 36.9688 26 36.9688C27.455 36.9688 28.88 36.9688 30.335 36.8937C32.015 36.8188 33.515 36.4287 34.73 35.1987C35.96 33.9688 36.35 32.4838 36.425 30.8038C36.515 29.3638 36.5 27.9237 36.5 26.4688ZM26 31.8538C23.015 31.8538 20.615 29.4537 20.615 26.4688C20.615 23.4837 23.015 21.0837 26 21.0837C28.985 21.0837 31.385 23.4837 31.385 26.4688C31.385 29.4537 28.985 31.8538 26 31.8538ZM31.61 22.1187C30.92 22.1187 30.35 21.5638 30.35 20.8588C30.35 20.1538 30.905 19.5988 31.61 19.5988C32.315 19.5988 32.87 20.1538 32.87 20.8588C32.8738 21.0231 32.8438 21.1864 32.7819 21.3386C32.7199 21.4909 32.6274 21.6287 32.51 21.7437C32.395 21.8612 32.2571 21.9537 32.1049 22.0156C31.9526 22.0776 31.7893 22.1075 31.625 22.1038L31.61 22.1187Z"
                fill="#414545"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            :to="localePath('https://www.tiktok.com/')"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="52"
              height="53"
              viewBox="0 0 52 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                fill="#F7F7F8"
              />
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                stroke="#F1F1F3"
              />
              <path
                d="M31.1113 19.6021C30.3519 18.7349 29.9334 17.6214 29.9335 16.4688H26.5002V30.2465C26.4742 30.9923 26.1596 31.6988 25.6227 32.2171C25.0858 32.7353 24.3686 33.0248 23.6224 33.0243C22.0446 33.0243 20.7335 31.7354 20.7335 30.1354C20.7335 28.2243 22.578 26.791 24.478 27.3799V23.8688C20.6446 23.3576 17.2891 26.3354 17.2891 30.1354C17.2891 33.8354 20.3557 36.4688 23.6113 36.4688C27.1002 36.4688 29.9335 33.6354 29.9335 30.1354V23.1465C31.3257 24.1464 32.9972 24.6828 34.7113 24.6799V21.2465C34.7113 21.2465 32.6224 21.3465 31.1113 19.6021Z"
                fill="#414545"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            :to="localePath('https://www.youtube.com/')"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="52"
              height="53"
              viewBox="0 0 52 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                fill="#F7F7F8"
              />
              <rect
                x="0.5"
                y="0.96875"
                width="51"
                height="51"
                rx="7.5"
                stroke="#F1F1F3"
              />
              <g clip-path="url(#clip0_89_8756)">
                <path
                  d="M23.9 14.4688H22.55L21.65 17.9188L20.75 14.4688H19.25C19.55 15.3688 19.85 16.1188 20.15 17.0188C20.6 18.2188 20.9 19.2688 20.9 19.8688V23.4688H22.25V19.8688L23.9 14.4688ZM27.5 21.2188V18.9688C27.5 18.2188 27.35 17.7688 27.05 17.3188C26.75 16.8688 26.3 16.7188 25.7 16.7188C25.1 16.7188 24.65 17.0188 24.35 17.4688C24.05 17.7688 23.9 18.2188 23.9 18.9688V21.3688C23.9 22.1188 24.05 22.5688 24.35 22.8688C24.65 23.3188 25.1 23.4688 25.7 23.4688C26.3 23.4688 26.75 23.1688 27.05 22.7188C27.35 22.5688 27.5 21.9688 27.5 21.2188ZM26.3 21.5188C26.3 22.1188 26.15 22.4188 25.7 22.4188C25.25 22.4188 25.1 22.1188 25.1 21.5188V18.6688C25.1 18.0688 25.25 17.7688 25.7 17.7688C26.15 17.7688 26.3 18.0688 26.3 18.6688V21.5188ZM32 23.4688V16.7188H30.8V21.8188C30.5 22.2688 30.35 22.4188 30.05 22.4188C29.9 22.4188 29.75 22.2688 29.75 22.1188V16.7188H28.55V21.9688C28.55 22.4188 28.55 22.7188 28.7 23.0188C28.7 23.3188 29 23.4688 29.45 23.4688C29.9 23.4688 30.35 23.1688 30.8 22.7188V23.4688H32ZM32.6 30.2188C32.15 30.2188 32 30.5188 32 31.1188V31.7188H33.2V31.1188C33.2 30.5188 33.05 30.2188 32.6 30.2188ZM28.25 30.2188C28.1 30.2188 27.8 30.3688 27.65 30.5188V34.5688C27.8 34.7188 28.1 34.8688 28.25 34.8688C28.55 34.8688 28.7 34.5688 28.7 33.9688V31.1188C28.7 30.5188 28.55 30.2188 28.25 30.2188Z"
                  fill="#414545"
                />
                <path
                  d="M35.6001 26.9189C35.3001 25.8689 34.4001 24.9689 33.5001 24.9689C31.1001 24.6689 28.5501 24.6689 26.0001 24.6689C23.4501 24.6689 21.0501 24.6689 18.5001 24.9689C17.6001 24.9689 16.7001 25.8689 16.4001 26.9189C16.1001 28.4189 16.1001 30.0689 16.1001 31.5689C16.1001 33.0689 16.1001 34.7189 16.4001 36.2189C16.7001 37.2689 17.4501 38.0189 18.5001 38.1689C21.0501 38.4689 23.4501 38.4689 26.0001 38.4689C28.5501 38.4689 30.9501 38.4689 33.5001 38.1689C34.5501 38.0189 35.4501 37.2689 35.6001 36.2189C35.9001 34.7189 35.9001 33.0689 35.9001 31.5689C35.9001 30.0689 35.9001 28.4189 35.6001 26.9189ZM21.8001 28.2689H20.3001V35.9189H18.9501V28.2689H17.6001V26.9189H21.8001V28.2689ZM25.4001 35.9189H24.2001V35.1689C23.7501 35.7689 23.3001 35.9189 22.8501 35.9189C22.4001 35.9189 22.2501 35.7689 22.1001 35.4689C22.1001 35.3189 21.9501 35.0189 21.9501 34.4189V29.1689H23.1501V34.4189C23.1501 34.5689 23.3001 34.7189 23.4501 34.7189C23.7501 34.7189 23.9001 34.5689 24.2001 34.1189V29.1689H25.4001V35.9189ZM29.9001 33.8189C29.9001 34.4189 29.9001 34.8689 29.7501 35.1689C29.6001 35.6189 29.3001 35.9189 28.8501 35.9189C28.4001 35.9189 27.9501 35.6189 27.6501 35.1689V35.7689H26.4501V26.9189H27.6501V29.7689C28.1001 29.3189 28.4001 29.0189 28.8501 29.0189C29.3001 29.0189 29.6001 29.3189 29.7501 29.7689C29.9001 30.0689 29.9001 30.5189 29.9001 31.1189V33.8189ZM34.4001 32.7689H32.0001V33.9689C32.0001 34.5689 32.1501 34.8689 32.6001 34.8689C32.9001 34.8689 33.0501 34.7189 33.2001 34.4189V33.6689H34.4001V34.5689C34.4001 34.8689 34.2501 35.0189 34.1001 35.3189C33.8001 35.7689 33.3501 36.0689 32.6001 36.0689C32.0001 36.0689 31.5501 35.7689 31.1001 35.3189C30.8001 35.0189 30.6501 34.4189 30.6501 33.8189V31.5689C30.6501 30.8189 30.8001 30.3689 30.9501 30.0689C31.2501 29.6189 31.7001 29.3189 32.4501 29.3189C33.0501 29.3189 33.5001 29.6189 33.8001 30.0689C34.1001 30.3689 34.1001 30.9689 34.1001 31.5689V32.7689H34.4001Z"
                  fill="#414545"
                />
              </g>
              <defs>
                <clipPath id="clip0_89_8756">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(14 14.4688)"
                  />
                </clipPath>
              </defs>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="w-[78%] border-[1px] border-[#F1F1F3]" />
    <!--  -->
    <span class="font-monasans text-[16px] font-normal leading-[150%] text-[#656567]">
      © 2025 TMF. All rights reserved.
    </span>
  </footer>
</template>

<script setup lang="ts">

const localePath = useLocalePath()
const email = 'ilove@tmf.vn'
const subject = 'Bạn hỏi ?'
const body = ''
const cc = ''
const bcc = ''

const gmailLink = computed(() => {
  const qs = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
    su: subject,
    body,
    cc,
    bcc,
  })
  return `https://mail.google.com/mail/?${qs.toString()}`
})

</script>
