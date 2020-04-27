import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import axios from 'axios'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var data = require('./data/data.json')
var data2 = require('./data/data2.json')

new Vue({
    el: '#app',
    template: '<table v-html="table" class="table"></table>',
    data: {
        info: null,
        info2: null
    },
    mounted() {
        // axios
        //     .get('data-url')
        //     .then(response => (this.info = response))
        this.info = data;
        this.info2 = data2;
    },
    methods: {
        // TODO: Make this take an array
        generateSectionDetails: function(section, data1, data2) {
            const section1 = data1[section];
            const section2 = data2[section];

            const keys = Array.from(new Set([...Object.keys(section1), ...Object.keys(section2)]))

            const rows = keys.map(key => '<tr><td>' + key + '</td><td>' + section1[key] + '</td><td>' + section2[key]+ '</td></tr>')

            return rows.join('')
        }
    },
    computed: {
        table: function() {
            if (this.info && this.info2) {
                const sections = Array.from(new Set([...Object.keys(this.info), ...Object.keys(this.info2)]))
                const that = this;

                const tableRows = sections.map(element => that.generateSectionDetails(element, that.info, that.info2));

                return '<tr><th></th><th>Config 1</th><th>Config 2</th></tr>' + tableRows.join('')
            }
        }
    }
})
