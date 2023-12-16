<template>
  <!-- 可视区域 -->
  <div ref="list" class="list-container" @scroll.passive="scrollEvent($event)" :style="{ height: screenHeight + 'px' }">
    <!-- 可滚动区域，z-index=-1，高度和真实列表相同，目的是出现滚动条 -->
    <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <!-- 可视区列表，数据和偏移距离随着滚动距离的变化而变化 -->
    <!-- 也可以使用paddingTop 和 paddingBottom -->
    <div class="list" :style="{ transform: getTransform }">
      <!-- dom 对比，此处需要key唯一，否则缓冲的数据会全部重新渲染 -->
      <div
        class="list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px' }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyVirtualList',
  props: {
    // 列表数据
    // 如果列表的数据不会修改，只做展示，可以将其原型的 set 方法删除，Object.freeze()
    items: {
      type: Array,
      default: () => []
    },
    // 列表项高度
    itemSize: {
      type: Number,
      default: 50
    },
    // 可视区域高度
    screenHeight: {
      type: Number,
      default: 300
    }
  },
  computed: {
    // 列表总高度
    listHeight () {
      return this.items.length * this.itemSize
    },
    // 可视区列表的项数
    visibleCount () {
      // 向上取整，再增加缓冲区,多加一屏
      return Math.ceil(this.screenHeight / this.itemSize) * 2
    },
    // 可视区列表偏移距离对应的样式
    getTransform () {
      // return `translate3d(0,${this.startOffset}px,0)`
      return `translateY(${this.startOffset}px)`
    },
    endIndex () {
      // 此时的结束索引
      let end = this.startIndex + this.visibleCount
      if (!this.items[end]) {
        end = this.items.length
      }
      return end
    },
    // 获取可视区列表数据
    visibleData () {
      return this.items.slice(this.startIndex, Math.min(this.endIndex, this.items.length))
    }
  },
  created () {
  },
  mounted () {
    // 获取容器高度，此处应该用 clientHeight 而不是 offsetHeight
    // this.screenHeight = this.$refs.list.clientHeight
  },
  data () {
    return {
      startOffset: 0, // 偏移距离
      startIndex: 0, // 起始索引
      isScrollStatus: true
    }
  },
  methods: {
    scrollEvent () {
      // 可以设置滚动截流
      if (this.isScrollStatus) {
        this.isScrollStatus = false
        const requestUpdate = () => requestAnimationFrame(() => {
          this.handleScroll()
          this.isScrollStatus = true
        })
        requestUpdate()
      }
    },
    handleScroll () {
      // 当前滚动位置
      const scrollTop = this.$refs.list.scrollTop
      // 此时的开始索引
      // 向下去整,或者使用两次取反 ~~(scrollTop / this.itemSize)
      this.startIndex = Math.floor(scrollTop / this.itemSize)
      // 此时的偏移距离
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    }
  }
}
</script>

<style scoped>
.list-container {
  height: 100%;
  overflow: auto;
  position: relative;
}

.list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-item {
  line-height: 50px;
  text-align: center;
  color: #555;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
