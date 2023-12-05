<template>
  <div id="app">
    <div style="margin-top: 40px; height: 350px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 list 固定高度</div>
      <my-virtual-list v-if="list.length" :items="list" :screenHeight="300"/>
    </div>
    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 table 固定高度</div>
      <my-virtual-table-fix-height
          :columns="columns"
          :data-source="tableFixList"
          id="id"
          :scrollY="300">
      </my-virtual-table-fix-height>
    </div>
    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 table 动态高度</div>
      <my-virtual-table-dynamic-height
          :columns="columns"
          :data-source="tableDynamicList"
          id="id"
          :scrollY="300">
      </my-virtual-table-dynamic-height>
    </div>
    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 table extend</div>
      <my-virtual-table-extend
          :columns="columns"
          :data-source="tableExtendList"
          id="id"
          :scrollY="300">
        <template slot="expandedRowRender" slot-scope="row">
          详细内容：{{ row.description }}
        </template>
      </my-virtual-table-extend>
    </div>
    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 li tree</div>
      <my-virtual-list-tree :screenHeight="350"/>
    </div>
    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 table tree</div>
      <my-virtual-table-tree
          :columns="columns"
          :data-source="tableTreeList"
          id="key"
          :scrollY="300">
      </my-virtual-table-tree>
    </div>
    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 table tree 2</div>
      <myVirtualTableTree2
          :data-source="tableTreeList"
          :columns="columns"
          id="key"
          :screenHeight="300">
      </myVirtualTableTree2>
    </div>
    <div style="margin-top: 40px; height: 100px"/>
  </div>
</template>

<script>
import myVirtualList from "@/components/myVirtualList";
import myVirtualTableFixHeight from "@/components/myVirtualTableFixHeight";
import myVirtualTableDynamicHeight from "@/components/myVirtualTableDynamicHeight";
import myVirtualTableExtend from "@/components/myVirtualTableExtend";
import myVirtualListTree from "@/components/myVirtualListTree";
import myVirtualTableTree from "@/components/myVirtualTableTree1";
import myVirtualTableTree2 from "@/components/myVirtualTableTree2";

export default {
  name: 'App',
  components: {
    myVirtualList,
    myVirtualTableDynamicHeight,
    myVirtualTableFixHeight,
    myVirtualTableExtend,
    myVirtualTableTree,
    myVirtualListTree,
    myVirtualTableTree2,
  },
  data () {
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address'
        }
      ],
      list1: [],
      list: [],
      tableData: [],
      count: 3000,
      tableFixList: [],
      tableDynamicList: [],
      tableExtendList: [],
      tableTreeList: [
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
              address: 'New York No. 2 Lake Park',
            },
            {
              key: 12,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 3 Lake Park',
              children: [
                {
                  key: 121,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 3 Lake Park',
                },
              ],
            },
            {
              key: 13,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 1 Lake Park',
              children: [
                {
                  key: 131,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      key: 1311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 3 Lake Park',
                    },
                    {
                      key: 1312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 4 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ],
      tableTreeList1: [
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
      columns2: [
        {
          title: 'index',
          dataIndex: 'index',
          key: 'index',
          scopedSlots: { customRender: 'index' }
        },
        {
          title: '内容',
          dataIndex: 'text',
          key: 'text'
        },
        {
          title: '内容省略',
          dataIndex: 'desc',
          key: 'desc',
          ellipsis: true
        }
      ],
    }
  },
  methods: {
    initData () {
      const list1 = []
      const tableFixList = []
      const tableDynamicList = []
      const tableExtendList = []
      for (let i = 0; i < 100; i++) {
        list1.push({
          id: i,
          label: `virtual-list ${i}`
        })
        tableFixList.push({
          id: ` ${i}`,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`
        })
        if (i % 3 === 0) {
          tableDynamicList.push({
            id: ` ${i}`,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}
            London, Park Lane no. ${i}`
          })
        } else {
          tableDynamicList.push({
            id: ` ${i}`,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`
          })
        }
        tableExtendList.push({
          id: `${i}`,
          name: `John Brown ${i}`,
          age: 32,
          address: `New York No. ${i} Lake Park`,
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        })
      }
      this.list1 = list1
      this.tableFixList = tableFixList
      this.tableDynamicList = tableDynamicList
      this.tableExtendList = tableExtendList
    },
    fetchData () {
      for (let i = 1; i < 2000; i++) {
        const text = this.getRandomContent()
        const text2 = this.getRandomContent()
        this.list.push({
          id: i,
          index: i,
          text: text,
          desc: text2,
          // 以下字段用来模拟树结构加载
          hasChildren: true, // 是否有子节点
          expanded: false, // 节点是否展开
          loading: false, // 节点loading状态
          loaded: false, // 节点是否已经加载完成
          level: 0, // 当前节点的树层级
          hideNodes: [] // 隐藏的子孙节点，用于节点收起
        })
      }
    },
    getRandomContent () {
      const content = [
        '这是一条测试数据',
        '君不见黄河之水天上来，奔流到海不复回。',
        '十年生死两茫茫',
        '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。',
        '桃花坞里桃花庵，桃花庵里桃花仙；桃花仙人种桃树，又摘桃花卖酒钱。',
        '明月几时有，把酒问青天。',
        '槛菊愁烟兰泣露，罗幕轻寒，',
        '寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？',
        '红豆生南国，春来发几枝。',
        '黄鹂'
      ]
      const i = Math.floor(Math.random() * 10)
      return content[i]
    },
    // 展开收起事件
    onExpand (row) {
      row.expanded = !row.expanded
      if (row.expanded) {
        this.loadChildNodes(row)
      } else {
        this.hideChildNodes(row)
      }
    },
    // 加载子节点
    loadChildNodes (row) {
      // 如果已经加载，则显示隐藏的字节点
      if (row.loaded) {
        const index = this.list.findIndex(item => item === row)
        if (index > -1) {
          this.list.splice(index + 1, 0, ...row.hideNodes)
        }
        return
      }

      // 获取子节点数据并显示
      row.loading = true
      setTimeout(() => {
        row.loading = false
        row.loaded = true

        const data = []
        for (let i = 0; i < 10; i++) {
          data.push({
            id: this.count++,
            show: false,
            text: this.getRandomContent(),
            text2: this.getRandomContent(),
            hasChildren: row.level > 3 ? false : true,
            expanded: false,
            loading: false,
            level: row.level + 1,
            hideNodes: []
          })
        }

        // 所有子节点插入到当前同级节点下
        const index = this.list.findIndex(item => item === row)
        if (index > -1) {
          this.list.splice(index + 1, 0, ...data)
        }
      }, 1000)
    },
    // 隐藏子节点
    hideChildNodes (row) {
      const index = this.list.findIndex(item => item === row)
      if (index === -1) return

      // 查找当前节点的所有子孙节点
      const hideNodes = []
      for (let i = index + 1; i < this.list.length; i++) {
        const curRow = this.list[i]
        if (curRow.level <= row.level) break
        hideNodes.push(curRow)
      }
      row.hideNodes = hideNodes
      // 隐藏所有子孙节点
      this.list = this.list.filter(item => !hideNodes.includes(item))
    }
  },
  mounted () {
    this.initData()
    this.fetchData()
  }
}
</script>

<style>
</style>
