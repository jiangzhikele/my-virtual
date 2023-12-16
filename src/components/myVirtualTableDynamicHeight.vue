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
  name: 'MyVirtualTableDynamicHeight',
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
    // key值，data数据中的唯一id
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
      tableClass: '.ant-table-body',
      start: 0,
      end: 0,
      screenHeight: 0,
      buffer: 100,
      // antd table 高度默认为54
      itemSize: 54,
      // 临时保存当前渲染的visibleData数据高度
      offsetBak: {},
      visibleData: []
    }
  },
  computed: {
    // 计算出每个item（的key值）到滚动容器顶部的距离
    offsetMap ({ id, itemSize, offsetBak, dataSource }) {
      const res = {}
      let total = 0
      for (let i = 0; i < dataSource.length; i++) {
        const key = dataSource[i][id]
        res[key] = total
        // 当前行的高度重新计算
        const size = typeof offsetBak[key] === 'number' ? offsetBak[key] : itemSize
        total += size
      }
      return res
    },
    wrapHeight () {
      return this.itemSize * this.dataSource.length
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
      // 当前页面渲染的dom高度重新计算
      this.updateOffset()
      // 计算visibleData
      this.calcVisibleData()
      // 计算offset位置
      this.calcPosition()
    },

    updateOffset () {
      const rows = this.$el.querySelectorAll('.ant-table-body .ant-table-tbody .ant-table-row')
      Array.from(rows).forEach((row, index) => {
        const item = this.visibleData[index]
        if (!item) return
        // 计算表格行的高度
        const offsetHeight = row.offsetHeight
        const key = item[this.id]
        if (this.offsetBak[key] !== offsetHeight) {
          this.$set(this.offsetBak, key, offsetHeight)
        }
      })
    },

    calcVisibleData () {
      const { buffer, dataSource: data } = this
      const scrollTop = this.scroller.scrollTop
      // visibleData 上下offset
      const top = scrollTop - buffer
      const bottom = scrollTop + this.screenHeight + buffer
      // 二分法计算
      let l = 0
      let r = data.length - 1
      let m = 0
      while (l <= r) {
        m = Math.floor((l + r) / 2)
        const mVal = this.getItemOffset(m)
        if (mVal < top) {
          const mNextVal = this.getItemOffset(m + 1)
          if (mNextVal > top) break
          l = m + 1
        } else {
          r = m - 1
        }
      }

      // visibleData容的开始、结束索引
      this.start = m
      this.end = data.length - 1
      for (let i = this.start + 1; i < data.length; i++) {
        const offsetTop = this.getItemOffset(i)
        if (offsetTop >= bottom) {
          this.end = i
          break
        }
      }
      this.visibleData = data.slice(this.start, this.end + 1)
    },

    // 计算位置
    calcPosition () {
      if (!this.scroller) return
      const last = this.dataSource.length - 1
      // 撑起整个滚动条，高度为 itemSize * length,动态高度则需要获取其offsetMap
      const wrapHeight = this.getItemOffset(last) + this.getItemSize(last)
      // 滚动条高度
      const offsetTop = this.getItemOffset(this.start)
      const el = this.scroller
      // 创建新dom元素，替换原有样式
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
    },

    // 获取高度offsetMap
    getItemOffset (index) {
      const item = this.dataSource[index]
      if (item) {
        return this.offsetMap[item[this.id]] || 0
      }
      return 0
    },

    // 获取行高度
    getItemSize (index) {
      if (index <= -1) return 0
      const item = this.dataSource[index]
      if (item) {
        const key = item[this.id]
        return this.offsetBak[key] || this.itemSize
      }
      return this.itemSize
    },

    // 初始化数据
    initData () {
      this.scroller = this.$el.querySelector(this.tableClass)
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
      this.scroller.removeEventListener('scroll', this.scrollEvent)
    }
  }
}
</script>

<style lang='less'>
</style>
