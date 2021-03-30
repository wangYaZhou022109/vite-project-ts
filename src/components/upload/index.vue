<template>
  <div class="upload-wrap">
    <div class="tip">{{ tip }}</div>
    <a-upload
      :multiple="multiple"
      :disabled="disabled"
      :accept="accept"
      :list-type="listType"
      :file-list="fileList"
      :show-upload-list="{ showDownloadIcon: true }"
      :before-upload="beforeUpload"
      :custom-request="cosUpload"
      :remove="handleRemove"
      size="2M"
      @preview="handlePreview"
      @download="handleDownload"
    >
      <div v-if="listType === 'picture-card' && fileList.length < limit">
        <PlusOutlined />
        <div class="ant-upload-text">请上传</div>
      </div>
      <a-button v-if="(listType === 'picture' || listType === 'text') && fileList.length < limit">
        <UploadOutlined />
        请上传
      </a-button>
    </a-upload>
    <preview v-model:visible="previewVisible" :src="previewImage"></preview>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeUnmount } from 'vue'
import { useStore } from '@/store'
import Preview from './Preview.vue'
import { message } from 'ant-design-vue'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: { Preview, PlusOutlined, UploadOutlined },
  props: {
    accept: { type: String, default: '.png,.jpg,.jpeg' }, // 文件类型
    listType: { type: String, default: 'picture-card' }, // 展示类型
    multiple: { type: Boolean, default: false }, // 是否支持多文件
    disabled: { type: Boolean, default: false }, // 是否禁用
    limit: { type: Number, default: 1 }, // 上传数量
    fileList: { required: true, type: Array, default: () => [] }, // 已上传文件列表
    tip: { type: String, default: '' }, // 规则提示
    size: { type: String, default: '' } // 文件大小
  },
  setup(props, { emit }) {
    const store = useStore()
    let COS: any = {}
    let COS_KEYS: any = {}
    const unsubscribe = store.subscribe((mutation: any, state: any) => {
      COS = state.COS_SDK.cos
      COS_KEYS = state.COS_SDK.cosKeys
    })
    COS = computed(() => store.getters['COS_SDK/COS']).value
    COS_KEYS = computed(() => store.getters['COS_SDK/COS_KEYS']).value
    const previewVisible = ref(false)
    const previewImage = ref('')
    const cosUpload = (data: any) => {
      const { file } = data
      const fileName = file.name
      const fileType = file.type.split('/')[0]
      const types = ['image', 'video', 'audio']
      COS.sliceUploadFile(
        {
          ...COS_KEYS,
          Key: `lessons/${
            types.includes(fileType) ? fileType : 'file'
          }/${new Date().getTime()}/${fileName}`,
          Body: file,
          onTaskReady() {},
          onProgress() {}
        },
        (err: { statusCode: number }, data: { Location: any; Key: any }) => {
          if (err) {
            if (err.statusCode === 403) {
              store.dispatch('getTmpkeys')
              message.error('Access Key失效，请重新上传！')
            } else {
              console.log(err)
            }
          } else {
            const { Location, Key } = data
            const url = 'http://' + Location
            props.fileList.push({
              uid: file.uid,
              name: file.name,
              status: 'done',
              key: Key,
              url
            })
            emit('handleSuccess')
          }
        }
      )
    }
    const beforeUpload = (file: { size: number }) => {
      return new Promise((resolve, reject) => {
        if (!props.size) {
          return resolve(true)
        }
        const size = +props.size.split('M')[0]
        const isLt = file.size / 1024 / 1024 <= size
        if (!isLt) {
          message.error(`上传文件大小不能超过 ${size}M!`)
          return reject(isLt)
        }
        return resolve(true)
      })
    }
    const handlePreview = async (file: { url: any; preview: any; originFileObj: any }) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
    }
    const handleRemove = (file: { uid: any }) => {
      const uid = file.uid
      let i = 0
      props.fileList.forEach((val: any, index: number) => {
        if (val.uid === uid) {
          i = index
        }
      })
      props.fileList.splice(i, 1)
    }
    const handleDownload = (info: { key: string; name: string }) => {
      COS.getObjectUrl(
        {
          ...COS_KEYS,
          Key: info.key,
          Sign: true
        },
        (err: any, data: { Url: string | string[] }) => {
          if (err) return console.log(err)
          const downloadUrl =
            data.Url +
            (data.Url.indexOf('?') > -1 ? '&' : '?') +
            'response-content-disposition=attachment' // 补充强制下载的参数
          const a = document.createElement('a')
          a.href = downloadUrl
          a.download = info.name
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      )
    }
    const getBase64 = (file: Blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }
    onBeforeUnmount(() => {
      unsubscribe()
    })
    return {
      cosUpload,
      beforeUpload,
      previewImage,
      handlePreview,
      handleRemove,
      previewVisible,
      handleDownload
    }
  }
})
</script>

<style lang="less" scoped>
.upload-wrap {
  .tip {
    font-size: 13px;
  }
  ::v-deep(.ant-upload-picture-card-wrapper),
  ::v-deep(.ant-upload-select-picture),
  ::v-deep(.ant-upload-select-text) {
    margin-top: 8px;
  }
  ::v-deep(.ant-upload-select-picture-card svg) {
    font-size: 20px;
  }
  ::v-deep(.ant-upload-select-picture-card .ant-upload-text) {
    margin-top: 8px;
    //color: #666;
  }
}
</style>
