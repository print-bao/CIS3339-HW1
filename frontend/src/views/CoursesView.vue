<script setup>
import { reactive, onMounted } from 'vue'
import { useCourseStore } from '../stores/courses'
const store = useCourseStore()
const form = reactive({
    id: '', name: '', 
})
onMounted(() => {
    store.fetchCourses()
})
async function submitCourse(){
    const success = await store.addCourse({ ...form })
    if (success) {
        Object.assign(form, {id: '', name: ''})
    }
}
async function removeCourse(id){
    if (confirm('Are you sure you would like to delete this course?')){
        await store.deleteCourse(id)
    }
}
</script>
<template>
    <h1>Course Management</h1>
    <section>
        <h2>Add a Course</h2>
        <form @submit.prevent="submitCourse">
            <label>Course ID</label>
            <input v-model.trim="form.id" placeholder="Enter a Course ID" required />
            <label>Course Name</label>
            <input v-model.trim="form.name" placeholder="Enter a Course Name" required />
            <button :disabled="store.loading">
                Add Course
            </button>
        </form>
    </section>
    <section>
        <h2>All Courses</h2>
        <p v-if="!store.loading && store.courses.length === 0">
            No courses are available. Please add a course.
        </p>
        <table v-if="store.courses.length > 0">
            <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="course in store.courses" :key="course.id">
                    <td>{{ course.id }}</td>
                    <td>{{ course.name }}</td>
                    <td>
                        <button type="button" :disabled="store.loading" @click="removeCourse(course.id)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <p v-if="store.loading">Loading...</p>
    <p v-if="store.error" class="error">{{  store.error }} </p>
    <p v-if="store.message" class="success">{{ store.message }}</p>
</template>
<style scoped>
section{
    margin-bottom: 30px;
}
form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
}
input{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button{
    padding: 10px 16px;
    background: #b91c1c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}
table{
    border-collapse: collapse;
    margin-top: 20px;
    width: 100%
}
th, td{
    padding: 12px;
    border: 1px solid #ccc;
    text-align: left;
}
th{
    background: #f2f2f2;
}
.error{
    color: red;
}
.success{
    color: green;
}
</style>