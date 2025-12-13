<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Báo cáo - Doanh thu</h1>

      <div class="flex items-center gap-3">
        <select v-model="months" class="px-3 py-2 border rounded text-sm">
          <option :value="1">1 tháng</option>
          <option :value="3">3 tháng</option>
          <option :value="6">6 tháng</option>
          <option :value="12">12 tháng</option>
        </select>

        <button
          @click="refresh"
          class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Làm mới
        </button>

        <button
          @click="exportCSV"
          class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Xuất CSV
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <svg
        class="animate-spin h-8 w-8 text-yellow-500"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    </div>

    <div v-else class="space-y-6 relative">
      <!-- Summary row -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded shadow">
          <div class="text-sm text-gray-500">Tổng doanh thu</div>
          <div class="text-2xl font-bold mt-2">
            {{ formatCurrency(summary.totalRevenue) }}
          </div>
          <div class="text-xs text-gray-400 mt-1">
            Khoảng thời gian: {{ months }} tháng
          </div>
        </div>

        <!-- DOANH THU THEO THÁNG with month picker & comparison -->
        <div class="bg-white p-4 rounded shadow">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500">Doanh thu theo tháng</div>
              <div class="text-2xl font-bold mt-2">
                {{ formatCurrency(selectedMonthRevenue) }}
              </div>
              <div class="text-xs text-gray-400 mt-1">
                Tháng đã chọn: {{ selectedMonthLabel || "—" }}
              </div>
            </div>

            <div class="flex flex-col items-end">
              <label class="text-xs text-gray-500 mb-1">Chọn tháng</label>
              <select
                v-model.number="selectedMonthIndex"
                class="px-3 py-2 border rounded text-sm bg-white"
              >
                <option v-for="(lab, idx) in labels" :key="lab" :value="idx">
                  {{ lab }}
                </option>
              </select>

              <div v-if="selectedMonthIndex !== null" class="mt-2 text-right">
                <div
                  class="text-sm"
                  :class="changeIsPositive ? 'text-green-600' : 'text-red-600'"
                >
                  {{ changeSign }} {{ formatCurrency(changeValue) }}
                  <span class="text-xs text-gray-500 ml-2"
                    >({{ changePercentLabel }})</span
                  >
                </div>
                <div class="text-xs text-gray-400 mt-1">
                  So sánh với tháng trước
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded shadow">
          <div class="text-sm text-gray-500">Tổng đơn hàng</div>
          <div class="text-2xl font-bold mt-2">
            {{ summary.totalOrders.toLocaleString() }}
          </div>
          <div class="text-xs text-gray-400 mt-1">Số đơn đã xử lý</div>
        </div>

        <div class="bg-white p-4 rounded shadow">
          <div class="text-sm text-gray-500">Giá trị đơn trung bình (AOV)</div>
          <div class="text-2xl font-bold mt-2">
            {{ formatCurrency(summary.avgOrderValue) }}
          </div>
          <div class="text-xs text-gray-400 mt-1">Average Order Value</div>
        </div>
      </div>

      <!-- Charts area -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Line chart -->
        <div class="bg-white p-4 rounded shadow relative">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-lg font-medium">Doanh thu theo tháng</h3>
              <p class="text-xs text-gray-500">So sánh Năm nay vs Năm trước</p>
            </div>
          </div>

          <div ref="lineWrapper" class="w-full h-64 relative">
            <svg :viewBox="`0 0 ${LINE_W} ${LINE_H}`" class="w-full h-full">
              <g v-for="i in 5" :key="'grid-' + i">
                <line
                  :x1="padding"
                  :x2="LINE_W - padding"
                  :y1="padTop + (i - 1) * gridStep"
                  :y2="padTop + (i - 1) * gridStep"
                  stroke="#e6e7eb"
                />
              </g>

              <!-- area this year -->
              <path
                v-if="thisYearPoints.length"
                :d="areaPath(thisYearPoints)"
                fill="rgba(37,99,235,0.06)"
                stroke="none"
              />

              <!-- line this year -->
              <path
                v-if="thisYearPoints.length"
                :d="linePath(thisYearPoints)"
                fill="none"
                stroke="#2563eb"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <!-- area last year -->
              <path
                v-if="lastYearPoints.length"
                :d="areaPath(lastYearPoints)"
                fill="rgba(16,185,129,0.04)"
                stroke="none"
              />

              <!-- line last year -->
              <path
                v-if="lastYearPoints.length"
                :d="linePath(lastYearPoints)"
                fill="none"
                stroke="#10b981"
                stroke-width="2"
                stroke-dasharray="6 4"
              />

              <!-- points this year (interactive) -->
              <g v-for="(p, idx) in thisYearPoints" :key="'pt-' + idx">
                <circle
                  :cx="p.x"
                  :cy="p.y"
                  r="4"
                  fill="#2563eb"
                  @mouseenter="showPointTooltip(p, idx, 'this')"
                  @mouseleave="hideTooltip"
                />
              </g>

              <!-- points last year (small) -->
              <g v-for="(p, idx) in lastYearPoints" :key="'ptL-' + idx">
                <circle
                  :cx="p.x"
                  :cy="p.y"
                  r="3"
                  fill="#10b981"
                  @mouseenter="showPointTooltip(p, idx, 'last')"
                  @mouseleave="hideTooltip"
                />
              </g>

              <!-- x labels -->
              <g v-for="(lab, idx) in labels" :key="'xl-' + idx">
                <text
                  :x="xForIndex(idx)"
                  :y="LINE_H - 6"
                  font-size="10"
                  fill="#6b7280"
                  text-anchor="middle"
                >
                  {{ lab }}
                </text>
              </g>
            </svg>

            <!-- Tooltip absolute -->
            <div
              v-if="tooltip.visible"
              :style="tooltipStyle"
              class="pointer-events-none z-50"
            >
              <div class="bg-white border rounded shadow px-3 py-2 text-sm">
                <div class="text-xs text-gray-500">{{ tooltip.label }}</div>
                <div class="font-medium">
                  {{ formatCurrency(tooltip.value) }}
                </div>
                <div class="text-xs text-gray-400">{{ tooltip.note }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top products (list + images) -->
        <div class="bg-white p-4 rounded shadow">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-lg font-medium">Sản phẩm bán chạy</h3>
              <p class="text-xs text-gray-500">Top theo số lượng</p>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="(p, idx) in topProductsDisplay"
              :key="p.id || idx"
              class="flex items-center gap-3"
            >
              <div class="w-8 text-sm text-gray-600">{{ idx + 1 }}</div>

              <div
                class="w-12 h-12 rounded overflow-hidden bg-slate-100 flex items-center justify-center"
              >
                <img
                  v-if="p.imageUrl"
                  :src="p.imageUrl"
                  alt=""
                  class="object-cover w-full h-full"
                />
                <span v-else class="text-xs text-gray-500">No image</span>
              </div>

              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <div class="truncate font-medium">{{ p.name }}</div>
                  <div class="text-sm text-gray-600">
                    {{ p.sold.toLocaleString() }}
                  </div>
                </div>

                <div
                  class="w-full bg-slate-100 h-2 rounded mt-1 overflow-hidden"
                >
                  <div
                    :style="{
                      width: `${Math.round((p.sold / maxSold) * 100)}%`,
                    }"
                    class="h-2 bg-yellow-400 rounded"
                    @mouseenter="showBarTooltip($event, p)"
                    @mouseleave="hideTooltip"
                  ></div>
                </div>
              </div>
            </div>

            <div
              v-if="topProductsDisplay.length === 0"
              class="text-center text-gray-500 py-6"
            >
              Không có dữ liệu
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-medium">Top sản phẩm (bảng)</h4>
          <div class="text-sm text-gray-500">Top {{ topProducts.length }}</div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="text-sm text-gray-500 border-b">
              <tr>
                <th class="py-2 px-3">#</th>
                <th class="py-2 px-3">Sản phẩm</th>
                <th class="py-2 px-3">Số lượng</th>
                <th class="py-2 px-3">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(p, idx) in topProducts"
                :key="p.id || idx"
                class="border-b hover:bg-slate-50"
              >
                <td class="py-2 px-3">{{ idx + 1 }}</td>
                <td class="py-2 px-3 flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded overflow-hidden bg-slate-100 flex items-center justify-center"
                  >
                    <img
                      v-if="p.imageUrl"
                      :src="p.imageUrl"
                      alt=""
                      class="object-cover w-full h-full"
                    />
                    <span v-else class="text-xs text-gray-500">No image</span>
                  </div>
                  <div>
                    <div class="font-medium">{{ p.name }}</div>
                    <div class="text-xs text-gray-400">
                      {{ p.id ? "#" + p.id : "" }}
                    </div>
                  </div>
                </td>
                <td class="py-2 px-3">{{ p.sold.toLocaleString() }}</td>
                <td class="py-2 px-3">{{ formatCurrency(p.revenue) }}</td>
              </tr>

              <tr v-if="topProducts.length === 0">
                <td colspan="4" class="py-4 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="text-xs text-gray-400">Dữ liệu: {{ dataSourceLabel }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRuntimeConfig } from "#app";
import { useAuthStore } from "~/store/auth";
import clientAPI from "~/services/_AxiosConfig";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

// SVG layout constants
const LINE_W = 900;
const LINE_H = 300;
const padding = 40;
const padTop = 20;
const padBottom = 40;
const gridStep = (LINE_H - padTop - padBottom) / 4;

type TopProduct = {
  id?: number;
  name: string;
  sold: number;
  revenue: number;
  imageUrl?: string | null;
};

const months = ref<number>(12);
const loading = ref(true);
const dataSourceLabel = ref("Dữ liệu từ API");

const summary = ref({ totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 });
const labels = ref<string[]>([]);
const thisYear = ref<number[]>([]);
const lastYear = ref<number[]>([]);
const topProducts = ref<TopProduct[]>([]);

const config = useRuntimeConfig();
const apiBase = config.public?.apiBase || "http://localhost:3000/api";

const authStore = useAuthStore();

// monthly revenue (last entry of thisYear)
const monthlyRevenue = computed(() => {
  if (!thisYear.value.length) return 0;
  return thisYear.value[thisYear.value.length - 1] ?? 0;
});

// ---------- Month picker & comparison ----------
const selectedMonthIndex = ref<number | null>(null);

watch(
  [labels, thisYear],
  () => {
    if (labels.value.length > 0) {
      if (selectedMonthIndex.value === null) {
        selectedMonthIndex.value = labels.value.length - 1;
      } else {
        selectedMonthIndex.value = Math.min(
          selectedMonthIndex.value,
          labels.value.length - 1
        );
      }
    } else {
      selectedMonthIndex.value = null;
    }
  },
  { immediate: true }
);

const selectedMonthLabel = computed(() => {
  if (selectedMonthIndex.value === null) return "";
  return labels.value[selectedMonthIndex.value] ?? "";
});

const selectedMonthRevenue = computed(() => {
  if (selectedMonthIndex.value === null) return 0;
  return Number(thisYear.value[selectedMonthIndex.value] ?? 0);
});

const previousMonthRevenue = computed(() => {
  if (selectedMonthIndex.value === null) return 0;
  const idx = selectedMonthIndex.value - 1;
  if (idx < 0) return 0;
  return Number(thisYear.value[idx] ?? 0);
});

const changeValue = computed(
  () => selectedMonthRevenue.value - previousMonthRevenue.value
);
const changePercent = computed(() => {
  const prev = previousMonthRevenue.value;
  if (prev === 0) return selectedMonthRevenue.value === 0 ? 0 : 100;
  return Math.round((changeValue.value / prev) * 100);
});
const changeIsPositive = computed(() => changeValue.value >= 0);
const changeSign = computed(() => (changeIsPositive.value ? "+" : "−"));
const changePercentLabel = computed(() => `${changePercent.value}%`);

// ---------- formatting ----------
function formatCurrency(v: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(v);
}

// fetch from API using clientAPI + auth headers
async function fetchReport(m = 12) {
  loading.value = true;
  try {
    const headers = authStore.getAuthHeaders ? authStore.getAuthHeaders() : {};
    const res = await clientAPI().get(
      `${apiBase.replace(/\/api\/?$/, "")}/api/admin/reports?months=${m}`,
      { headers }
    );
    const data = res.data ?? res;

    // Nếu API trả object thì dùng, nếu không thì giữ rỗng
    if (data && typeof data === "object") {
      labels.value = Array.isArray(data.monthly?.labels)
        ? data.monthly.labels
        : [];
      thisYear.value = Array.isArray(data.monthly?.thisYear)
        ? data.monthly.thisYear.map(Number)
        : [];
      lastYear.value = Array.isArray(data.monthly?.lastYear)
        ? data.monthly.lastYear.map(Number)
        : [];
      topProducts.value = Array.isArray(data.topProducts)
        ? data.topProducts.map((p: any) => ({
            id: p.id,
            name: p.name ?? `#${p.id ?? ""}`,
            sold: Number(p.sold ?? 0),
            revenue: Number(p.revenue ?? 0),
            imageUrl: p.imageUrl ?? null,
          }))
        : [];

      summary.value = {
        totalRevenue: Number(
          data.summary?.totalRevenue ??
            thisYear.value.reduce((a, b) => a + b, 0)
        ),
        totalOrders: Number(data.summary?.totalOrders ?? 0),
        avgOrderValue: Number(data.summary?.avgOrderValue ?? 0),
      };

      dataSourceLabel.value = "Dữ liệu từ API";
    } else {
      // nếu API không trả đúng object -> set rỗng
      labels.value = [];
      thisYear.value = [];
      lastYear.value = [];
      topProducts.value = [];
      summary.value = { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 };
      dataSourceLabel.value = "Không có dữ liệu";
    }
  } catch (err) {
    console.warn("fetchReport error", err);
    // Khi lỗi gọi API: set dữ liệu rỗng để UI hiển thị "Không có dữ liệu"
    labels.value = [];
    thisYear.value = [];
    lastYear.value = [];
    topProducts.value = [];
    summary.value = { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 };
    dataSourceLabel.value = "Lỗi khi lấy dữ liệu";
  } finally {
    loading.value = false;
  }
}

// ---------- SVG helper functions ----------
function pointsFromArray(arr: number[]) {
  const n = arr.length || 1;
  const w = LINE_W - padding * 2;
  const max = Math.max(...arr, 1);
  const min = 0;
  const range = Math.max(1, max - min);
  return arr.map((v, i) => {
    const x = padding + (i / Math.max(1, n - 1)) * w;
    const y = padTop + (1 - (v - min) / range) * (LINE_H - padTop - padBottom);
    return { x, y, v };
  });
}
const thisYearPoints = computed(() => pointsFromArray(thisYear.value));
const lastYearPoints = computed(() => pointsFromArray(lastYear.value));

function xForIndex(i: number) {
  const n = labels.value.length || 1;
  const w = LINE_W - padding * 2;
  return padding + (i / Math.max(1, n - 1)) * w;
}
function linePath(points: { x: number; y: number }[]) {
  if (!points.length) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}
function areaPath(points: { x: number; y: number; v?: number }[]) {
  if (!points.length) return "";
  const top = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  const last = points[points.length - 1];
  const first = points[0];
  const baseY = LINE_H - padBottom;
  return `${top} L ${last.x.toFixed(2)} ${baseY} L ${first.x.toFixed(
    2
  )} ${baseY} Z`;
}

/** =========================
 * Top products helpers
 * ========================= */
const topProductsDisplay = computed(() => topProducts.value.slice(0, 8));
const maxSold = computed(() =>
  Math.max(1, ...topProductsDisplay.value.map((p) => p.sold))
);

// CSV export
function exportCSV() {
  const rows = topProducts.value.map((p, idx) => [
    idx + 1,
    p.name,
    p.sold,
    p.revenue,
  ]);
  const headers = ["#", "Sản phẩm", "Số lượng", "Doanh thu"];
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `top-products-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** =========================
 * Tooltip (absolute) for SVG & bars
 * ========================= */
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  label: "",
  value: 0,
  note: "",
});

function hideTooltip() {
  tooltip.value.visible = false;
}
function showPointTooltip(
  p: { x: number; y: number; v?: number },
  idx: number,
  which: "this" | "last"
) {
  const rect = (
    document.querySelector('[ref="lineWrapper"]') as HTMLElement
  )?.getBoundingClientRect();
  tooltip.value = {
    visible: true,
    x: p.x + 10,
    y: p.y - 10,
    label: labels.value[idx] ?? "",
    value: Math.round(Number(p.v ?? 0)),
    note: which === "this" ? "Năm nay" : "Năm trước",
  };
}
function showBarTooltip(ev: MouseEvent, prod: TopProduct) {
  const target = ev.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  tooltip.value = {
    visible: true,
    x: rect.right - 100,
    y: rect.top - 8,
    label: prod.name,
    value: prod.sold,
    note: `Doanh thu: ${formatCurrency(prod.revenue)}`,
  };
}

/** =========================
 * Actions / lifecycle
 * ========================= */
function refresh() {
  fetchReport(months.value);
}

onMounted(() => {
  fetchReport(months.value);
});

watch(months, (v) => {
  fetchReport(v);
});

const tooltipStyle = computed(() => {
  return {
    position: "absolute",
    left: `${tooltip.value.x}px`,
    top: `${tooltip.value.y}px`,
    transform: "translate(-50%, -100%)",
  };
});
</script>

<style scoped>
svg {
  display: block;
  width: 100%;
  height: 100%;
}
/* tooltip absolute positioning */
[ref="lineWrapper"] > div[style] {
  position: absolute;
}
/* small styling */
.bg-yellow-400 {
  background-color: #fde68a;
}
select {
  min-width: 140px;
}
</style>
