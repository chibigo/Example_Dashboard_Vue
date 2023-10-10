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
      <button class="btn btn_submit" @click="handleSubmitFile">
        <i class="pi pi-upload"></i> 
        <span> Upload</span>
      </button>
      <button class="btn btn_cancel_file" @click="handleCancelAllFile">
        <i class="pi pi-times-circle"></i>
        <span> Cancel</span>
      </button>
    </div>
    <div v-for="(image, index) in images" :key="index" class="image-container">
      <div class="item_image">
        <div>
            <img :src="image.url" :alt="image.name" />
        </div>
        <button class="btn_remove" @click="removeImage(index)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = ref([]);

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
      });
    };

    reader.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};
const handleCancelAllFile = () => {
    images.value = []
}
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

.image-container {
  display: inline-block;
  margin: 10px;
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
    &:hover{
        opacity: 0.8;
    }
  }
}
</style>
