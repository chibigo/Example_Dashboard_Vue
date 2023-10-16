<template>
  <div class="notications_header">
    <div class="dropdown">
      <button class="dropdown-btn" aria-haspopup="menu">
        <span class="name"><i class="pi pi-bell"></i></span>
        <span class="round"></span>
        <span class="arrow"></span>
      </button>
      <ul v-if="recentItems.length >0 " class="dropdown-content" role="menu">
        <li class="title_notication"><span> Notifications </span></li>
        <li
          v-for="(item, idx) in recentItems"
          :key="idx"
          :style="{ '--delay': idx + 1 }"
        >
          <a :href="`/notification/${item.id}`">
            <i class="pi pi-tag"></i>{{ item.title }}
          </a>
        </li>
        <li class="load_more"><a href="/notication"> Load More... </a></li>
      </ul>
      <ul v-else class="dropdown-content">
        <li class="no_data">
          <a href="#">
            <i class="pi pi-server"></i> No Data
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const itemDropdown = ref([
  {
    title: "This is notice 1. Please see now",
    isRead:false,
    create_date: new Date('10/10/2023'),
    id: 1,
  },
  {
    title: "This is notice 2. Please see now",
    isRead:false,
    create_date: new Date('11/10/2023'),
    id: 2,
  },
  {
    title: "This is notice 3. Please see now",
    isRead:false,
    create_date: new Date('11/09/2023'),
    id: 3,
  },
  {
    title: "This is notice 4. Please see now",
    isRead:false,
    create_date: new Date('12/10/2023'),
    id: 4,
  }
]);


const recentItems = computed(() => {
  return itemDropdown.value.sort((a, b) => b.create_date - a.create_date).slice(0, 3);
})
</script>

<style lang="scss" scoped>
.notications_header {
  .dropdown {
    position: relative;
    width: 48px;
    .name {
      text-transform: uppercase;
      position: relative;;
    }
    .round{
        position: absolute;
        top: 10px;
        left: 14px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: red;
        &:active{
            background-color: #7a7a7a;
        }
    }
    .pi {
      margin-right: 8px;
    }
    &-btn {
      border: 1px solid #4fc08d;
      background-color: transparent;
      font-size: 12px;
      width: 100%;
      color: #4fc08d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 6px;
      border-radius: 0.5em;
      cursor: pointer;
      &:focus{
        background-color: #4fc08d;
        border:none;
        color: #fff;
        .arrow{
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid #fff;
        }
      }
      .arrow {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #4fc08d;
        transition: transform ease-in-out 0.3s;
      }
    }
  }

  .dropdown-content {
    list-style: none;
    position: absolute;
    top: 30px;
    right: 0;
    width: 244px;
    border-radius: 0.5em;
    padding-left: 0;
    visibility: hidden;
    overflow: hidden;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 0.5em;
    z-index: 99;
    .title_notication {
      text-align: center;
      padding: 0.7em 0.5em;
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      &:hover {
        background: #2f3238;
      }
    }
    .load_more {
      text-align: center;
    }
  }

  .dropdown-content li {
    background: #2f3238;
    position: relative;
    right: 100%;
    transition: 0.5s;
    transition-delay: calc(60ms * var(--delay));
    &:hover {
      background: #4fc08d;
    }
  }
  .dropdown-content li:last-child {
    border-top: 1px solid #4fc08d;
  }
  .dropdown:focus-within .dropdown-content li {
    right: 0;
  }

  .dropdown:focus-within .dropdown-content {
    visibility: visible;
  }

  .dropdown:focus-within .dropdown-btn > .arrow {
    transform: rotate(180deg);
  }
  .dropdown-content li a {
    color: #4fc08d;
    display: block;
    padding: 0.7em 0.5em;
    font-size: 13px;
    text-decoration: none;
    i {
      font-size: 12px;
    }
    &:hover {
      color: #fff;
    }
  }
  .no_data{
    text-align: center;
    pointer-events: none;
  }
}
</style>
