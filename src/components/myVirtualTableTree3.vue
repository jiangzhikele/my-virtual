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
        <span>
          <template v-if="errSpanIds.indexOf(row.spanId) !== -1 || (!expandedRowKeys.includes(row.spanId) && errAllSpanIds.includes(row.spanId))">
            <a-icon type="exclamation-circle" theme="filled" style="color: red; margin-right: 3px"/>
          </template>
          <a-tooltip placement="topLeft">
            <template slot="title">
              {{ row.serviceName }}
            </template>
            <span style="font-weight: bolder;">{{ row.serviceName }}</span>
          </a-tooltip>
          <span>&nbsp;&nbsp;&nbsp;</span>
        </span>
        <a-tooltip placement="topLeft">
          <template slot="title">
            {{ row.spanNameAnnotation || row.spanName }}
          </template>
          <a class="operation" @click.p.prevent="clickRow(row)">{{ row.spanNameAnnotation || row.spanName }}</a>
        </a-tooltip>
      </template>
      <template slot="Title">
        <span class="title">Service & Operation</span>
        <span style="margin-left: 40px">
          <a-tooltip title="全部展开">
            <a-icon type="double-right" class="btn-expand" @click.native="expandAll()"/>
          </a-tooltip>
          <a-tooltip title="全部收缩">
            <a-icon type="double-right" class="btn" @click.native="collapseAll()"/>
          </a-tooltip>
        </span>
      </template>
      <template slot="time1Title">
        <span>{{ timeTitle.one }}</span>
      </template>
      <template slot="time2Title">
        <span>{{ timeTitle.two }}</span>
      </template>
      <template slot="time3Title">
        <span>{{ timeTitle.three }}</span>
      </template>
    </a-table>
  </div>
</template>

<script>

const renderContent = (value) => {
  return {
    children: value,
    attrs: {
      colSpan: 0
    }
  }
}

export default {
  name: 'el-table-virtual-scroll',
  components: {
  },
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    // key值，data数据中的唯一id
    id: {
      type: String,
      default: 'id'
    },
    parentId: {
      type: String,
      default: 'parentId'
    },
    screenHeight: {
      type: Number,
      default: 300
    },
    errSpanIds: {
      type: Array,
      default: () => []
    },
    errAllSpanIds: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      expandedRowKeys: [],
      maxDuration: 0,
      startMs: 0,
      timeTitle: {
        one: '0μs',
        two: '0μs',
        three: '0μs',
        four: '0μs',
        five: '0μs'
      },
      color: {
        http: '#00bbc0',
        rpc: '#eaaa77',
        db: '#ff8f67',
        mq: '#b28858'
      },
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          width: 500,
          ellipsis: true,
          scopedSlots: { customRender: 'name' },
          slots: { title: 'Title' }
        },
        {
          key: 'time1',
          dataIndex: 'time1',
          slots: { title: 'time1Title' },
          scopedSlots: { customRender: 'time1' },
          customRender: (text, row) => {
            const left = (row.startTime - this.startMs) / this.maxDuration * 100
            const wid = (1 - (this.maxDuration - row.duration) / this.maxDuration) * 100
            const blank = 100 - left - wid
            const tStyle = wid > 90 ? 'not' : (left < blank ? 'right' : 'left')
            let color = this.color.http
            if (row.type === 'db') {
              color = this.color.db
            }
            if (row.type === 'rpc') {
              color = this.color.rpc
            }
            if (row.type === 'mq') {
              color = this.color.mq
            }
            const duration = row.duration
            const obj = {
              children: <div style={{ marginLeft: left + '%', padding: 0, width: wid + '%', height: '10px', backgroundColor: color }}></div>,
              attrs: {
                colSpan: 4
              }
            }
            if (tStyle === 'left') {
              obj.children = <div>
                <div class="timeLineLeft" style={{ marginLeft: 'calc(' + left + '% - 80px )' }}>{this.formatMs(duration)}</div>
                <div style={{ marginLeft: left + '%', padding: 0, width: wid + '%', height: '10px', backgroundColor: color }}></div>
              </div>
            }
            if (tStyle === 'right') {
              obj.children = <div>
                <div style={{ marginLeft: left + '%', padding: 0, width: wid + '%', height: '10px', backgroundColor: color, float: 'left', display: 'inline' }}></div>
                <div class="timeLineRight">{this.formatMs(duration)}</div>
              </div>
            }
            return obj
          }
        },
        {
          key: 'time2',
          slots: { title: 'time2Title' },
          customRender: renderContent
        },
        {
          key: 'time3',
          slots: { title: 'time3Title' },
          customRender: renderContent
        },
        {
          title: () => {
            const html = (
                <div>
                  <div class="title-left">{this.timeTitle.four}</div>
                  <div class="title-right">{this.timeTitle.five}</div>
                </div>
            )
            return html
          },
          key: 'time4',
          // width: 300,
          slots: { title: 'time4Title' },
          align: 'center',
          className: 'timeTitle',
          customRender: renderContent
        }
      ],
      tree: [],
      treeTemp: [],
      tableClass: ['.ant-table-scroll .ant-table-body', '.ant-table-fixed-left .ant-table-body-inner', '.ant-table-fixed-right .ant-table-body-inner'],
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

        const size = typeof offsetBak[key] === 'number' ? offsetBak[key] : itemSize
        total += size
      }
      return res
    },
    columnKey () {
      return this.columns[0].key
    }
  },

  methods: {
    expandAll () {
      const expandedRowKeys = []
      for (let i = 0; i < this.treeTemp.length; i++) {
        const curRow = this.treeTemp[i]
        if (i !== 0) {
          curRow.visible = true
        }
        if (curRow.hasChild) {
          expandedRowKeys.push(curRow[this.id])
          curRow.expand = true
        }
      }
      this.expandedRowKeys = expandedRowKeys
      this.tree = this.treeTemp.filter(r => r.visible)
      this.doUpdate()
    },

    collapseAll () {
      for (let i = 0; i < this.treeTemp.length; i++) {
        const curRow = this.treeTemp[i]
        if (i !== 0) {
          curRow.visible = false
        }
        if (curRow.hasChild) {
          curRow.expand = false
          this.expandedRowKeys = []
        }
      }
      this.tree = this.treeTemp.filter(r => r.visible)
      this.doUpdate()
    },

    setTimeTitle (time) {
      if (time && time !== 0) {
        this.timeTitle.two = this.formatMs(time * 0.25)
        this.timeTitle.three = this.formatMs(time * 0.5)
        this.timeTitle.four = this.formatMs(time * 0.75)
        this.timeTitle.five = this.formatMs(time)
      }
    },

    formatMs (time) {
      if (time && time !== 0) {
        const ms = time / 1000
        if (ms < 1) {
          return parseFloat(time).toFixed(2) + 'μs'
        }
        const m = ms / 1000
        if (m < 1) {
          return parseFloat(ms).toFixed(2) + 'ms'
        } else {
          return parseFloat(m).toFixed(2) + 's'
        }
      }
      return '0μs'
    },

    clickRow (record) {
      alert(JSON.stringify(record))
    },

    onExpand (row) {
      row.expand = !row.expand
      if (row.expand) {
        this.loadChildNodes(row)
      } else {
        this.hideChildNodes(row)
      }
    },

    loadChildNodes (row) {
      const index = this.treeTemp.findIndex(item => item === row)
      if (index === -1) return
      this.expandedRowKeys.push(row[this.id])
      const level = row.level
      const childCount = row.childCount || 0
      let count = 0
      for (let i = index + 1; i < this.treeTemp.length; i++) {
        const curRow = this.treeTemp[i]
        if (curRow.level !== level + 1) continue
        curRow.visible = true
        count ++
        if (count === childCount ) break
      }
      this.tree = this.treeTemp.filter(r => r.visible)
      this.doUpdate()
    },

    hideChildNodes (row) {
      const index = this.treeTemp.findIndex(item => item === row)
      if (index === -1) return
      this.expandedRowKeys = this.expandedRowKeys.filter(r => r !== row[this.id])
      for (let i = index + 1; i < this.treeTemp.length; i++) {
        const curRow = this.treeTemp[i]
        if (curRow.level <= row.level) break
        curRow.visible = false
        if (curRow.hasChild) {
          curRow.expand = false
          this.expandedRowKeys = this.expandedRowKeys.filter(r => r !== curRow[this.id])
        }
      }
      this.tree = this.treeTemp.filter(r => r.visible)
      this.doUpdate()
    },

    initData () {
      this.scroller = this.$el.querySelector('.ant-table-body')
      this.scroller.addEventListener('scroll', this.scrollEvent)
      this.maxDuration = this.treeTemp[0] ? this.treeTemp[0].duration : 0
      this.startMs = this.treeTemp[0] ? this.treeTemp[0].startTime : 0
      this.setTimeTitle(this.maxDuration, 'μs')
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

    handleScroll () {
      // 更新当前尺寸（高度）
      this.updateOffset()
      // visibleData
      this.calcVisibleData()
      // 计算位置
      this.calcPosition()
    },

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

    calcPosition () {
      const last = this.tree.length - 1
      // 计算内容总高度
      const wrapHeight = this.getItemOffset(last) + this.getItemSize(last)
      // 计算当前滚动位置需要撑起的高度
      const offsetTop = this.getItemOffset(this.start)

      // 设置dom位置
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

    getItemOffset (index) {
      const item = this.tree[index]
      if (item) {
        return this.offsetMap[item[this.id]] || 0
      }
      return 0
    },

    getItemSize (index) {
      if (index <= -1) return 0
      const item = this.tree[index]
      if (item) {
        const key = item[this.id]
        return this.offsetBak[key] || this.itemSize
      }
      return this.itemSize
    },

    flatArray (data = [], childrenName = 'children') {
      const result = []
      const loop = (array, level) => {
        array.forEach(item => {
          item.level = level
          item.visible = true
          item.hasChild = false
          if (item[childrenName]) {
            item.expand = true
            item.hasChild = true
            item.childCount = item[childrenName].length
            const newItem = { ...item }
            delete newItem[childrenName]
            result.push(newItem)
            if (item[childrenName].length) {
              this.expandedRowKeys.push(item[this.id])
              loop(item[childrenName], level + 1)
            }
          } else {
            result.push(item)
          }
        });
      };
      loop(data, 0)
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
.btn,
.btn-expand {
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  margin-right: 0.3rem;
  padding: 0.1rem;
}

.btn:hover,
.btn-expand:hover {
  color: rgba(0, 0, 0, 0.85);
}

.btn-expand {
  transform: rotate(90deg);
}

.title {
  flex: 1;
  overflow: hidden;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.operation{
  font-size: 12px;
}

.operation:hover{
  font-weight: bolder;
}

.timeLineLeft{
  font-size: 10px;
  height: 10px;
  line-height: 10px;
  float: left;
  display: inline;
}

.timeLineLeft:hover{
  font-weight: bolder;
}

.timeLineRight{
  font-size: 10px;
  height: 10px;
  line-height: 10px;
  float: left;
  display: inline;
  margin-left: 5px;
}

.timeLineRight:hover{
  font-weight: bolder;
}

.timeTitle {
  margin: 0;
  padding: 0;
  position: relative;
}

.timeTitle .title-left {
  position: absolute;
  left: 16px;
}
.timeTitle .title-right {
  position: absolute;
  right: 16px;
}

</style>