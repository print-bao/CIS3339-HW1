<script setup>
import { reactive, onMounted } from 'vue'
import { useEnrollmentStore } from '../stores/enrollments'
const store = useEnrollmentStore()
const form = reactive({
    studentId: '', courseId: ''
})
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
        <table v-if="store.enrollments.length > 0">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="enrollment in store.enrollments"
                    :key="JSON.stringify([enrollment.studentId, enrollment.courseId])"
                >
                    <td>{{  enrollment.studentId }}</td>
                    <td>
                        {{ getStudentName(enrollment.studentId) }}
                    </td>
                    <td>{{ enrollment.courseId }}</td>
                    <td>
                        {{ getCourseName(enrollment.courseId) }}
                    </td>
                    <td>
                        <button
                            type="button" :disabled="store.loading" @click="removeEnrollment(enrollment.studentId, enrollment.courseId)"
                        >
                            Remove
                        </button>    
                    </td>
                </tr>  
            </tbody>
        </table>
    </section>
    <p v-if="store.loading">Loading...</p>
    <p v-if="store.error" class="error">
        {{  store.error }}
    </p>
    <p v-if="store.message" class="success">
        {{ store.message }}
    </p>
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
table{
    border-collapse: collapse;
    margin-top: 20px;
    width: 100%;
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