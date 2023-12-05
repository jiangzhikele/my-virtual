<template>
  <div>
    <a-table
      :pagination="false"
      :columns="columns"
      :row-key="id"
      :scroll="{y: scrollY }"
      :expandedRowKeys="expandedRowKeys"
      @expand="onTableExpand"
      :data-source="visibleData">
      <!-- 支持自定义头部 -->
      <template v-for="slot in Object.keys($slots)" :slot="slot">
        <slot :name="slot"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
// 获取展开行
// import Table from 'ant-design-vue/lib/table'

export default {
  name: 'MyVirtualTableDemo',
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
      tableClass: ['.ant-table-scroll .ant-table-body', '.ant-table-fixed-left .ant-table-body-inner', '.ant-table-fixed-right .ant-table-body-inner'],
      expandedRowKeys: [],
      tree: [],
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
      if (!this.tree[end]) {
        end = this.tree.length
      }
      return end
    },
    // 获取可视区列表数据
    visibleData () {
      return this.tree.slice(this.start, Math.min(this.end, this.tree.length))
    }
  },
  methods: {
    getAllExpand (tree) {
      tree && tree.length && tree.forEach(item => {
        if (item.children && item.children.length) {
          this.expandedRowKeys.push(item[this.id])
          this.getAllExpand(item.children)
        }
      })
    },

    onTableExpand (expanded, record) {
      if (expanded) {
        this.expandedRowKeys.push(record[this.id])
      } else {
        this.expandedRowKeys = this.expandedRowKeys.filter(key => key !== record[this.id])
      }
    },

    scrollEvent () {
      // 可以设置滚动截流
      const requestUpdate = () => requestAnimationFrame(() => {
        this.handleScroll()
      })
      requestUpdate()
    },

    // 处理滚动事件
    handleScroll () {
      const rows = this.$el.querySelectorAll('.ant-table-body .ant-table-tbody .ant-table-row')
      Array.from(rows).forEach((row, index) => {
        const item = this.visibleData[index]
        // row.setAttribute('class', 'ant-table-row ant-table-row-level-' + item.level)
        const cell = row.cells[0]
        const span = document.createElement('span')
        // span.setAttribute('class', 'ant-table-row-indent indent-level-' + item.level)
        span.style.paddingLeft = item.level * 20 + 'px'
        span.innerHTML = `
           ${cell.innerText}
        `
        cell.innerText = ''
        cell.appendChild(span)
      })
      const scrollTop = this.scroller.scrollTop
      this.start = Math.floor(scrollTop / this.itemSize)
      const wrapHeight = this.itemSize * this.tree.length
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
    },

    // 迭代处理
    flatArray (data = [], childrenName = 'children') {
      const result = [];
      const loop = (array, level) => {
        array.forEach(item => {
          item.level = level
          item.visible = true
          item.hasChild = false
          if (item[childrenName]) {
            item.expand = true
            item.hasChild = true
            const newItem = { ...item };
            delete newItem[childrenName];
            result.push(newItem);
            if (item[childrenName].length) {
              this.expandedRowKeys.push(item[this.id])
              loop(item[childrenName], level + 1);
            }
          } else {
            result.push(item);
          }
        });
      };
      loop(data, 0);
      return result;
    }
  },
  created () {
    this.tree = this.flatArray(this.dataSource)
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
