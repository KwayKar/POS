<template>
  <svg
    :width="size"
    :height="size"
    :fill="fill"
    viewBox="0 0 187.5 187.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="layer1">
      <g id="g2388" transform="translate(-527.55 -379)">
        <rect
          id="rect2352"
          style="stroke-linejoin:round;stroke:#000000;stroke-linecap:round;stroke-width:3.1212;fill:#ffffff"
          rx="10"
          ry="10"
          height="58.321"
          width="145.8"
          y="448.86"
          x="547.3"
        />
        <rect
          id="rect2356"
          style="stroke-linejoin:round;stroke:#000000;stroke-linecap:round;stroke-width:3.1212;fill:#ffffff"
          height="39.464"
          width="87.326"
          y="498.72"
          x="576.54"
        />
        <path
          id="path2358"
          style="stroke:#000000;stroke-linecap:round;stroke-width:4.0576;fill:none"
          d="m561.88 468.75h115.32"
        />
        <rect
          id="rect2360"
          style="stroke-linejoin:round;stroke:#000000;stroke-linecap:round;stroke-width:3.1212;fill:#ffffff"
          height="44.549"
          width="87.482"
          y="404.06"
          x="576.46"
        />
        <path
          id="path2362"
          style="stroke:#000000;stroke-width:2.0808;fill:none"
          d="m587.07 527.07h66.27"
        />
        <path
          id="path2364"
          style="stroke:#000000;stroke-width:2.0808;fill:none"
          d="m587.07 520.44h66.27"
        />
        <path
          id="path2366"
          style="stroke:#000000;stroke-width:2.0808;fill:none"
          d="m587.07 513.81h66.27"
        />
        <path
          id="path2368"
          style="stroke:#000000;stroke-width:2.0808;fill:none"
          d="m587.07 507.19h66.27"
        />
      </g>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  fill: {
    type: String,
    default: 'none',
  },
});
</script>
