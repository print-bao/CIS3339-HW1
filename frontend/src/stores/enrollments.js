import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useEnrollmentStore = defineStore('enrollments', () => {
    const enrollments = ref([])
    const students = ref([])
    const courses = ref([])
    const loading = ref(false)
    const error = ref('')
    const message = ref('')

    async function request(action){
        loading.value = true
        error.value = ''
        message.value = ''
        try{
            await action()
            return true
        } catch (err){
            error.value = err.response?.data?.error || 'Unable to Connect to the Server' 
            return false
        } finally {
            loading.value = false
        }
    }
    async function fetchData(){
        return request(async () => {
            const [studentResponse, courseResponse, enrollmentResponse] = 
                await Promise.all([
                    api.get('/students'),
                    api.get('/courses'),
                    api.get('/enrollments')
                ])
            students.value = studentResponse.data
            courses.value = courseResponse.data
            enrollments.value = enrollmentResponse.data
        })
    }
    async function addEnrollment(data){
        return request(async () => {
            const response = await api.post('/enrollments', data)
            message.value = response.data.message
            const updated = await api.get('/enrollments')
            enrollments.value = updated.data
        })
    }
    async function deleteEnrollment(studentId, courseId){
        return request(async () => {
            const response = await api.delete(
                `/enrollments/${encodeURIComponent(studentId)}/${encodeURIComponent(courseId)}`
            )
            message.value = response.data.message
            const updated = await api.get('/enrollments')
            enrollments.value = updated.fetchData
        })
    }
    return{
        enrollments, students, courses, loading, error, message, fetchData, addEnrollment, deleteEnrollment
    }
})