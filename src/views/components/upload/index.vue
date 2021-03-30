<template>
  <div style="margin: 20px 0">
    ----------------------------picture-card----------------------------
  </div>
  <Upload
    v-model:file-list="fileList1"
    :accept="'.sb3,.mp4,.mp3,.png,.pdf'"
    :disabled="false"
    :multiple="true"
    :limit="1"
    size="10M"
    :tip="'支持jpg，png，jepg文件，尺寸200x200，大小不超过2M'"
    @handleSuccess="uploadSuccess"
  ></Upload>
  <div>{{ fileList1 }}</div>
  <div style="margin: 20px 0">
    ------------------------------picture------------------------------
  </div>
  <Upload
    v-model:file-list="fileList2"
    list-type="picture"
    :accept="'.sb3,.mp4,.mp3,.png,.pdf'"
    :disabled="false"
    :multiple="true"
    :limit="1"
    size="10M"
    :tip="'支持jpg，png，jepg文件，尺寸200x200，大小不超过2M'"
    @handleSuccess="uploadSuccess"
  ></Upload>
  <div style="margin-top: 10px">{{ fileList2 }}</div>
  <div style="margin: 20px 0">
    -------------------------------text-------------------------------
  </div>
  <Upload
    v-model:file-list="fileList3"
    list-type="text"
    :accept="'.sb3,.mp4,.mp3,.png,.pdf'"
    :disabled="false"
    :multiple="true"
    :limit="1"
    size="10M"
    :tip="'支持jpg，png，jepg文件，尺寸200x200，大小不超过2M'"
    @handleSuccess="uploadSuccess"
  ></Upload>
  <div style="margin-top: 10px">{{ fileList3 }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, onBeforeMount } from 'vue'
import Upload from '@/components/upload/index.vue'
import { useStore } from '@/store'
export default defineComponent({
  components: { Upload },
  setup(props) {
    const instance = getCurrentInstance() as any
    const auth = instance.appContext.config.globalProperties.auth
    const store = useStore()
    const fileList1 = ref([])
    const fileList2 = ref([])
    const fileList3 = ref([])
    const uploadSuccess = () => {}
    onBeforeMount(() => {
      store.dispatch('COS_SDK/getTmpkeys')
    })
    return {
      fileList1,
      fileList2,
      fileList3,
      uploadSuccess,
      auth
    }
  }
})
</script>

<style scoped lang="less"></style>
