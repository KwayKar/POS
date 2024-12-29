<template>
    <div class="modal-content bg-white rounded shadow-md max-w-md mx-auto">
      <div class="p-4">
        <h2 class="text-lg font-bold mb-4 text-gray-800">Confirm Delete?</h2>
        <slot></slot>
      </div>
      <div class="p-4 flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-400 text-white font-medium rounded hover:bg-gray-500 transition duration-200"
        >
          Cancel
        </button>
        <button
          @click="$emit('remove-item')"
          class="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition duration-200 mr-2"
        >
          Confirm
        </button>
      </div>
    </div>
  </template>
  