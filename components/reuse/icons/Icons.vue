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
    "M9.5 10a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5zM12.5 9a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5zM15.5 10a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5z",
  ],
  Discount: [
    "m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42M13 20.01 4 11V4h7v-.01l9 9zM7 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"
  ],
  Pause: [
    "M9 16h2V8H9zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m1-4h2V8h-2z"
  ],
  Close: [
    "M14.59 8 12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
  ],
  Cross: [
    "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  ]
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
      default: "#fff",
    },
  },
  computed: {
    path() {
      return svgPaths[this.icon] || null;
    },
  },
};
</script>
