<script setup>
import DataTable from '../components/DataTable.vue'
import FeedbackMessage from '../components/FeedbackMessage.vue'
import { reactive, onMounted, computed } from 'vue'
import { useEnrollmentStore } from '../stores/enrollments'
const store = useEnrollmentStore()
const form = reactive({
    studentId: '', courseId: ''
})
const columns = [
    { key: 'studentId', label: 'Student ID'},
    { key: 'studentName', label: 'Student Name'},
    { key: 'courseId', label: 'Course ID'},
    { key: 'courseName', label: 'Course Name'}
]
onMounted(() => {
    store.fetchData()
})
async function submitEnrollment(){
    const success = await store.addEnrollment({ ...form })
    if (success){
        Object.assign(form, {
            studentId: '', courseId: ''
        })
    }
}
async function removeEnrollment(studentId, courseId){
    if (confirm('Are you sure you want to remove this enrollment?')) {
        await store.deleteEnrollment(studentId, courseId)
    }
}
function getStudentName(id){
    return store.students.find(student => student.id === id)?.name || id
}
function getCourseName(id){
    return store.courses.find(course => course.id === id)?.name || id
}
const enrollmentRows = computed(() =>
    store.enrollments.map(enrollment => ({
        ...enrollment,
        studentName: getStudentName(enrollment.studentId),
        courseName: getCourseName(enrollment.courseId)
    }))
)
</script>
<template>
    <h1>Enrollment Management</h1>
    <section>
        <h2>Enroll a Student</h2>
        <form @submit.prevent="submitEnrollment">
            <label>Select Student</label>
            <select v-model="form.studentId" required>
                <option disabled value="">
                    Select a Student
                </option>
                <option
                    v-for="student in store.students"
                    :key="student.id"
                    :value="student.id"
                >
                    {{ student.name }} ({{ student.id }})
                </option>
            </select>
            <label>Select Course</label>
            <select v-model="form.courseId" required>
                <option disabled value="">
                    Select a Course
                </option>
                <option 
                    v-for="course in store.courses"
                    :key="course.id"
                    :value="course.id"
                >
                    {{  course.id  }} - {{ course.name }}
                </option>
            </select>
            <button :disabled="store.loading">
                Enroll Student
            </button>
        </form>
    </section>
    <section>
        <h2>All Enrollments</h2>
        <p v-if="!store.loading && store.enrollments.length === 0">
            No Enrollments are Available.
        </p>
        <DataTable
            v-if="!store.loading || store.enrollments.length > 0"
            :columns="columns"
            :rows="enrollmentRows"
            emptyMessage="No enrollments are available..."
        >
            <template #actions="{ row }">
                <button
                    type="button"
                    :disabled="store.loading"
                    @click="removeEnrollment(row.studentId, row.courseId)"
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
select{
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