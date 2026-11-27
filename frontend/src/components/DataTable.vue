<script setup>
defineProps({
    columns: {
        type: Array,
        required: true
    },
    rows: {
        type: Array,
        required: true
    },
    emptyMessage: {
        type: String,
        default: 'No records found.'
    }
})
</script>

<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.key">
                        {{ column.label }}
                    </th>
                    <th v-if="$slots.actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows"
                    :key="row._id || row.id || index">
                    <td v-for="column in columns" :key="column.key">
                        {{ row[column.key] }}
                    </td>
                    <td v-if="$slots.actions">
                        <slot name="actions" :row="row" />
                    </td>
                </tr>
                <tr v-if="rows.length === 0">
                    <td :colspan="columns.length + ($slots.actions ? 1 : 0)">
                        {{ emptyMessage }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-container{
    width: 100%;
    overflow-x: auto;
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
td{
    background: white;
    color: #333;
}
</style>