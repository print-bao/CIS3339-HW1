<script setup>
import {ref, reactive} from 'vue'
import {useStudentStore } from '../stores/students'
const store = useStudentStore()
const searchName = ref('')
const form = reactive({ 
    name: '', id: '', phone: '', zip: ''
})
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

            <table v-if="store.student">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>ZIP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ store.student.name }}</td>
                        <td>{{ store.student.id }}</td>
                        <td>{{ store.student.phone }}</td>
                        <td>{{ store.student.zip }}</td>
                        <td>
                            <button 
                                type="button"
                                class = "delete"
                                :disabled="store.loading"
                                @click="removeStudent"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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

        <p v-if="store.loading">Loading...</p>
        <p v-if="store.error" class="error">{{ store.error }}</p>
        <p v-if="store.message" class="success">{{store.message}}</p>
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