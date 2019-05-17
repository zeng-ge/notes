<template>
    <div @click="onClick">
        <div>B</div>
        <div>{{count}}</div>    
    </div>    
</template>

<script>
export default {
    data(){
        return {
            count: 0
        }
    },
    methods: {
        onClick(){
            this.count++
        }
    }
}
</script>

