<template>
  <div>
    <a-table
        :pagination="false"
        :columns="columns"
        :row-key="id"
        :scroll="{y: screenHeight }"
        :data-source="visibleData"
        bordered
    >
      <template :slot="columnKey" slot-scope="text, row">
        <span :class="`ant-table-row-indent indent-level-` + row.level" :style="{ paddingLeft: `${row.level * 20}px` }"></span>
          <div
              v-if="row.hasChild"
              class="ant-table-row-expand-icon"
              :class="row.expand ? 'ant-table-row-expanded' : 'ant-table-row-collapsed'"
              @click="onExpand(row)">
          </div>
        <i v-else :style="`margin-left: 30px`"/>
        {{ text }}
      </template>
    </a-table>
  </div>
</template>

<script>

export default {
  name: 'myVirtualTableTree2',
  props: {
    columns: {
      type: Array,
      required: true
    },
    // 总数据
    dataSource: {
      type: Array,
      required: true
    },
    // key值，data数据中的唯一id
    id: {
      type: String,
      default: 'id'
    },
    screenHeight: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      tree: [],
      treeTemp: [],
      expandedRowKeys: [],
      tableClass: '.ant-table-body',
      start: 0,
      end: 0,
      itemSize: 60,
      buffer: 100,
      offsetBak: {},
      visibleData: []
    }
  },
  computed: {
    // 计算出每个item（的key值）到滚动容器顶部的距离
    offsetMap ({ id, itemSize, offsetBak, tree }) {
      const res = {}
      let total = 0
      for (let i = 0; i < tree.length; i++) {
        const key = tree[i][id]
        res[key] = total

        // 当前行的高度重新计算
        total += offsetBak[key] || itemSize
      }
      return res
    },
    columnKey () {
      return this.columns[0].key
    }
  },

  methods: {
    onExpand (row) {
      row.expand = !row.expand
      const index = this.treeTemp.findIndex(item => item === row)
      if (index === -1) return
      if (row.expand) {
        this.loadChildNodes(row, index)
      } else {
        this.hideChildNodes(row, index)
      }
      this.tree = this.treeTemp.filter(r => r.visible)
      this.doUpdate()
    },

    loadChildNodes (row, index) {
      const level = row.level
      for (let i = index + 1; i < this.treeTemp.length; i++) {
        const curRow = this.treeTemp[i]
        if (level === curRow.level ) break
        if (curRow.level !== level + 1) continue
        curRow.visible = true
      }
    },

    hideChildNodes (row, index) {
      for (let i = index + 1; i < this.treeTemp.length; i++) {
        const curRow = this.treeTemp[i]
        if (curRow.level <= row.level) break
        curRow.visible = false
        if (curRow.hasChild) {
          curRow.expand = false
        }
      }
    },

    // 初始化数据
    initData () {
      this.scroller = this.$el.querySelector('.ant-table-body')
      this.scroller.addEventListener('scroll', this.scrollEvent)
      // 初次执行
      this.$nextTick(() => {
        this.handleScroll()
      })
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
      // 更新当前尺寸（高度）
      this.updateOffset()
      // visibleData
      this.calcVisibleData()
      // 计算位置
      this.calcPosition()
    },

    // 更新尺寸（高度）
    updateOffset () {
      const rows = this.$el.querySelectorAll('.ant-table-body .ant-table-tbody .ant-table-row')
      Array.from(rows).forEach((row, index) => {
        const item = this.visibleData[index]
        if (!item) return
        // 计算表格行的高度
        let offsetHeight = row.offsetHeight

        const key = item[this.id]
        if (offsetHeight && this.offsetBak[key] !== offsetHeight) {
          this.$set(this.offsetBak, key, offsetHeight)
        }
      })
    },

    // 计算只在视图上渲染的数据
    calcVisibleData () {
      const { scroller, tree, buffer } = this
      // 计算可视范围顶部、底部
      const scrollTop = scroller.scrollTop
      const top = scrollTop - buffer
      const bottom = scrollTop + this.screenHeight + buffer

      let start
      let end
      // 二分法计算可视范围内的开始的第一个内容
      let l = 0
      let r = tree.length - 1
      let mid = 0
      while (l <= r) {
        mid = Math.floor((l + r) / 2)
        const midVal = this.getItemOffset(mid)
        if (midVal < top) {
          const midNextVal = this.getItemOffset(mid + 1)
          if (midNextVal > top) break
          l = mid + 1
        } else {
          r = mid - 1
        }
      }

      // 计算渲染内容的开始、结束索引
      start = mid
      end = tree.length - 1
      for (let i = start + 1; i < tree.length; i++) {
        const offsetTop = this.getItemOffset(i)
        if (offsetTop >= bottom) {
          end = i
          break
        }
      }

      this.start = start
      this.end = end
      this.visibleData = tree.slice(start, end + 1)
    },

    // 计算位置
    calcPosition () {
      if (!this.scroller) return
      const last = this.tree.length - 1
      // 计算内容总高度
      const wrapHeight = this.getItemOffset(last) + this.getItemSize(last)
      // 计算当前滚动位置需要撑起的高度
      const offsetTop = this.getItemOffset(this.start)
      const el = this.scroller
      // 设置dom位置
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

    // 获取某条数据offsetTop
    getItemOffset (index) {
      const item = this.tree[index]
      if (item) {
        return this.offsetMap[item[this.id]] || 0
      }
      return 0
    },

    // 获取某条数据的尺寸
    getItemSize (index) {
      if (index <= -1) return 0
      const item = this.tree[index]
      if (item) {
        const key = item[this.id]
        return this.offsetBak[key] || this.itemSize
      }
      return this.itemSize
    },

    // 递归处理
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
    },

    doUpdate () {
      if (this.hasDoUpdate) return // nextTick内已经执行过一次就不执行
      if (!this.scroller) return // scroller不存在说明未初始化完成，不执行

      this.scrollEvent()
      this.hasDoUpdate = true
      this.$nextTick(() => {
        this.hasDoUpdate = false
      })
    },

    // 销毁
    destroy () {
      if (this.scroller) {
        this.scroller.removeEventListener('scroll', this.scrollEvent)
      }
    }
  },
  mounted () {
    this.initData()
  },
  created () {
    this.treeTemp = this.flatArray(this.dataSource)
    this.tree = this.treeTemp.filter(r => r.visible)
  },
  beforeDestroy () {
    this.destroy()
  }
}
</script>

<style>
</style>