<template>
  <div>
    <div
      class="dropzone"
      @dragover.prevent="onDragOver"
      @drop.prevent="handleFileDrop"
    >
      <p>Drag and drop images here</p>
      <div class="input_upload">
        <input
          type="file"
          name="file"
          ref="myFiles"
          id="file"
          accept="image/*"
          @change="handleFileUpload"
          class="inputfile"
          data-multiple-caption="{count} files"
          multiple
        />
        <label for="file"><i class="pi pi-paperclip"></i> Choose file</label>
      </div>
    </div>
    <div class="btn_upload">
      <button class="btn btn_submit" @click="handleSubmitFile" :disabled="!isSucessImage">
        <i class="pi pi-upload"></i>
        <span> Upload</span>
      </button>
      <button class="btn btn_cancel_file" @click="handleCancelAllFile" :disabled="!isSucessImage">
        <i class="pi pi-times-circle"></i>
        <span> Cancel</span>
      </button>
    </div>
    <div class="image-container">
      <div class="item_image" v-for="(image, index) in images.reverse()" :key="index">
        <span class="is_success_image" :class="{active: image.isSuccess}">{{ !image.isSuccess ? 'Pending': 'Completed' }}</span>
        <div class="image">
          <img :src="image.url" :alt="image.name" />
        </div>
        <div class="btn_group">
          <button
            class="btn btn_download"
            @click="handleDownload(image.url, image.name)"
          >
            <i class="pi pi-cloud-download"></i>
            Download
          </button>
          <button class="btn btn_remove" @click="removeImage(index)">
            <i class="pi pi-trash"></i>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const images = ref([]);
const isSucessImage = ref(false);
const imageNew = ref([]);

const onDragOver = (event) => {
  event.preventDefault();
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  processFiles(files);
};

const handleFileDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  processFiles(files);
};

const processFiles = (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      images.value.push({
        name: file.name,
        url: e.target.result,
        isSuccess:false
      });
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const handleDownload = (url, name) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = () => {
    const blob = xhr.response;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  xhr.open("GET", url);
  xhr.send();
};

const handleCancelAllFile = () => {
  images.value = [];
};

watch(images.value, (val) => {
    isSucessImage.value = val.some(element => element.isSuccess === false);
    console.log(isSucessImage.value);
});
</script>

<style lang="scss" scoped>
.dropzone {
  border: 2px dashed #ccc;
  text-align: center;
  padding: 20px;
  cursor: pointer;
}

.dropzone p {
  font-size: 18px;
  color: #b9b9b9;
  margin-bottom: 12px;
}

.input_upload {
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .inputfile + label {
    padding: 3px 8px;
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: #4fc08d;
    display: inline-block;
    border-radius: 8px;
  }
  .inputfile:focus + label,
  .inputfile + label:hover {
    opacity: 0.8;
  }
  .inputfile + label {
    cursor: pointer;
  }
  .inputfile:focus + label {
    outline: 1px dotted #4fc08d;
  }
}
.btn_upload {
  .btn {
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin: 12px 8px 0 0;
    padding: 0px 24px;
    border: none;
    border-radius: 8px;
    color: #fff;
    background-color: #4fc08d;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .btn_cancel_file {
    background-color: #c04f4f;
  }
}
.image-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  padding: 20px 0;
  .is_success_image{
    background-color: #686868;
    color: #fff;
    padding: 2px 4px;
    border-radius: 4px;
    float: right;
    font-size: 12px;
    margin: 4px 10px 4px 0 ;
  }
  .is_success_image.active{
    background-color: #4fc08d;
  }
  .item_image {
    margin: 0 auto;
    border: 1px solid #4fc08d;
    border-radius: 8px;
    .image {
      width: 260px;
      height: 200px;
      padding: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        display: block;
      }
    }
    .btn_group {
      display: flex;
      justify-content: center;
      column-gap: 8px;
      margin: 10px 0 10px 0;
      .btn {
        border: 1px solid;
        padding: 8px 12px;
        background-color: transparent;
        border-radius: 8px;
        cursor: pointer;
      }
      .btn_download {
        border-color: #00bfff;
        color: #00bfff;
        &:hover {
          background-color: #00bfff;
          color: #fff;
        }
      }
      .btn_remove {
        color: #ff3300;
        border-color: #ff3300;
        &:hover {
          background-color: #ff3300;
          color: #fff;
        }
      }
    }
  }
}
</style>
