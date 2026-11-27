<script setup>

import {RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <h1>Student Management System</h1>
    <nav>
      <RouterLink to="/">Students</RouterLink>
      <RouterLink to="/courses">Courses</RouterLink>
      <RouterLink to="/enrollments">Enrollments</RouterLink>
    </nav>
  </header>
  <main class="page-container">
    <RouterView />
  </main>
</template>
<style>
* {
  box-sizing: border-box;
}
body{
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}
header{
  background-color: #c8102e;
  color: white;
  padding: 20px;
}
header h1{
  margin: 0 0 20px;
  font-size: 26px;
  text-align: center;
}
nav{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}
nav a{
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}
nav a:hover{
  background-color: #a50d26;
}
nav a.router-link-exact-active{
  background-color: white;
  color: #c8102e;
}
.page-container{
  max-width: 1100px;
  margin: 30px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
@media (max-width: 600px){
  header h1{
    font-size: 20px;
  }
  nav{
    gap: 5px;
  }
  nav a{
    padding: 8px 12px;
    font-size: 14px;
  }
  .page-container{
    margin: 15px;
    padding: 15px;
  }
}
</style>