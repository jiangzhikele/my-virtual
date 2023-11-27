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
<!--    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">-->
<!--      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue2 table tree</div>-->
<!--      <my-virtual-table-tree-->
<!--          :columns="columns"-->
<!--          :data-source="tableTreeList"-->
<!--          id="key"-->
<!--          :scrollY="300">-->
<!--      </my-virtual-table-tree>-->
<!--    </div>-->
    <div style="margin-top: 40px; height: 100px"/>
  </div>
</template>

<script>
import myVirtualList from "@/components/myVirtualList";
import myVirtualTableFixHeight from "@/components/myVirtualTableFixHeight";
import myVirtualTableDynamicHeight from "@/components/myVirtualTableDynamicHeight";
import myVirtualTableExtend from "@/components/myVirtualTableExtend";
// import myVirtualTableTree from "@/components/myVirtualTableTree";
import myVirtualListTree from "@/components/myVirtualListTree";

export default {
  name: 'App',
  components: {
    myVirtualList,
    myVirtualTableDynamicHeight,
    myVirtualTableFixHeight,
    myVirtualTableExtend,
    // myVirtualTableTree,
    myVirtualListTree
  },
  data () {
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
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
      list: [],
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
      ]
    }
  },
  methods: {
    initData () {
      const list = []
      const tableFixList = []
      const tableDynamicList = []
      const tableExtendList = []
      for (let i = 0; i < 100; i++) {
        list.push({
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
      this.list = list
      this.tableFixList = tableFixList
      this.tableDynamicList = tableDynamicList
      this.tableExtendList = tableExtendList
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style>
</style>
