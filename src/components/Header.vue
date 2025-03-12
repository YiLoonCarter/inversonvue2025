<template>
    <nav class="navbar navbar-expand-lg navbar-dark navbar-bgcolor">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Trade Finance Backoffice</a>
  
        <!-- Mobile Toggle Button -->
        <button 
          class="navbar-toggler" 
          type="button" 
          @click="toggleNavbar"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Navbar Items -->
        <div :class="['collapse navbar-collapse', { 'show': isNavOpen }]" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li v-for="(item, index) in navItems" :key="index" class="nav-item" :class="{ 'dropdown': item.children }">
              <div @click="toggleMenu(index)" class="nav-link d-flex justify-content-between align-items-center">
                <span><router-link class="navLink" to="/">{{ item.title }}</router-link></span>
                <!-- <span><a class="navLink" href="#">{{ item.title }}</a></span> -->
                <!-- <span>{{ item.title }}</span> -->
                <span v-if="item.children">
                  <i :class="openIndex === index ? 'fas fa-chevron-down' : 'fas fa-chevron-right'"></i>
                </span>
              </div>
  
              <!-- Child Dropdown -->
              <ul v-if="item.children && openIndex === index" class="dropdown-menu show">
                <li v-for="(child, childIndex) in item.children" :key="childIndex">
                  <span class="dropdown-item"><router-link class="navLink" to="/">{{ child }}</router-link></span>
                  <!-- <a class="dropdown-item" href="#">{{ child }}</a> -->
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>

  export default {
    data() {
      return {
        isNavOpen: false, // Track Navbar open/close
        openIndex: null,  // Track which dropdown is open
        navItems: [
          { title: "Home" },
          { title: "System" },
          { title: "Trade Finance", children: ["Import", "Export", "Guarantee", "Inquiry", "Maintenance"] },
          { title: "Parameter" },
          { title: "About Us" },
          { title: "Contact Us", children: ["Email", "Phone", "Support"] }
        ]
      };
    },
    methods: {
      toggleNavbar() {
        this.isNavOpen = !this.isNavOpen;
      },
      toggleMenu(index) {
        this.openIndex = this.openIndex === index ? null : index;
      }
    }
  };
  </script>
  
  <style>
  /* Import FontAwesome */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
  
  /* Ensure dropdown works correctly */
  .navbar .dropdown-menu {
    display: none;
    position: absolute;
    /* background-color: white; */
    background: linear-gradient(to bottom, #467BCC, #224FAF);
  }
  
  .navbar .dropdown-menu.show {
    display: block;
  }
  
  .navbar-bgcolor {
    background: linear-gradient(to bottom, #467BCC, #224FAF);
  }

  .navLink {
    text-decoration: none;
    color: wheat;
  }

  .navLink:hover {
    text-decoration: none;
    color:burlywood;
  }

  .navbar-brand {
    color: wheat;
  }
  </style>
  