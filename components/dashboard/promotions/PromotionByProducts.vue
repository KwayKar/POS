<template>
  <div class="coupon-section">
    <h2 class="header2 promotion-title">By Products</h2>

    <div class="wrap-table bg-white w-full">
      <div class="table-container overflow-x-auto">
        <table class="table">
          <thead class="test-table bg-gray-100">
            <tr>
              <th class="tableHeaderCol px-6 py-3" @click="sortBy('id')">ID</th>
              <th class="tableHeaderCol px-6 py-3" @click="sortBy('type')">
                Item
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
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
              <th class="tableHeaderCol px-4 py-3" style="text-align: right">
                Status
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in promotionByProducts"
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
import Icons from "~/components/reuse/icons/Icons.vue";
import { usePromotion } from "~/stores/promotion/usePromotion";

const promotionStore = usePromotion();
const emit = defineEmits(["delete"]);

const promotionByProducts = computed(
  () => promotionStore.getProductPromotions || []
);

function sortBy(key) {}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
</script>

<style scoped>
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
