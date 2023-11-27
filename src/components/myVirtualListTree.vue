<template>
  <div class="wrap" ref="wrap" @scroll="handleScroll" :style="{ height: screenHeight + 'px' }">
    <div class="invent-space" :style="{ height: contentHeight + 'px' }"></div>
    <div class="container" :style="{ transform: getTransform }">
      <div
          class="tree-item"
          v-for="(item, i) in visibleData"
          :key="i"
          v-show="item.visible"
          @click="handleExpand(item)"
          :style="`padding-left:${item.level * 20}px`"
      >
        <span>
          <span>
            <a-icon v-show="item.children.length" :type="item.expand ? 'caret-down' : 'caret-right'"  />
            <i :style="`margin-left:${item.children.length ? 0 : 16}px`"/>
          </span>
          {{item.address}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    screenHeight: {
      type: Number,
      default: 350
    }
  },
  data () {
    return {
      data: [
        {
          key: 1,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 11 Lake Park',
            },
            {
              key: 12,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 12 Lake Park',
              children: [
                {
                  key: 121,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 121 Lake Park',
                },
              ],
            },
            {
              key: 13,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 13 Lake Park',
              children: [
                {
                  key: 131,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 131 Lake Park',
                  children: [
                    {
                      key: 1311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 1311 Lake Park',
                    },
                    {
                      key: 1312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 1312 Lake Park',
                      children: [
                        {
                          key: 13121,
                          name: 'Jim Green jr.',
                          age: 25,
                          address: 'London No. 13121 Lake Park',
                        },
                        {
                          key: 13122,
                          name: 'Jimmy Green sr.',
                          age: 18,
                          address: 'London No. 13122 Lake Park',
                          children: [
                            {
                              key: 131221,
                              name: 'Jim Green jr.',
                              age: 25,
                              address: 'London No. 131221 Lake Park',
                            },
                            {
                              key: 131222,
                              name: 'Jimmy Green sr.',
                              age: 18,
                              address: 'London No. 131222 Lake Park',
                              children: [
                                {
                                  key: 1312221,
                                  name: 'Jim Green jr.',
                                  age: 25,
                                  address: 'London No. 1312221 Lake Park',
                                },
                                {
                                  key: 1312222,
                                  name: 'Jimmy Green sr.',
                                  age: 18,
                                  address: 'London No. 1312222 Lake Park',
                                  children: [
                                    {
                                      key: 13122221,
                                      name: 'Jim Green jr.',
                                      age: 25,
                                      address: 'London No. 13122221 Lake Park',
                                    },
                                    {
                                      key: 13122222,
                                      name: 'Jimmy Green sr.',
                                      age: 18,
                                      address: 'London No. 13122222 Lake Park',
                                      children: [
                                        {
                                          key: 131222221,
                                          name: 'Jim Green jr.',
                                          age: 25,
                                          address: 'London No. 131222221 Lake Park',
                                        },
                                        {
                                          key: 131222222,
                                          name: 'Jimmy Green sr.',
                                          age: 18,
                                          address: 'London No. 131222222 Lake Park',
                                          children: [
                                            {
                                              key: 1312222221,
                                              name: 'Jim Green jr.',
                                              age: 25,
                                              address: 'London No. 1312222221 Lake Park',
                                            },
                                            {
                                              key: 1312222222,
                                              name: 'Jimmy Green sr.',
                                              age: 18,
                                              address: 'London No. 1312222222 Lake Park',
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 2,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 2 Lake Park',
          children: [
            {
              key: 21,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 21 Lake Park',
            },
            {
              key: 22,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 22 Lake Park',
              children: [
                {
                  key: 221,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 221 Lake Park',
                },
              ],
            },
            {
              key: 23,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 23 Lake Park',
              children: [
                {
                  key: 231,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 231 Lake Park',
                  children: [
                    {
                      key: 2311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 2311 Lake Park',
                    },
                    {
                      key: 2312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 2312 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 3,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 31,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 31 Lake Park',
            },
            {
              key: 32,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 32 Lake Park',
              children: [
                {
                  key: 321,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 321 Lake Park',
                },
              ],
            },
            {
              key: 33,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 33 Lake Park',
              children: [
                {
                  key: 331,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 331 Lake Park',
                  children: [
                    {
                      key: 3311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 3311 Lake Park',
                    },
                    {
                      key: 3312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 3312 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 4,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 4 Lake Park',
          children: [
            {
              key: 41,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 41 Lake Park',
            },
            {
              key: 42,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 42 Lake Park',
              children: [
                {
                  key: 421,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 421 Lake Park',
                },
              ],
            },
            {
              key: 43,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 43 Lake Park',
              children: [
                {
                  key: 431,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 431 Lake Park',
                  children: [
                    {
                      key: 4311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 4311 Lake Park',
                    },
                    {
                      key: 4312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 4312 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 5,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 5 Lake Park',
          children: [
            {
              key: 51,
              name: 'John Brown',
              age: 52,
              address: 'New York No. 51 Lake Park',
            },
            {
              key: 52,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 52 Lake Park',
              children: [
                {
                  key: 521,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 521 Lake Park',
                },
              ],
            },
            {
              key: 53,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 53 Lake Park',
              children: [
                {
                  key: 531,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 531 Lake Park',
                  children: [
                    {
                      key: 5311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 5311 Lake Park',
                    },
                    {
                      key: 5312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 5312 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        }
      ],
      treeData: [],
      start: 0,
      startOffset: 0,
      itemSize: 25 // 节点的高度
    }
  },
  computed: {
    contentHeight () { // 已展示的树节点高度，过滤掉未展开显示的
      return (
          (this.treeData || []).filter(item => item.visible).length *
          this.itemSize
      )
    },
    getTransform () {
      // return `translate3d(0,${this.startOffset}px,0)`
      return `translateY(${this.startOffset}px)`
    },
    unHiddenList () { // 已展开未隐藏的树节点
      return (this.treeData || []).filter(item => item.visible)
    },
    visibleData () { // 渲染的树形节点数据
      return this.unHiddenList.slice(this.start, this.end)
    },
    visibleCount () {
      // 向上取整，再增加缓冲区,多加一屏
      return Math.ceil(this.screenHeight / this.itemSize) * 2
    },
    end () {
      // 此时的结束索引
      let end = this.start + this.visibleCount
      if (!this.unHiddenList[end]) {
        end = this.unHiddenList.length
      }
      return end
    },
  },
  methods: {
    // handleExpand (node) { // 点击节点操作
    //   node.expand = !node.expand
    //   if (node.children && node.children.length) {
    //     this.setTreeStatus(node.children, node.expand)
    //   }
    // },
    // setTreeStatus (node, status) { // 隐藏节点
    //   node.forEach((item) => {
    //     item.visible = status
    //     if (item.children && item.children.length) {
    //       item.expand = status
    //       this.setTreeStatus(item.children, status)
    //     }
    //   })
    // },
    handleExpand (node) { // 点击节点操作
      node.expand = !node.expand
      if (node.expand && node.children.length) {
        node.children.forEach((item) => { // 将点击节点的子节点显示
          item.visible = node.expand
        })
      } else if (!node.expand) {
        this.handleClose(node.children) // 隐藏点击节点的子孙节点
      }
    },
    handleClose (node) { // 隐藏节点
      node.forEach((item) => {
        item.visible = false
        if (item.children.length) {
          item.expand = false
          this.handleClose(item.children)
        }
      })
    },
    // 递归处理
    flatten_recursion (data, arr = [], parent = null, level = 0, visible = true, children = [], insert = null) {
      arr.push({...data, level, parent, visible, children})
      if (insert !== null) {
        arr[insert].children.push(arr[arr.length - 1])
      }
      if (data.children) {
        insert = arr.length - 1
        data.children.forEach((item) => {
          this.flatten_recursion(item, arr, arr[arr.length - 1], level + 1, data.expand, [], insert)
        })
      }
      return arr
    },
    // 迭代处理
    flatten_iteration (tree) {
      let flatData = []
      let stack = [...tree]
      let parentIndex = {} // 存储level的索引
      while (stack.length) {
        let node = stack.shift()
        if (!node.level) {
          node.level = 0
          node.visible = true
        }
        if (node.children) {
          node.expand = true
          parentIndex[node.level] = flatData.length // node的level索引等于flatData的长度，因为接下来push的就是node
          stack.unshift(...node.children.map(item => { // 设置子类的level
            return {...item, level: node.level + 1, visible: node.expand}
          }))
        }
        flatData.push({...node, children: []})
        if (node.level !== 0) { // 添加子类引用（只要不是第一层，node肯定有父节点）
          flatData[parentIndex[node.level - 1]].children.push(flatData[flatData.length - 1]) // 往当前的node的父节点的children属性添加本身
        }
      }
      return flatData
    },
    handleScroll () {
      requestAnimationFrame(() => {
        const scrollTop = this.$refs.wrap.scrollTop
        this.start = Math.floor(scrollTop / this.itemSize)
        this.startOffset = scrollTop - (scrollTop % this.itemSize)
      })
    }
  },
  created () {
    this.treeData = this.flatten_iteration(this.data)
    console.log(this.treeData)
  },
  mounted () {

  }
}
</script>

<style scoped>
.wrap {
  overflow: auto;
  margin: auto;
}
.invent-space {
  float: left;
}
.container {
  margin: 0 auto;
  padding: 0;
  overflow-x: hidden;
}
.tree-item {
  padding: 2px 0;
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
  /*overflow: hidden;*/
}
.icon-tree {
  color: #ff9600;
}

</style>