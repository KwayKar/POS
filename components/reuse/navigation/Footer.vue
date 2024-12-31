<template>
    <footer class="footer">
        <div class="footer-header">
            This is Coda.
        </div>
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
  
      <div class="footer-bottom">
        <p>&copy; 2024 My Company. All Rights Reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  }
  </script>
  
  <style scoped>
  
  /* Styling for footer */
  .footer {
    position: fixed;
    bottom: 0;
    left:   0 ;
    right:0;
    width: 100%; 
    background-color: #1a1a1a;
    color: white;
    padding: 20px 0;
    font-size: 14px;
    border-radius: 30px;
    margin: 0 auto;
    max-width: 1500px;
    overflow: hidden;
    box-sizing: border-box;
  }

        /* Footer Header Styles */
        .footer-header {
  padding-top: 0px;
  padding-right: 30px; /* Adjust right padding */
  padding-bottom: 20px; /* Adjust bottom padding */
  padding-left: 30px;  /* Adjust left padding */
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  color: #f4f4f4;
  margin-bottom: 30px;
  border-bottom: 1px solid #333;
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
    padding-top: 10px;
  }
  
  .footer-bottom p {
    margin: 0;
    font-size: 14px;
    color: #aaa;
  }
  
  /* Media Queries for Responsiveness */
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .footer-section {
      text-align: left;
      margin-bottom: 20px;
      min-width: unset; /* Remove min-width for smaller screens */
    }
  
    .footer-bottom {
      margin-top: 40px;
      text-align: left;
      padding-left: 20px;
    }

    .footer-header {
      text-align: left;  /* Align header text to the right on mobile */
      padding-left: 20px;
      padding-right: 20px;
  }

   /* Adjust spacing and padding */
   .footer-section h4 {
      text-align: left; /* Align headers to the right on mobile */
    }

    .footer-section a {
      font-size: 14px;
      line-height: 1.8;
    }

  }
  </style>
  
  
