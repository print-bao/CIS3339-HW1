<script setup>
import DataTable from '../components/DataTable.vue'
import {ref, reactive} from 'vue'
import {useStudentStore } from '../stores/students'
import FeedbackMessage from '../components/FeedbackMessage.vue'
const store = useStudentStore()
const searchName = ref('')
const form = reactive({ 
    name: '', id: '', phone: '', zip: ''
})
const columns = [
    { key: 'name', label: 'Name' },
    { key: 'id', label: 'ID'},
    { key: 'phone', label: 'Phone'},
    { key: 'zip', label: 'ZIP'}
]
async function searchStudent(){
    await store.findStudent(searchName.value.trim())
}
async function submitStudent() {
    const success = await store.addStudent({ ...form})
    if (success){
        Object.assign(form, {
            name:'', id: '', phone: '', zip: ''
        })
    }
}
async function removeStudent(){
    if (confirm('Are you sure you want to delete this student?')){
        await store.deleteStudent(store.student.name)
    }
}
</script>

<template>
    <h1>Student Management</h1>
        <section>
            <h2>Search for a Student</h2>

            <form @submit.prevent="searchStudent">
                <input
                    v-model="searchName"
                    placeholder = "Enter student name"
                    required
                />
                <button :disabled="store.loading">
                    Search
                </button>
            </form>
            <DataTable 
                v-if="store.student"
                :columns="columns"
                :rows="[store.student]"
            >
                <template #actions>
                    <button
                        type="button"
                        class="delete"
                        :disabled="store.loading"
                        @click="removeStudent"
                    >
                        Delete
                    </button>
                </template>
            </DataTable>
        </section>
        <section>
            <h2>Add a Student</h2>
            <form @submit.prevent="submitStudent">
                <label>Name</label>
                <input v-model.trim="form.name" required />
                <label>Student ID</label>
                <input v-model.trim="form.id" required/>
                <label>Phone Number</label>
                <input v-model.trim="form.phone" type="tel" required />
                <label>ZIP Code</label>
                <input v-model.trim="form.zip" required />
                <button :disabled="store.loading">
                    Add Student
                </button>
            </form>
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