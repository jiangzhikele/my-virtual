<template>
  <div>
    <a-table
      :pagination="false"
      :columns="columns"
      :row-key="id"
      :scroll="{y: scrollY }"
      :data-source="visibleData">
    </a-table>
  </div>
</template>

<script>
// import Table from 'ant-design-vue/lib/table'

export default {
  name: 'MyVirtualTableFixHeight',
  components: {
    // ATable: Table
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: 'id'
    },
    scrollY: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      tableClass: ['.ant-table-scroll .ant-table-body', '.ant-table-fixed-left .ant-table-body-inner', '.ant-table-fixed-right .ant-table-body-inner'],
      start: 0,
      screenHeight: 0,
      // antd table 高度默认为54
      itemSize: 54
    }
  },
  computed: {
    // 可视区列表的项数
    visibleCount () {
      // 向上取整，再增加缓冲区,多加一屏
      return Math.ceil(this.screenHeight / this.itemSize) * 2
    },
    end () {
      // 此时的结束索引
      let end = this.start + this.visibleCount
      if (!this.dataSource[end]) {
        end = this.dataSource.length
      }
      return end
    },
    // 获取可视区列表数据
    visibleData () {
      return this.dataSource.slice(this.start, Math.min(this.end, this.dataSource.length))
    }
  },
  methods: {
    scrollEvent () {
      // 可以设置滚动截流
      const requestUpdate = () => requestAnimationFrame(() => {
        this.handleScroll()
      })
      requestUpdate()
    },
    // 处理滚动事件
    handleScroll () {
      const scrollTop = this.scroller.scrollTop
      this.start = Math.floor(scrollTop / this.itemSize)
      const wrapHeight = this.itemSize * this.dataSource.length
      const offsetTop = scrollTop - (scrollTop % this.itemSize)
      this.tableClass.forEach(className => {
        const el = this.$el.querySelector(className)
        if (!el) return
        // 创建wrapEl、innerEl
        if (!el.wrapEl) {
          const wrapEl = document.createElement('div')
          const innerEl = document.createElement('div')
          wrapEl.appendChild(innerEl)
          innerEl.appendChild(el.children[0])
          el.insertBefore(wrapEl, el.firstChild)
          el.wrapEl = wrapEl
          el.innerEl = innerEl
        }
        if (el.wrapEl) {
          // 设置高度
          el.wrapEl.style.height = wrapHeight + 'px'
          // 设置transform撑起高度
          el.innerEl.style.transform = `translateY(${offsetTop}px)`
          // 设置paddingTop撑起高度
          // el.innerEl.style.paddingTop = `${offsetTop}px`
        }
      })
    },

    // 初始化数据
    initData () {
      this.scroller = this.$el.querySelector('.ant-table-body')
      this.$nextTick(() => {
        this.handleScroll()
      })
      // 监听事件
      this.scroller.addEventListener('scroll', this.scrollEvent, { passive: true })
    }
  },
  mounted () {
    this.screenHeight = this.scrollY
    this.initData()
  },
  beforeDestroy () {
    if (this.scroller) {
      this.scroller.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>

<style lang='less'>
</style>
