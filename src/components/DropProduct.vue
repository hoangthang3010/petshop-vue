<template>
    <div class="dropproduct">
        <div 
            class="dropproduct__item"
            v-for="(item, key) in product" 
            :key="key"
            @mouseenter="onHandleShowDrop(key)"
        >
            {{item.title}}
        </div>
    </div> 
</template>
<script>
import {API_URL} from '../.env.js'
import axios from 'axios'
import '../scss/DropProduct.scss'
export default {
    name: "DropProduct",
    data() {
        return{
            product: [],
            productDetail: [],
            bestselling: [],
        }
    },
    methods:{
        onHandleShowDrop(){
            console.log(1);
        }
    },
    mounted () {
        axios.get(API_URL)
            .then(response => {
                this.bestselling = response.data
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        axios.get(`${API_URL}/ProductAll`)
            .then(response => {
                this.product = response.data
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        axios.get(`${API_URL}/productDetail`)
            .then(response => {
                this.productDetail = response.data
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
    }
}
</script>