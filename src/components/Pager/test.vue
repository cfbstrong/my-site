<template>
  <Pager :current="current" :total="302" :visibleNumber="10" @pageChange="handlePageChange($event)" />
</template>

<script>
import Pager from './'
export default {
    components:{
        Pager,
    },
    data(){
      return{
        current:1
      }
    },
    methods:{
      handlePageChange(newPage){
        this.current = newPage
      }
    }
}
</script>

<style>
  
</style>