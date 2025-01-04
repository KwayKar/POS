<template>
  <svg
    v-if="path.length > 0"
    viewBox="0 0 24 24"
    :fill="fillColor"
    :style="{ backgroundColor: backgroundColor }"
    class="w-[20px] h-[20px]"
  >
    <path
      v-for="(pathData, index) in path"
      :key="index"
      :d="pathData"
      :fill="fillColor" 
    />
  </svg>
</template>

<script>
const svgPaths = {
  Trash: [
        "M20.5 4h-3.64l-.69-2.06a1.37 1.37 0 0 0-1.3-.94h-4.74a1.37 1.37 0 0 0-1.3.94L8.14 4H4.5a.5.5 0 0 0 0 1h.34l1 17.59A1.45 1.45 0 0 0 7.2 24h10.6a1.45 1.45 0 0 0 1.41-1.41L20.16 5h.34a.5.5 0 0 0 0-1zM9.77 2.26a.38.38 0 0 1 .36-.26h4.74a.38.38 0 0 1 .36.26L15.81 4H9.19zm8.44 20.27a.45.45 0 0 1-.41.47H7.2a.45.45 0 0 1-.41-.47L5.84 5h13.32z",
        "M9.5 10a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5zM12.5 9a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5zM15.5 10a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5z"
    ],
};

export default {
  name: "Icons",
  props: {
    icon: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "transparent", 
    },
    fillColor: {
      type: String,
      default: "#fff"
    },
  },
  computed: {
    path() {
      return svgPaths[this.icon] || null;
    },
  },
};
</script>

