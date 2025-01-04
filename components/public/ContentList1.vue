<template>
  <section class="p-8 my-8 layout">
    <!-- Subtitle and Title Section -->
    <div class="text-center mb-8">
      <p class="text-gray-500 text-sm subtitle">Subtitle goes here</p>
      <h1 class="title">Main Title</h1>
    </div>

    <!-- Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="relative bg-gray-100 p-6 rounded-lg overflow-hidden group hover:bg-gray-200 transition duration-300 card-item"
      >
        <div
          class="absolute top-4 right-4 text-blue-600 text-2xl"
          style="width: 60px; height: 60px"
        >
          <svg
            viewBox="0 0 26 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.93512 23.0659H17.508C19.3499 23.0659 20.8483 21.7143 20.8483 20.0528V9.93867H16.7274V7.12052C16.7274 5.94789 15.7731 4.99362 14.6005 4.99362H10.843C9.67033 4.99362 8.71605 5.94789 8.71605 7.12052V9.93867H4.59518V20.0528C4.59518 21.7143 6.09356 23.0659 7.93546 23.0659H7.93512ZM10.1336 7.12088C10.1336 6.72988 10.4516 6.41191 10.8426 6.41191H14.6001C14.9911 6.41191 15.3091 6.72988 15.3091 7.12088V9.93903H10.1336V7.12088ZM19.43 11.357V20.0532C19.43 20.9326 18.5675 21.6483 17.5076 21.6483H7.93477C6.87486 21.6483 6.01238 20.9326 6.01238 20.0532V11.357H19.43Z"
              fill="currentColor"
            ></path>
            <path
              d="M6.62851 27.09C8.30203 27.7026 10.2949 28 12.7214 28C17.2609 28 20.4509 26.9206 22.4732 24.6998C23.4442 23.6335 24.1556 22.3134 24.6476 20.6639C25.1116 19.1088 25.3715 17.2868 25.442 15.0939V12.9068C25.3715 10.7139 25.1113 8.89188 24.6476 7.3364C24.1556 5.68663 23.4442 4.36654 22.4732 3.30025C20.4509 1.0794 17.2609 0 12.7214 0C10.2949 0 8.30203 0.297764 6.62851 0.909958C5.00001 1.50585 3.72137 2.38107 2.71888 3.58525C0.863868 5.8139 0 9.12336 0 14C0 18.8766 0.863868 22.1861 2.71888 24.4147C3.72137 25.6189 5.00001 26.4941 6.62851 27.09ZM1.55121 14C1.55121 11.7483 1.74016 9.89755 2.12867 8.34208C2.5186 6.78128 3.10172 5.54981 3.91101 4.57745C4.73377 3.58915 5.79686 2.86565 7.16162 2.36654C8.64053 1.82524 10.5112 1.55087 12.7214 1.55087C14.9316 1.55087 16.6547 1.80397 18.1014 2.30273C19.441 2.76462 20.4959 3.43247 21.3265 4.34456C22.1372 5.23467 22.7373 6.35838 23.1613 7.77951C23.5856 9.20241 23.8245 10.8915 23.8915 12.944V15.0564C23.8245 17.1085 23.586 18.7979 23.1613 20.2208C22.7373 21.6423 22.1372 22.7657 21.3265 23.6558C20.4959 24.5679 19.441 25.2357 18.1014 25.6976C16.6547 26.1964 14.8447 26.4495 12.7214 26.4495C10.598 26.4495 8.64053 26.1751 7.16162 25.6338C5.79721 25.1343 4.73377 24.4112 3.91101 23.4229C3.10172 22.4505 2.5186 21.2191 2.12867 19.6583C1.74016 18.1028 1.55121 16.2524 1.55121 14.0004V14Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <h3 class="card-title">
          {{ card.title }}
        </h3>

        <p class="text-sm text-gray-600">
          {{ card.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import "./reuse-styles.css";

export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          icon: "fas fa-star",
          title: "Card One",
          description: "This is the description for card one.",
        },
        {
          id: 2,
          icon: "fas fa-heart",
          title: "Card Two",
          description: "This is the description for card two.",
        },
        {
          id: 3,
          icon: "fas fa-rocket",
          title: "Card Three",
          description: "This is the description for card three.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.layout {
  max-width: 1600px;
  margin: 0 auto;
}
.card-item {
  min-height: 275px;
}
.card-title {
  font-weight: 600;
  font-size: 1.3rem;
  margin: 68px 0 14px;
}
</style>
