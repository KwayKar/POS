<template>
  <div>
    <div class="filter-section">
      <Button
        @click="$emit('filter-order', '')"
        style="border: 1px solid var(--gray-2)"
        class="category-btn"
        variant="secondary"
      >
        All
      </Button>
      <Button
        @click="$emit('filter-order', 'new')"
        style="border: 1px solid var(--gray-2)"
        class="category-btn"
        variant="secondary"
      >
        New
      </Button>
      <Button
        @click="$emit('filter-order', 'processing')"
        style="border: 1px solid var(--gray-2)"
        class="category-btn"
        variant="secondary"
      >
        Processing
      </Button>
      <Button
        @click="$emit('filter-order', 'ready')"
        style="border: 1px solid var(--gray-2)"
        class="category-btn"
        variant="secondary"
      >
        Ready
      </Button>
      <Button
        @click="$emit('filter-order', 'Completed')"
        style="border: 1px solid var(--gray-2)"
        class="category-btn"
        variant="secondary"
      >
        Completed
      </Button>
      <Button
        @click="$emit('filter-order', 'cancelled')"
        style="border: 1px solid var(--gray-2)"
        class="category-btn"
        variant="secondary"
      >
        Cancelled
      </Button>
    </div>

    <div class="wrap-table bg-white w-full">
      <div class="table-container overflow-x-auto">
        <table class="table min-w-[800px]">
          <thead class="tableHeader bg-gray-100">
            <tr>
              <th class="tableHeaderCol" @click="sortBy('id')">ID</th>
              <th class="tableHeaderCol" @click="sortBy('type')">
                Type
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
              <th class="tableHeaderCol" @click="sortBy('totalAmount')">
                Total Amount
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
              <th class="tableHeaderCol" @click="sortBy('status')">
                Status
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
              <th class="tableHeaderCol" @click="sortBy('createdAt')">
                Ordered At
                <div class="th-sort-arrow">
                  <Icons icon="DropDownArrow" fillColor="black" scale="1.5" />
                </div>
              </th>
              <th class="tableHeaderCol" style="text-align: right"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-t"
              @click="openModal(order)"
            >
              <td class="px-6 py-3">{{ order?.id }}</td>
              <td class="px-6 py-3">{{ order?.orderType }}</td>
              <td class="px-6 py-3">{{ order?.totalAmount }}</td>
              <td class="px-6 py-3">{{ order?.status }}</td>
              <td class="px-6 py-3">{{ formatDate(order?.createdAt) }}</td>
              <td class="px-6 py-3" style="text-align: right">
                <button
                  @click.stop="$emit('edit-order', 'edit', order)"
                  class="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  @click.stop="$emit('edit-order', 'delete', order)"
                  class="ml-4 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="orders.length === 0">
              <td colspan="6" class="px-6 py-7 text-center text-gray-500">
                No order available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal
      v-if="modal.isOpen"
      isOpen="modal.isOpen"
      :width="modalWidth"
      @close="closeModal"
    >
      <OrderDetails :order="modal.order" @close="closeModal" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Icons from "~/components/reuse/icons/Icons.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import OrderDetails from "./OrderDetails.vue";
import { useOrder } from "~/stores/order/useOrder";

const orderStore = useOrder();

defineProps({
  orders: {
    type: Object,
    required: true,
  },
});

const modal = ref({
  isOpen: false,
  order: null,
});
const windowWidth = ref(null);

function openModal(order) {
  modal.value.order = order;
  modal.value.isOpen = true;
  orderStore.setSelectedOrderID(order.id);
}

function closeModal() {
  modal.value.isOpen = false;
  modal.value.order = null;
}

function handleResize() {
  windowWidth.value = window.innerWidth;
}

const sortOrder = ref("asc");
function sortBy(key) {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  if (key === "totalAmount") {
    orderStore.orders.sort((a, b) => {
      if (sortOrder.value === "asc") {
        return a.totalAmount - b.totalAmount;
      } else {
        return b.totalAmount - a.totalAmount;
      }
    });
  } else if (key === "createdAt") {
    orderStore.orders.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (sortOrder.value === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  } else if (key === "status") {
    orderStore.orders.sort((a, b) => {
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();
      if (sortOrder.value === "asc") {
        return statusA > statusB ? 1 : statusA < statusB ? -1 : 0; // Ascending order
      } else {
        return statusA < statusB ? 1 : statusA > statusB ? -1 : 0; // Descending order
      }
    });
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
}

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "1200px";
  } else if (windowWidth.value > 1100) {
    return `${windowWidth.value - 40}px`;
  } else {
    return `${windowWidth.value - 40}px`;
  }
});

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 16px 16px 0;
  gap: 12px;
}

.filter-section button {
  border-radius: 0.25rem;
  font-size: var(--font-size-x-small);
  color: var(--black-2);
  border-radius: 30px;
}

.order-details {
  display: flex;
  flex-wrap: wrap;
}

.wrap-table {
  overflow: hidden;
  width: 100%;
}

.order-column {
  flex: 1;
  min-width: 300px;
}

.full-width {
  width: 100%;
}

@media (max-width: 900px) {
  .order-details {
    flex-direction: column;
  }
}

.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0 20px;
  box-sizing: border-box;
  background: var(--primary-bg-color-1);
}

.table tr:nth-child(even) {
  background-color: var(--table-stripe);
}

/* th:nth-child(1) { width: 10%; } 
th:nth-child(2) { width: 20%; } 
th:nth-child(3) { width: 15%; }  
th:nth-child(4) { width: 20%; }  
th:nth-child(5) { width: 15%; }  
th:nth-child(6), th:nth-child(7) { width: 10%; text-align: right; }  */
</style>
