<template>
<div 
    id="slider" 
    @mouseenter ="onHandleShow()"
    @mouseleave ="onHandleDisShow()"
>  
<!-- 790 -->
  <div class="sliderhomepage">
    <ul class="sliderhomepage__slides" :style="{left:-width*current+'px', width: slides.length*895+'px'}">
      <li class="sliderhomepage__slides__li" 
        v-for="(slide,i) in slides" 
        :key="i" 
        @mouseenter="onHoverSlide(i)" 
        @mouseleave="onLeaveSlide()"
      >
        <img 
            class="sliderhomepage__slides__li__image" 
            :src="slide.image" 
            :alt="slide.content"
            @click="onGoDetailProuct(slide)"
        >
      </li>
    </ul>
    <!-- <ul class="bullets">
      <li 
        v-for="(slide,i) in slides" 
        :key="i"
        @click="selectSlide(i)" 
        v-html="i==current ? '&#9679;' : '&omicron;'"></li>
    </ul> -->
    <a class="prev" href="#" @click.prevent="prevSlide" v-if="visible">
        <!-- &#x25C0; -->
        <font-awesome-icon :icon="['fas', 'caret-left']" opacity="40%" color= "black" size="1x" />
    </a>
    <a class="next" href="#" @click.prevent="nextSlide" v-if="visible">
        <font-awesome-icon :icon="['fas', 'caret-right']" opacity="40%" color= "black" size="1x" />
        <!-- &#x25B6; -->
    </a>
  </div>
</div>
</template>

<script>
import '../scss/SliderHomepage1.scss'
import { RepositoryFactory } from "../api/RepositoryFactory";
const PostsRepository = RepositoryFactory.communicationAPI("posts");
export default {
    name: "SliderHomepage1",
    // el:'#slider',
    data() {
        return{       
            slides: [
            'https://jandpet.com.vn/wp-content/uploads/2018/06/giam-gia-10-03-03-1400x754.jpg',
            'https://jandpet.com.vn/wp-content/uploads/2018/06/shop-my-dinh-333-03-01-1400x754.jpg',     
            'https://jandpet.com.vn/wp-content/uploads/2018/06/shop-da-nang-02-02-1400x755.jpg'
            ],
            current: 0,
            width: 895,
            timer: 0,
            visible: false,
            productAll: []
        }
    },
    methods: {
        onHandleShow(){
            this.visible = true
        },
        onHandleDisShow(){
            this.visible = false
        },
        onHoverSlide(){
            clearInterval(this.timer);
        },
        onLeaveSlide(){
            this.play();
        },
        onGoDetailProuct(item){
            console.log(item);
            const a = this.productAll.filter(elem => elem.id == item.idProduct)
            // console.log(a);
            this.$router.push(`/purchase/${a[0].type}/${a[0].detail}/${item.idProduct}`)
        },
        nextSlide: function() {
            this.current++;
            if (this.current >= this.slides.length)
                this.current = 0;
            this.resetPlay();
        },
        prevSlide: function() {
            this.current--;
            if (this.current < 0)
                this.current = this.slides.length - 1;
            this.resetPlay();
        },
        selectSlide: function(i) {
            this.current = i;
            this.resetPlay();
        },
        resetPlay: function() {
            clearInterval(this.timer);
            this.play();
        },
        play: function() {
            let app = this;
            this.timer = setInterval(function() {
                app.nextSlide();
            }, 2000);
        },
        async getSlide(){
            const {data} = await PostsRepository.getSlide();
            this.slides = data
        },
        async getProductDetail() {
            const { data } = await PostsRepository.getProductDetail();
            this.productAll = data;
        },
    },
    created: function() {
        this.play();
        this.getSlide()
        this.getProductDetail()
    }
}
</script>