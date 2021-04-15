<template>
    <div class="mutimenu">
        <p class="mutimenu__title">SẢN PHẨM</p>
        <ul
            class="mutimenu__ul"
            v-for="(item, key) in menu" 
            :key="key"
        >
        <!-- :style="`border-left: 3px solid ${id == key ? 'orange' : 'white'}` -->
            <li 
                class="mutimenu__ul__li" 
                :style="`border-left:3px solid ${idli == key ? 'orange' : 'white'}`"
            >
                <!-- :style="`border-bottom:1px solid ${idli1 == key1 ? 'white' : '#ECECEC'}`" -->
                <p 
                    class="mutimenu__ul__li__title"
                    @click="showBorderli(key, item.name)"
                    :style="`background-color: ${idli == key ? '#ECECEC' : 'white'}`"
                >
                    {{item.title}}
                </p>
                <!-- <span
                    class="mutimenu__ul__li__icon"
                    v-if="item.type.length > 1"
                    @click="showDropDown(key)"
                >&#780;	</span> -->
                <div 
                    class="mutimenu__ul__li__icon"
                    :style="`transform: ${ displayul == key ? 'rotate(180deg)' : ''};
                             background-color: ${idli == key ? '#ECECEC' : 'white'}`"
                >
                    <font-awesome-icon
                        :icon="['fas', 'angle-down']" 
                        color="#939393"
                        v-if="item.type.length > 1"
                        @click="showDropDown(key)"
                    />
                </div>
                <ul 
                    class="mutimenu__ul__li__ul1"
                    v-for="(item1, key1) in item.type" 
                    :key="key1" 
                    :style="`display: ${displayul == key ? '' : 'none'}`"
                >
                    <li 
                        class="mutimenu__ul__li__ul1__li1"
                        @click="showBorderli1(key,key1,item1.name)"
                        :style="`border-left:3px solid ${idli1 == key1 ? 'orange' : 'white'};
                                 background-color: ${idli1 == key1 ? '#ECECEC' : 'white'};
                                 border-top:1px solid ${idli1 == key1 ? '#00000026' : 'white'}
                               `"
                    > 
                        {{item1.title}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import '../scss/MultiLevelMenu.scss'
export default {
    data(){
        return{
            visible: false,
            idli: null,
            idli1: null,
            displaybli1: null,
            displayul: null,
            menu: [
                {
                    title: "Tất cả",  
                    name: "",
                    type: [
                        {
                            title: "Đồ cho Chó",
                            name: "dog",
                            type: []
                        },
                        {
                            title: "Đồ cho Mèo",
                            name: "cat",
                            type: []
                        },
                    ]
                },
                {
                    title: "Đồ ăn",
                    name: "food",
                    type: [
                        {
                            title: "Đồ ăn cho mèo",
                            name: "food_cat",
                        },
                        {
                            title: "Đồ ăn cho chó",
                            name: "food_dog",
                        },
                    ]
                },
                {
                    title: "Thuốc",
                    name: "medicine",
                    type: [
                        {
                            title: "Thuốc cho mèo",
                            name: "medicine_cat",
                        },
                        {
                            title: "Thuốc cho chó",
                            name: "medicine_dog",
                        },
                    ]
                }
            ]
        }
    },
    methods:{
        showBorderli(id, type){
            this.$emit('type', type)
            this.idli=id
            this.idli1 = null
            this.displayul = null
        },
        showBorderli1(id,id1,type){
            this.idli=id
            this.idli1=id1
            this.$emit('type', type)
        },
        showDropDown(id){
            if (this.displayul !== id){
                this.displayul=id
                this.idli1=null
            }
            else{
                this.displayul = null
                // this.idli1=null
            }
        }
    }
}
</script>