<template>
    <div class="vertify_header" v-show="isShow">
        {{text}}
        <img class="close" @click="click" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADMSURBVEhLzda9DcIwEIZhFmMQKjomYAoKKtajRQIUMQCIQ29hy8F/d7ZiKD4lcXzfU7hIVu/XJEtnLHI/7eR23MrzcY42WUMHXXTy7BEWL/u1XA+bLohZOuiikzWPhC9boVzH7Ex6oNJsdPAtUG0mQogF0uxNIkQzrNlDsggplWgBUkRIqswCkCpCvkstAFEhJIQsAPkfJAS4hvca6PcHXyqzQFlEU6KFkoh2mGj2RogFcKnNzJAWwKU065EewCXX4ZEhn98hPxLLZZIPlq7rX+2m5hgAAAAASUVORK5CYII='/>
    </div>
</template>

<script>
export default{
    name:'Head',
    props:['text'],
    data(){
        return {
            isShow:true
        }
    },
    methods:{
        click(){
            this.isShow=false
        }
    }
}
</script>

<style scoped>
    .vertify_header{
        height:0.3733333333rem;
        line-height:0.3733333333rem;
        margin-top:0.1rem;
        padding:0.3466666667rem 0.4rem;
        font-size:0.3733333333rem;
        background-color:#FEFCED;
        color:#E6743D;
        letter-spacing:0.02rem;
    }
    .vertify_header .close{
        display:inline-block;
        float:right;
        height:0.2933333333rem;
        width:0.2933333333rem;
    }
</style>