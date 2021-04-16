<template>
    <div class="sliderrange">
        
            <!-- ref="slider"

            v-bind="options" -->
            
            <!-- :formatter="formatter" -->
            <!-- :tooltip-formatter="formatter2" -->
        <vue-range-slider
            ref="slider"
            
            v-model="value"
            :min="min"
            :max="max" 
            :enable-cross="enableCross"
            :bg-style="bgStyle" 
            :tooltip-style="tooltipStyle" 
            :process-style="processStyle"
            @slide-end ="change"
            :formatter="formatter"
        />
        <p class="product__left__filterprice__price">
            Giá từ: {{value[0] | filterPrice}}đ - {{value[1] | filterPrice}}đ
        </p>
        <p style="display: none">
            {{this.priceMin}} - {{this.priceMax}}</p>
    </div>
</template>
<script>
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
export default {
    data() {
        return {
            // formatter2: v => `$${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        }
    },
    props: ['priceMax', 'priceMin'],
    components: {
        VueRangeSlider
    },
    methods:{
        // change(){
        // console.log(this.value )
        // }
        change(){
            // console.log(1);
            this.$emit('rePriceMax', this.value[1]),
            this.$emit('rePriceMin', this.value[0])
        }
    },
    // computed: {
    //     rePriceMax: this.$emit('reRriceMax', this.value[1]),
    //     rePriceMin: this.$emit('reRriceMin', this.value[0])
        
    // },
    created() {
        this.min = this.priceMin
        this.max = this.priceMax
        this.enableCross = false
        this.value = [this.priceMin,this.priceMax]
        // formatter2: v => `$${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        this.formatter = value => `${value}đ`
        this.bgStyle = {
            backgroundColor: 'red !important',
            boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        }
        this.tooltipStyle = {
            // backgroundColor: '#666',
            // borderColor: '#666'
            // display: 'none'
        }
        this.processStyle = {
            // backgroundColor: '#999' 
        } 
    },
    beforeUpdate(){
        this.value= [this.priceMin,this.priceMax]
        // this.$refs.slider.setValue(this.priceMin,this.priceMax)
        this.min=this.priceMin
        this.max= this.priceMax
        // console.log('bfu:' + this.min);
        // console.log('bfu:' + this.max);
        // console.log('bfu:' + this.priceMin);
        // console.log('bfu:' + this.priceMax);
    },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
}
</script>
<style  scoped>
.div{
    background-color: red !important;
}
.vue-range-slider.slider-component .slider{
    background-color: red !important;
}
/* .vue-range-slider.slider-component .slider{
    width: 100%;
} */
</style>