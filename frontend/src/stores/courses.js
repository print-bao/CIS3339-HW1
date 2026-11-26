import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useCourseStore = defineStore('courses', () => {
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
            error.value = err.response?.data?.error || 'Unable to connect to the server'
            return false
        } finally {
            loading.value = false
        }
    }
    async function fetchCourses(){
        return request(async () => {
            const response = await api.get('/courses')
            courses.value = response.data
        })
    }
    async function addCourse(data){
        return request(async () => {
            const response = await api.post('courses', data)
            const updated = await api.get('/courses')
            courses.value = updated.data
            message.value = response.data.message
        })
    }
    async function deleteCourse(id){
        return request(async () => {
            const response = await api.delete(`/courses/${encodeURIComponent(id)}`)
            const updated = await api.get('/courses')
            courses.value = updated.data
            message.value = response.data.message
        })
    }
    return{ courses, loading, error, message, fetchCourses, addCourse, deleteCourse}
})