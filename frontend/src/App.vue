<script setup>

import {RouterLink, RouterView } from 'vue-router'
</script><template>
    <nav>
      <RouterLink to="/">Students</RouterLink> | 
      <RouterLink to="/courses">Courses</RouterLink> |
      <RouterLink to ="/enrollments">Enrollments</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </template>
