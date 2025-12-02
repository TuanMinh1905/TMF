// composables/useFilterSizeTokens.ts
import type { SizeComponent, SizeKey } from '~/types/sizeFilter'

export function useFilterSizeTokens() {
  const sizeMap: Record<SizeKey, SizeComponent> = {
    homeOne: { lenght: 'lg:w-[720px]', sizeIcon: 'lg:w-[120px] lg:h-[143px]', sizeButton: 'lg:w-[120px] lg:h-[120px]', sizeText: 'lg:text-[16px]' },
    homeTwo: { lenght: 'w-full', sizeIcon: 'lg:w-[122px] lg:h-[108px] w-[60px] h-[88px]', sizeButton: 'lg:w-[80px] lg:h-[80px] w-[60px] h-[60px]', sizeText: 'lg:text-[16px] text-[12px]' },
    category: { lenght: 'w-full', sizeIcon: 'lg:w-[122px] lg:h-[108px] w-[60px] h-[88px]', sizeButton: 'lg:w-[80px] lg:h-[80px] w-[60px] h-[60px]', sizeText: 'lg:text-[16px] text-[12px]' },
  }
  return { sizeMap }
}