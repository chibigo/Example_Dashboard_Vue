<template>
  <div class="profile_header">
    <div class="dropdown">
      <button class="dropdown-btn" aria-haspopup="menu">
        <span class="name"
          ><i class="pi pi-user"></i> {{ storeAuth.profile.username }}</span
        >
        <span class="arrow"></span>
      </button>
      <ul class="dropdown-content" role="menu">
        <li
          v-for="(item, idx) in itemDropdown"
          :key="idx"
          :style="{ '--delay': idx + 1 }"
        >
          <a :href="item.url" @click="handleItemAction(item)">
            <i :class="item.icon"></i>{{ item.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

const storeAuth = useAuthStore();
const itemDropdown = ref([
  {
    title: "Profile",
    icon: "pi pi-github",
    url: "/profile",
    action: null,
  },
  {
    title: "Setting",
    icon: "pi pi-spin pi-cog",
    url: "/setting",
    action: null,
  },
  {
    title: "Quit",
    icon: "pi pi-power-off",
    url: null,
    action: "handleLogout",
  },
]);

const handleItemAction = (item) => {
  if (item.action) {
    if (typeof item.action === "function") {
      item.action();
    } else if (typeof item.action === "string") {
      if (item.action === "handleLogout") {
        handleLogout();
      }
    }
  }
};

const handleLogout = () => {
  storeAuth.logout();
};
</script>

<style lang="scss" scoped>
.profile_header {
  .dropdown {
    position: relative;
    width: 180px;
    .name {
      text-transform: uppercase;
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
    width: 100%;
    border-radius: 0.5em;
    padding-left: 0;
    visibility: hidden;
    overflow: hidden;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 0.5em;
    z-index: 99;
  }

  .dropdown-content li {
    background: #2f3238;
    position: relative;
    left: 100%;
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
    left: 0;
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
    text-decoration: none;
    &:hover {
      color: #fff;
    }
  }
}
</style>
