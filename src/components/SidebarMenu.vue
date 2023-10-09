<template>
    <div class="warpper">
        <aside>
            <h4 class="title_dashboard">CMS Admin</h4>
            <ul>
                <li v-for="(item,index) in routes[0].children" :key="index">
                    <router-link :to="item.path">
                        <div class="item">
                            <span>{{ item.name }}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script setup>
import {RouterLink} from 'vue-router'
import {routes} from '../router/Route'
</script>

<style lang="scss" scoped>
.warpper{
    position: fixed;
    min-width: 280px;
    height: 100vh;
    box-shadow: 25px 0px 24px -27px rgba(0,0,0,0.45);
    .title_dashboard{
        padding: 10px;
        text-align: center;
        font-weight: 700;
        font-size: 24px;
    }

    ul {
        padding: 0;
    }

    ul > li {
        list-style-type: none;
    
    }

    ul > li a {
        text-decoration: none;
        color: #4fc08d;
        width: 100%;
        &:hover{
            background-color: #ececec;
        }
    }

    .item {
        padding: 12px 18px;
        text-transform: capitalize;
    }

    a.router-link-exact-active .item {
        background-color: #4fc08d;
        color: #fff;
    }
}
</style>