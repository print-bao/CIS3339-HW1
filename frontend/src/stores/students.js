import { defineStore} from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useStudentStore = defineStore('students', () => {
    const student = ref(null)
    const loading = ref(false)
    const error = ref('')
    const message = ref('')
    async function request(action){
        loading.value = true
        error.value = ''
        message.value = ''

        try {
            await action()
            return true
        } catch (err){
            error.value = err.response?.data?.error || 'Unable to connect to the server'
            return false
        } finally {
            loading.value = false
        }
    }
    async function findStudent(name){
        student.value = null
        return request(async () => {
            const response = await api.post('/find-student', { name })
            student.value = response.data
        })
    }
    async function addStudent(data){
        return request(async () => {
            const response = await api.post('/add-student', data)
            message.value = response.data.message
        })
    }
    async function deleteStudent(name){
        return request(async () => {
            const response = await api.post('/delete-student', { name })
            message.value = response.data.message
            student.value = null
        })
    }
    return {
        student, loading, error, message, findStudent, addStudent, deleteStudent
    }
})