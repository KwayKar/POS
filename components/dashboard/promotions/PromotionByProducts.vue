<template>
  <div class="coupon-section">
    <h2 class="header2 promotion-title">By Products</h2>

    <div class="wrap-table bg-white w-full">
      <div class="table-container overflow-x-auto min-w-[800px]">
        <div class="table-filters min-w-[800px]">
          <div class="filter-left">
            <div class="search-input">
              <span class="icon">🔍</span>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search orders..."
                style="height: 34px; border: 0.5px solid ghostwhite"
              />
            </div>
          </div>

          <div class="filter-right">
            <!-- Status Filter -->
            <Select
              v-model="selectedType"
              :options="[{ label: 'All', value: '' }, ...productBasedOptions]"
              @update:modelValue="handleTypeChange"
              style="
                padding: 0 14px;
                height: 36px;
                font-size: 14px;
                min-width: 200px;
                border: 1px solid var(--gray-2);
              "
            />

            <!-- Date Filter -->
            <!-- <client-only>
              <VDatePicker
                v-model.range="selectedDate"
                mode="range"
                :popover="{ visibility: 'click' }"
              >
                <template #default="{ inputValue, togglePopover }">
                  <input
                    :value="formatRange(inputValue)"
                    @click="togglePopover"
                    readonly
                    placeholder="Select date range"
                    class="date-input"
                  />
                </template>
              </VDatePicker>
            </client-only> -->
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-table bg-white w-full">
      <div class="table-container overflow-x-auto">
        <table class="table">
          <thead class="test-table bg-gray-100">
            <tr>
              <th class="tableHeaderCol px-6 py-3" @click="sortBy('id')">ID</th>
              <th class="tableHeaderCol px-6 py-3" @click="sortBy('type')">
                Item
                <!-- <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div> -->
              </th>
              <th
                class="tableHeaderCol px-6 py-3"
                @click="sortBy('totalAmount')"
              >
                Type
              </th>
              <th class="tableHeaderCol px-6 py-3" @click="sortBy('createdAt')">
                Expires At
              </th>
              <th class="tableHeaderCol px-4 py-3" style="text-align: right" @click="toggleSort('status')">
                Status
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in sortedPromotions"
              :key="item.id"
              class="border-t"
              @click="$emit('edit-item', item)"
            >
              <td class="px-6 py-3">{{ item?.id }}</td>
              <td class="px-6 py-3">{{ item?.item }}</td>
              <td class="px-6 py-3">{{ item?.subtype }}</td>
              <td class="px-6 py-3">{{ formatDate(item?.expiresAt) }}</td>
              <td class="px-6 py-3" style="text-align: right">
                <span
                  class="status-badge"
                  :class="item.isActive ? 'active' : 'inactive'"
                >
                  {{ item.isActive ? "Active" : "Inactive" }}
                </span>
              </td>
            </tr>
            <tr v-if="promotionByProducts.length === 0">
              <td colspan="6" class="px-6 py-7 text-center text-gray-500">
                No promotions available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Icons from "~/components/reuse/icons/Icons.vue";
import Select from "~/components/reuse/ui/Select.vue";
import { usePromotion } from "~/stores/promotion/usePromotion";
import { productBasedOptions } from "./promotionTypes";

const promotionStore = usePromotion();
const emit = defineEmits(["delete"]);

const searchQuery = ref("");
const selectedType = ref("");
const selectedDate = ref({
  start: null,
  end: null,
});
const showSelect = ref(false);
const page = ref(1);
const hasMore = ref(true);
const isLoading = ref(false);
const sortDirection = ref("asc");
const sortField = ref("status");
const tableRef = ref(null);

const promotionByProducts = computed(
  () => promotionStore.getProductPromotions || []
);

function sortBy(key) {}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

function handleTypeChange(value) {
  selectedType.value = value;
};

const loadMore = async () => {
  if (!hasMore.value || isLoading.value) return;
  isLoading.value = true;

  await promotionStore.loadMoreProductPromotions(page.value); // Adjust to your store function
  page.value += 1;

  if (promotionStore.noMorePromotions) {
    hasMore.value = false;
  }

  isLoading.value = false;
};

const handleScroll = (e) => {
  const target = e.target;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
    loadMore();
  }
};

onMounted(async () => {
  // select cannot open - clashing with v-calendar unless wait for a sec
  setTimeout(() => {
    showSelect.value = true;
  }, 50);

  const container = tableRef.value;
  if (container) {
    container.addEventListener("scroll", handleScroll);
  }
});

onBeforeUnmount(() => {
  const container = tableRef.value;
  if (container) {
    container.removeEventListener("scroll", handleScroll);
  }
});

const debouncedSearch = debounce((keyword, newType) => {
  promotionStore.searchPromotionsApi({keyword: keyword, subtype: newType});
}, 300);

watch([searchQuery, selectedType], ([newQuery, newType]) => {
  debouncedSearch(newQuery, newType);
});


function toggleSort(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
};

const sortedPromotions = computed(() => {
  const list = promotionStore.getProductPromotions;
  if (!list?.length) return [];

  const field = sortField.value;
  const dir = sortDirection.value === "asc" ? 1 : -1;

  return [...list].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal == null) return 1 * dir;
    if (bVal == null) return -1 * dir;

    if (aVal < bVal) return -1 * dir;
    if (aVal > bVal) return 1 * dir;
    return 0;
  });
});


</script>

<style scoped>
.table-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  flex-wrap: wrap;
  border: 1px solid var(--gray-1);
  border-bottom: 0px solid var(--gray-1);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background: var(--white-1);
}

.filter-left {
  flex: 1;
  min-width: 200px;
}

.wrap-table {
  width: 100%;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input .icon {
  position: absolute;
  left: 10px;
  color: #999;
  font-size: 16px;
}

.search-input input {
  padding: 5px 5px 5px 32px;
  width: 100%;
  border: 1px solid var(--gray-1);
  outline: 1px solid var(--gray-1);
  border-radius: 6px;
  font-size: 14px;
  max-width: 300px;
}

.search-input input:focus {
  border: 1px solid var(--green-1);
  outline: 1px solid var(--green-1) !important;
  outline-offset: 1px;
}

.promotion-title {
  margin-bottom: 16px;
}
th {
  cursor: pointer;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
  text-transform: capitalize;
}

.status-badge.active {
  color: var(--white-1);
  font-weight: 600;
  background: #72bb92;
}

.status-badge.inactive {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
