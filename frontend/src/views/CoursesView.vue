<script setup>
import DataTable from '../components/DataTable.vue'
import FeedbackMessage from '../components/FeedbackMessage.vue'
import { reactive, onMounted } from 'vue'
import { useCourseStore } from '../stores/courses'
const store = useCourseStore()
const form = reactive({
    id: '', name: '', 
})
const columns = [
    { key: 'id', label: 'Course ID'},
    { key: 'name', label: 'Course Name' }
]
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
        <DataTable
            v-if="!store.loading || store.courses.length > 0"
            :columns="columns"
            :rows="store.courses"
            emptyMessage="No courses are available at this time. Please add a course."
        >
            <template #actions="{ row }">
                <button
                    type="button"
                    :disabled="store.loading"
                    @click="removeCourse(row.id)"
                >
                    Delete
                </button>
            </template>
        </DataTable>
    </section>
    <FeedbackMessage
        :loading="store.loading"
        :error="store.error"
        :message="store.message"
    />
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
</style>