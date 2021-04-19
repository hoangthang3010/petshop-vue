<template>
    <div class="row" style="width: 100%">
        <div>
            <jw-pagination :items="productAll" @changePage="onChangePage" :labels="customLabels" :pageSize="8"></jw-pagination>
        </div> 
        <div class="row"  style="width: 100%">
            <div
                class="product__right__item col-3"
                v-for="item in pageOfItems" 
                :key="item.id"
            >
                <img :src="item.image"/>
                <router-link 
                    :to="`/purchase/${item.type}/${item.detail}/${item.id-1}`"
                    style="text-decoration: none"
                > 
                    <p class="product__right__item__name" :title="item.title">{{item.title}}</p>
                </router-link>
                <p class="product__right__item__price" :title="item.price">{{item.price | filterPrice}} ₫</p>
            </div>
        </div>
    </div>
</template>

<script>
const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};
export default {
    data() {
        return {
            customLabels,
            pageOfItems: []
        };
    },
    props: ["productAll"],
    methods: {
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        }
    },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
    }
};
</script>
<style>
a.page-link{
    color: black  !important;
}
.page-item.active .page-link{
    color: white !important;
    background-color: orange !important;
    border: 1px solid orange !important;
}
</style>
