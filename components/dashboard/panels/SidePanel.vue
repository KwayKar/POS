<template>
  <nav class="w-[100px] flex flex-col items-center py-4 space-y-6">
    <button class="text-white hover:bg-gray-700 p-3 rounded w-[80px]">
      <div class="flex flex-col items-center">
        <div class="w-[30px] h-[30px] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            class="fill-white"
            tabindex="-1"
            title="People"
            fill="#fff"
          >
            <path
              d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"
            ></path>
          </svg>
        </div>
      </div>
      <span class="text-xs mt-1">Customers</span>
    </button>

    <button class="text-white hover:bg-gray-700 p-3 rounded w-[80px]">
      <div class="flex flex-col items-center">
        <div class="w-[30px] h-[30px] flex items-center justify-center">
          <svg viewBox="0 0 24 24" tabindex="-1" title="Receipt" fill="#fff">
            <path
              d="M18 17H6v-2h12zm0-4H6v-2h12zm0-4H6V7h12zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2z"
            ></path>
          </svg>
        </div>
      </div>
      <span class="text-xs mt-1">Orders</span>
    </button>

    <button class="text-white hover:bg-gray-700 p-3 rounded w-[80px]">
      <div class="flex flex-col items-center">
        <div class="w-[30px] h-[30px] flex items-center justify-center">
          <svg viewBox="0 0 24 24" tabindex="-1" title="Loyalty" fill="#fff">
            <path
              d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42M5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7m11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77"
            ></path>
          </svg>
        </div>
      </div>
      <span class="text-xs mt-1">Loyalty</span>
    </button>

    <button class="text-white hover:bg-gray-700 p-3 rounded">
      <i class="fas fa-users"></i>
    </button>
  </nav>
</template>

<style>
.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container svg {
  fill: white;
}
</style>
