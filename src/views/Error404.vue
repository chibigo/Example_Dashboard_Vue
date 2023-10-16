<template>
  <div class="page_404">
    <div class="container h_full_screen">
      <div class="row h_full_screen">
        <div class="col-sm-12 group_page ">
          <div class="col-sm-10 col-sm-offset-1 text-center">
            <div class="four_zero_four_bg">
              <h1 class="text-center">404</h1>
            </div>

            <div class="contant_box_404">
              <h3 class="h2">Look like you're lost</h3>

              <p>the page you are looking for not avaible!</p>

              <a href="/" class="link_404">Go to Dash Board</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
  height: 100vh;
  .h_full_screen{
    height: 100%;
  }
}

.page_404 img {
  width: 100%;
}
.group_page{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
  text-decoration: none;
}
.contant_box_404 {
  margin-top: -50px;
}
</style>
