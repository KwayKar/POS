<template>
  <footer class="footer box-border">
    <div 
      class="footer-content container m-auto max-w-[var(--full-width-panel-size)] px-4 py-6" 
    >
    <div class="footer-header">Kway Kar</div>
    
    <div class="footer-container">
      <div class="footer-section">
        <h4>Product</h4>
        <ul>
          <li><a href="#">Docs</a></li>
          <li><a href="#">Templates</a></li>
          <li><a href="#">Integrations</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Community</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom flex justify-center items-center h-10 pt-5">
      <p>&copy; 2024 My Company. All Rights Reserved.</p>
    </div>
  </div>
  </footer>
  
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>

.footer {
  width: 100%;
  color: white;
  padding: 20px 0;
  font-size: 14px;
  overflow: hidden;
  box-sizing: border-box;
}

.footer-header {
  padding: 30px;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  color: #f4f4f4;
  margin-bottom: 30px;
  border-bottom: 1px solid #333;
}

.footer-content {
  background-color: #1a1a1a; border-radius: var(--site-border-radius)
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  padding: 0 30px;
  width: 100%;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  padding-right: 20px;
}

.footer-section h4 {
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 16px;
  letter-spacing: 1px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #f4f4f4;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 14px;
}

.footer-section a:hover {
  color: #4d90fe;
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  border-top: 1px solid #333;
}

.footer-bottom p {
  margin: 0;
  font-size: 14px;
  color: #aaa;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-section {
    text-align: left;
    margin-bottom: 20px;
  }

  .footer-bottom {
    margin-top: 40px;
    text-align: left;
    padding-left: 20px;
  }

  .footer-header {
    text-align: left; 
    padding-left: 20px;
    padding-right: 20px;
  }

  .footer-section h4 {
    text-align: left;
  }

  .footer-section a {
    font-size: 14px;
    line-height: 1.8;
  }
}
</style>
