<template>
    <div>
        <!-- {{resultQuery}}
        {{text}} -->
        {{$route.params.text}}
        {{text}}
        sdfsdf
        {{productAll.length}}
    </div>
</template>

<script>
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
    export default {
        data() {
            return {
                resultQuery:[],
                text: this.$route.params.text,
                productAll: []
            }
        },
        created(){
            this.fetch()
            this.$bus.on('resultQuery', value => {
                this.resultQuery = value
            })
        },
        methods: {
            async fetch(){
                const {data} = await PostsRepository.getProductDetail();
                this.productAll = data.filter((item)=>{
                    return this.text.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
                    })
                // this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
            },
        }
    }
</script>

<style scoped>

</style>