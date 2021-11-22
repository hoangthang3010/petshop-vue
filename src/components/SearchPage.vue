<template>
    <div>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <button v-on:click="emptyEditor()">Empty the editor</button>

        <h2>Editor data</h2>
        <code>{{ editorData }}</code>
        <div v-html="editorData"></div>
    </div>
</template>

<script>
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../UploadAdapter';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
    export default {
        // components: {
        //     // Use the <ckeditor> component in this view.
        //     ckeditor: CKEditor.component
        // },
        data() {
            return {
                resultQuery:[],
                text: this.$route.params.text,
                productAll: [],
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'insertTable', '|', 'imageUpload', 'mediaEmbed', '|', 'undo', 'redo' ],
                    table: {
                        toolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
                    },
                    extraPlugins: [this.uploader],
                    language: 'nl',
                },
                image: {
                toolbar: [ 'toggleImageCaption', 'imageTextAlternative' ]
        }
            }
        },
        created(){
            this.fetch()
            this.$bus.on('resultQuery', value => {
                this.resultQuery = value
            })
        },
        methods: {
            emptyEditor() {
                this.editorData = '';
            },
            uploader(editor)
            {
                editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                    return new UploadAdapter( loader );
                };
            },
            // resize(){
            //     document.querySelector( '#editor' ), {
            //         plugins: [ Image, ImageResize],
            //     }
            // },
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