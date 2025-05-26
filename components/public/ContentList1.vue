<template>
  <section class="layout">
    <!-- Subtitle and Title Section -->
    <div class="home-header2-block">
      <p class="home-header2-subtitle">Subtitle goes here</p>
      <h1 class="home-header2-title">Features</h1>
    </div>

    <div class="card-grid">
      <div class="card-item with-right-border">
        <div class="icon">
          <img
            src="https://cdn.sanity.io/images/9aznesrq/production/cb90801dfd337d6b9690d91e710942451fc8c8b1-600x600.svg"
            alt="icon"
          />
        </div>
        <div class="card-info">
          <h3 class="card-title">Card Title 1</h3>
          <p class="card-description">Card description goes here.</p>
        </div>
      </div>

      <div class="card-item with-right-border">
        <div class="icon">
          <img
            src="https://cdn.sanity.io/images/9aznesrq/production/c52a436a49f364f04afadc96130b1c19e7ac1f0a-600x600.svg"
            alt="icon"
          />
        </div>
        <div class="card-info">
          <h3 class="card-title">Card Title 2</h3>
          <p class="card-description">Card description goes here.</p>
        </div>
      </div>

      <div class="card-item">
        <div class="icon">
          <img
            src="https://cdn.sanity.io/images/9aznesrq/production/4e1dd35883b2bdfaa849e91ddf9183a7f35977b7-600x600.svg"
            alt="icon"
          />
        </div>
        <div class="card-info">
          <h3 class="card-title">Card Title 3</h3>
          <p class="card-description">Card description goes here.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "./reuse-styles.css";

export default {
  
};
</script>

<style scoped>
.layout {
  margin: 110px auto;
}
@media screen and (max-width: 850px) {
  .layout {
    margin: 90px auto;
  }
}

.card-title {
  font-weight: 600;
  font-size: 1.3rem;
  margin: 48px 0 14px;
}
@media screen and (max-width: 850px) {
  .card-title {
    margin: 0;
  }
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.card-item {
  padding: 3rem 2rem;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.3s ease;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

/* DESKTOP */
@media screen and (min-width: 851px) {
  .card-item {
    width: 33.33%;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-right: none;
  }

  .card-item.with-right-border {
    border-right: 1px solid #ddd;
  }
}

/* TABLET */
@media screen and (max-width: 850px) and (min-width: 601px) {
  .card-item {
    width: 50%;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .card-grid > .card-item:nth-child(3) {
    width: 50%;
    border-top: none;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
}

/* MOBILE */
@media screen and (max-width: 600px) {
  .card-item {
    width: 100%;
    border-top: 1px solid #ddd;
    border-bottom: none;
  }

  .card-grid > .card-item:last-child {
    border-bottom: 1px solid #ddd;
  }
}

.card-info {
  margin: 14px;
}
@media screen and (min-width: 851px) {
  .card-info {
    margin: 10px 10px 10px 20px;
  }
}

.with-right-border {
  border-right: 1px solid #ddd;
}

.icon {
  width: 80px;
}
@media screen and (max-width: 850px) {
  .icon {
    width: 70px;
  }
}
@media screen and (max-width: 600px) {
  .icon {
    width: 60px;
  }
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--black-1);
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.875rem;
  color: var(--black-3);
}
</style>
