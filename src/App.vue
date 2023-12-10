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
      <myVirtualTableTree1
          :columns="columns"
          :data-source="tableTreeList"
          id="key"
          :scrollY="300">
      </myVirtualTableTree1>
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
    <div style="margin-top: 40px; height: 400px; border: #555555 1px solid">
      <div style="text-align: center; height: 30px; font-size: larger; font-weight: bolder">vue table tree 3 trace</div>
      <myVirtualTableTree3
          :data-source="tableTreeList3"
          id="spanId"
          parentId="parentSpanId"
          :errSpanIds="errSpanIds"
          :errAllSpanIds="errAllSpanIds"
          :screenHeight="600">
      </myVirtualTableTree3>
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
import myVirtualTableTree1 from "@/components/myVirtualTableTree1";
import myVirtualTableTree2 from "@/components/myVirtualTableTree2";
import myVirtualTableTree3 from "@/components/myVirtualTableTree3";

export default {
  name: 'App',
  components: {
    myVirtualList,
    myVirtualTableDynamicHeight,
    myVirtualTableFixHeight,
    myVirtualTableExtend,
    myVirtualListTree,
    myVirtualTableTree1,
    myVirtualTableTree2,
    myVirtualTableTree3,
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
      ],
      tableTreeList3: [
        {
          "spanId": "865ad356c36eb0ea",
          "parentSpanId": "bbbbbbbbbbbbbbbb",
          "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
          "startTime": 1701778948572000,
          "endTime": 1701778948631000,
          "serviceName": "web-middle",
          "spanNameAnnotation": "",
          "spanName": "/user/apps/getAppsBasicInfo",
          "duration": 59000,
          "kind": 2,
          "type": "http",
          "value": "",
          "error": false,
          "sequence": 0,
          "children": [
            {
              "spanId": "782becf6a32fc45c",
              "parentSpanId": "865ad356c36eb0ea",
              "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
              "startTime": 1701778948572000,
              "endTime": 1701778948631000,
              "serviceName": "web-middle",
              "spanNameAnnotation": "",
              "spanName": "org.apache.catalina.core.StandardHostValve.invoke(org.apache.catalina.connector.Request request, org.apache.catalina.connector.Response response)",
              "duration": 59000,
              "kind": 1,
              "type": "http",
              "value": "",
              "error": false,
              "sequence": 0,
              "children": [
                {
                  "spanId": "2341468d61470a91",
                  "parentSpanId": "782becf6a32fc45c",
                  "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                  "startTime": 1701778948572000,
                  "endTime": 1701778948631000,
                  "serviceName": "web-middle",
                  "spanNameAnnotation": "",
                  "spanName": "org.springframework.web.servlet.FrameworkServlet.doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response)",
                  "duration": 59000,
                  "kind": 1,
                  "type": "http",
                  "value": "",
                  "error": false,
                  "sequence": 1,
                  "children": [
                    {
                      "spanId": "774fc5d110897802",
                      "parentSpanId": "2341468d61470a91",
                      "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                      "startTime": 1701778948572000,
                      "endTime": 1701778948591000,
                      "serviceName": "web-middle",
                      "spanNameAnnotation": "",
                      "spanName": "org.apache.dubbo.rpc.protocol.AbstractInvoker.invoke(org.apache.dubbo.rpc.Invocation inv)",
                      "duration": 19000,
                      "kind": 3,
                      "type": "rpc",
                      "value": "dubbo",
                      "error": false,
                      "sequence": 2,
                      "children": [
                        {
                          "spanId": "900686bf086b0f6c",
                          "parentSpanId": "774fc5d110897802",
                          "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                          "startTime": 1701778948572000,
                          "endTime": 1701778948590000,
                          "serviceName": "user-center",
                          "spanNameAnnotation": "",
                          "spanName": "cn.gov.zcy.paas.auth.service.AccessContextService:resolveUseHash(java.lang.String,java.lang.String,java.lang.String,cn.gov.zcy.paas.auth.dto.AccessEnvInfo)",
                          "duration": 18000,
                          "kind": 2,
                          "type": "rpc",
                          "value": "dubbo",
                          "error": false,
                          "sequence": 0,
                          "children": [
                            {
                              "spanId": "240661e61da0b1c3",
                              "parentSpanId": "900686bf086b0f6c",
                              "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                              "startTime": 1701778948572000,
                              "endTime": 1701778948590000,
                              "serviceName": "user-center",
                              "spanNameAnnotation": "",
                              "spanName": "org.apache.dubbo.rpc.proxy.AbstractProxyInvoker.invoke(org.apache.dubbo.rpc.Invocation invocation)",
                              "duration": 18000,
                              "kind": 1,
                              "type": "http",
                              "value": "",
                              "error": false,
                              "sequence": 0,
                              "children": [
                                {
                                  "spanId": "4aabe295d0f981c8",
                                  "parentSpanId": "240661e61da0b1c3",
                                  "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                  "startTime": 1701778948581000,
                                  "endTime": 1701778948586000,
                                  "serviceName": "user-center",
                                  "spanNameAnnotation": "",
                                  "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
                                  "duration": 5000,
                                  "kind": 3,
                                  "type": "db",
                                  "value": "redis",
                                  "error": false,
                                  "sequence": 5,
                                  "children": null
                                },
                                {
                                  "spanId": "b8e04e1d232fe9a6",
                                  "parentSpanId": "240661e61da0b1c3",
                                  "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                  "startTime": 1701778948586000,
                                  "endTime": 1701778948589000,
                                  "serviceName": "user-center",
                                  "spanNameAnnotation": "",
                                  "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
                                  "duration": 3000,
                                  "kind": 3,
                                  "type": "db",
                                  "value": "redis",
                                  "error": false,
                                  "sequence": 7,
                                  "children": null
                                },
                                {
                                  "spanId": "0df5109c9a2af74a",
                                  "parentSpanId": "240661e61da0b1c3",
                                  "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                  "startTime": 1701778948589000,
                                  "endTime": 1701778948590000,
                                  "serviceName": "user-center",
                                  "spanNameAnnotation": "",
                                  "spanName": "cn.gov.zcy.paas.privilege.runtime.PrivilegeRuntimeServiceImpl.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
                                  "duration": 1000,
                                  "kind": 1,
                                  "type": "http",
                                  "value": "",
                                  "error": false,
                                  "sequence": 8,
                                  "children": [
                                    {
                                      "spanId": "8382aacc35b68d50",
                                      "parentSpanId": "0df5109c9a2af74a",
                                      "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                      "startTime": 1701778948589000,
                                      "endTime": 1701778948590000,
                                      "serviceName": "user-center",
                                      "spanNameAnnotation": "",
                                      "spanName": "cn.gov.zcy.paas.privilege.runtime.ApiRuntimeServiceHelper.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
                                      "duration": 1000,
                                      "kind": 1,
                                      "type": "http",
                                      "value": "",
                                      "error": false,
                                      "sequence": 9,
                                      "children": null
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "spanId": "7faddacb79d342e4",
                      "parentSpanId": "2341468d61470a91",
                      "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                      "startTime": 1701778948591000,
                      "endTime": 1701778948630000,
                      "serviceName": "web-middle",
                      "spanNameAnnotation": "",
                      "spanName": "com.dtdream.vanyar.user.web.workbench.FrontFrameworkController.getAppsBasicInfo(java.lang.String host, java.lang.String path, javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response)",
                      "duration": 39000,
                      "kind": 1,
                      "type": "http",
                      "value": "",
                      "error": false,
                      "sequence": 4,
                      "children": [
                        {
                          "spanId": "1ca90bec0a99eaaa",
                          "parentSpanId": "7faddacb79d342e4",
                          "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                          "startTime": 1701778948591000,
                          "endTime": 1701778948630000,
                          "serviceName": "web-middle",
                          "spanNameAnnotation": "",
                          "spanName": "org.apache.dubbo.rpc.protocol.AbstractInvoker.invoke(org.apache.dubbo.rpc.Invocation inv)",
                          "duration": 39000,
                          "kind": 3,
                          "type": "rpc",
                          "value": "dubbo",
                          "error": false,
                          "sequence": 5,
                          "children": [
                            {
                              "spanId": "cb4a125c7c485e93",
                              "parentSpanId": "1ca90bec0a99eaaa",
                              "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                              "startTime": 1701778948591000,
                              "endTime": 1701778948628000,
                              "serviceName": "user-center",
                              "spanNameAnnotation": "",
                              "spanName": "com.dtdream.vanyar.privilege.service.WorkbenchService:getAppsBasicInfo(com.dtdream.vanyar.privilege.model.workbench.MenuQuery)",
                              "duration": 37000,
                              "kind": 2,
                              "type": "rpc",
                              "value": "dubbo",
                              "error": false,
                              "sequence": 0,
                              "children": [
                                {
                                  "spanId": "248d2cee95f93355",
                                  "parentSpanId": "cb4a125c7c485e93",
                                  "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                  "startTime": 1701778948592000,
                                  "endTime": 1701778948628000,
                                  "serviceName": "user-center",
                                  "spanNameAnnotation": "",
                                  "spanName": "org.apache.dubbo.rpc.proxy.AbstractProxyInvoker.invoke(org.apache.dubbo.rpc.Invocation invocation)",
                                  "duration": 36000,
                                  "kind": 1,
                                  "type": "http",
                                  "value": "",
                                  "error": false,
                                  "sequence": 0,
                                  "children": [
                                    {
                                      "spanId": "f650bac5f300e0c4",
                                      "parentSpanId": "248d2cee95f93355",
                                      "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                      "startTime": 1701778948591000,
                                      "endTime": 1701778948614000,
                                      "serviceName": "user-center",
                                      "spanNameAnnotation": "",
                                      "spanName": "cn.gov.zcy.paas.privilege.runtime.PrivilegeRuntimeServiceImpl.getAppsByDimForFront(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String cookieAppCode, java.lang.String path, java.lang.String curApp, java.lang.String host, java.lang.String libraryCode)",
                                      "duration": 23000,
                                      "kind": 1,
                                      "type": "http",
                                      "value": "",
                                      "error": false,
                                      "sequence": 9,
                                      "children": [
                                        {
                                          "spanId": "d65fe8d625167b90",
                                          "parentSpanId": "f650bac5f300e0c4",
                                          "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                          "startTime": 1701778948591000,
                                          "endTime": 1701778948614000,
                                          "serviceName": "user-center",
                                          "spanNameAnnotation": "",
                                          "spanName": "cn.gov.zcy.paas.privilege.runtime.MenuRuntimeServiceHelper.getFrontApplicationWrapper(cn.gov.zcy.paas.user.dto.Operator operator, com.dtdream.vanyar.privilege.model.workbench.MenuQuery menuQuery)",
                                          "duration": 23000,
                                          "kind": 1,
                                          "type": "http",
                                          "value": "",
                                          "error": false,
                                          "sequence": 10,
                                          "children": [
                                            {
                                              "spanId": "211ae5da6dee4399",
                                              "parentSpanId": "d65fe8d625167b90",
                                              "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                              "startTime": 1701778948591000,
                                              "endTime": 1701778948593000,
                                              "serviceName": "user-center",
                                              "spanNameAnnotation": "",
                                              "spanName": "cn.gov.zcy.paas.privilege.runtime.FunctionRuntimeService.getSubscribeExcludeAppSet(java.lang.String userType, java.lang.String tenantCode, java.lang.Long institutionId)",
                                              "duration": 2000,
                                              "kind": 1,
                                              "type": "http",
                                              "value": "",
                                              "error": false,
                                              "sequence": 22,
                                              "children": [
                                                {
                                                  "spanId": "f0b09f0662167f16",
                                                  "parentSpanId": "211ae5da6dee4399",
                                                  "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                                  "startTime": 1701778948591000,
                                                  "endTime": 1701778948593000,
                                                  "serviceName": "user-center",
                                                  "spanNameAnnotation": "",
                                                  "spanName": "org.mybatis.spring.SqlSessionTemplate.selectList(java.lang.String statement, java.lang.Object parameter)",
                                                  "duration": 2000,
                                                  "kind": 1,
                                                  "type": "http",
                                                  "value": "",
                                                  "error": false,
                                                  "sequence": 23,
                                                  "children": [
                                                    {
                                                      "spanId": "5acc3555f54fca5b",
                                                      "parentSpanId": "f0b09f0662167f16",
                                                      "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                                      "startTime": 1701778948591000,
                                                      "endTime": 1701778948593000,
                                                      "serviceName": "user-center",
                                                      "spanNameAnnotation": "",
                                                      "spanName": "org.apache.ibatis.executor.BaseExecutor.query(org.apache.ibatis.mapping.MappedStatement ms, java.lang.Object parameter, org.apache.ibatis.session.RowBounds rowBounds, org.apache.ibatis.session.ResultHandler resultHandler, org.apache.ibatis.cache.CacheKey key, org.apache.ibatis.mapping.BoundSql boundSql)",
                                                      "duration": 2000,
                                                      "kind": 1,
                                                      "type": "http",
                                                      "value": "",
                                                      "error": false,
                                                      "sequence": 24,
                                                      "children": [
                                                        {
                                                          "spanId": "446e31b94e563ea2",
                                                          "parentSpanId": "5acc3555f54fca5b",
                                                          "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                                          "startTime": 1701778948591000,
                                                          "endTime": 1701778948593000,
                                                          "serviceName": "user-center",
                                                          "spanNameAnnotation": "",
                                                          "spanName": "com.mysql.jdbc.PreparedStatement.execute()",
                                                          "duration": 2000,
                                                          "kind": 3,
                                                          "type": "db",
                                                          "value": "mysql",
                                                          "error": false,
                                                          "sequence": 27,
                                                          "children": null
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            {
                                              "spanId": "bfce129292c83e55",
                                              "parentSpanId": "d65fe8d625167b90",
                                              "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                              "startTime": 1701778948597000,
                                              "endTime": 1701778948602000,
                                              "serviceName": "user-center",
                                              "spanNameAnnotation": "",
                                              "spanName": "cn.gov.zcy.paas.privilege.runtime.FunctionRuntimeService.getOperatorFunctionSet(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode)",
                                              "duration": 5000,
                                              "kind": 1,
                                              "type": "http",
                                              "value": "",
                                              "error": false,
                                              "sequence": 11,
                                              "children": null
                                            },
                                            {
                                              "spanId": "492653b73133773e",
                                              "parentSpanId": "d65fe8d625167b90",
                                              "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                              "startTime": 1701778948602000,
                                              "endTime": 1701778948605000,
                                              "serviceName": "user-center",
                                              "spanNameAnnotation": "",
                                              "spanName": "cn.gov.zcy.paas.privilege.runtime.FunctionRuntimeService.getSubscribeExcludeMenuSet(java.lang.String userType, java.util.List tenantCodes, java.lang.Long institutionId)",
                                              "duration": 3000,
                                              "kind": 1,
                                              "type": "http",
                                              "value": "",
                                              "error": false,
                                              "sequence": 16,
                                              "children": [
                                                {
                                                  "spanId": "58b5e105f8a9edef",
                                                  "parentSpanId": "492653b73133773e",
                                                  "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                                  "startTime": 1701778948602000,
                                                  "endTime": 1701778948605000,
                                                  "serviceName": "user-center",
                                                  "spanNameAnnotation": "",
                                                  "spanName": "org.mybatis.spring.SqlSessionTemplate.selectList(java.lang.String statement, java.lang.Object parameter)",
                                                  "duration": 3000,
                                                  "kind": 1,
                                                  "type": "http",
                                                  "value": "",
                                                  "error": false,
                                                  "sequence": 17,
                                                  "children": [
                                                    {
                                                      "spanId": "9e0ad20e015ff42c",
                                                      "parentSpanId": "58b5e105f8a9edef",
                                                      "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                                      "startTime": 1701778948602000,
                                                      "endTime": 1701778948605000,
                                                      "serviceName": "user-center",
                                                      "spanNameAnnotation": "",
                                                      "spanName": "org.apache.ibatis.executor.BaseExecutor.query(org.apache.ibatis.mapping.MappedStatement ms, java.lang.Object parameter, org.apache.ibatis.session.RowBounds rowBounds, org.apache.ibatis.session.ResultHandler resultHandler, org.apache.ibatis.cache.CacheKey key, org.apache.ibatis.mapping.BoundSql boundSql)",
                                                      "duration": 3000,
                                                      "kind": 1,
                                                      "type": "http",
                                                      "value": "",
                                                      "error": false,
                                                      "sequence": 18,
                                                      "children": [
                                                        {
                                                          "spanId": "410e2627facbfacb",
                                                          "parentSpanId": "9e0ad20e015ff42c",
                                                          "traceId": "ded1d3002ba8876f768fa62e4eb96e95",
                                                          "startTime": 1701778948603000,
                                                          "endTime": 1701778948605000,
                                                          "serviceName": "user-center",
                                                          "spanNameAnnotation": "",
                                                          "spanName": "com.mysql.jdbc.PreparedStatement.execute()",
                                                          "duration": 2000,
                                                          "kind": 3,
                                                          "type": "db",
                                                          "value": "mysql",
                                                          "error": true,
                                                          "sequence": 21,
                                                          "children": null
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      errSpanIds: ['410e2627facbfacb'],
      errAllSpanIds: ['9e0ad20e015ff42c', '58b5e105f8a9edef', '492653b73133773e', 'd65fe8d625167b90', '248d2cee95f93355', '1ca90bec0a99eaaa', 'cb4a125c7c485e93', '7faddacb79d342e4', 'f650bac5f300e0c4', '2341468d61470a91', '782becf6a32fc45c', '865ad356c36eb0ea']
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
