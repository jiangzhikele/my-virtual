<template>
  <div>
    <vxe-list height="400" class="my-tree" :loading="loading" :data="list">
      <template v-slot="{ items }">
        <div
            class="my-tree-item"
            v-for="item in items"
            :key="item.id"
            :class="[`level-${item._LEVEL}`, {'has-child': item._HAS_CHILDREN, 'is-expand': item._EXPAND}]"
            :style="{paddingLeft: `${item._LEVEL * 20}px`}">
          <i class="tree-icon fa fa-chevron-right" @click="toggleTreeNode(item)"></i>
          <span class="tree-label">{{ item.label }}</span>
        </div>
      </template>
    </vxe-list>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import 'vxe-table/lib/index.css'
export default {
  name: 'MyVirtualTableExtend',
  components: {
  },
  props: {
  },
  data () {
    return {
      loading: false,
      list: []
    }
  },
  computed: {
  },
  methods: {
    loadTree () {
      const data = [
        {
          "spanId": "3013630021baadd1",
          "parentSpanId": "50e6e56727850841",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881850000,
          "endTime": 1700533881856000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "org.apache.dubbo.rpc.proxy.AbstractProxyInvoker.invoke(org.apache.dubbo.rpc.Invocation invocation)",
          "duration": 6000,
          "kind": 1,
          "type": "http",
          "value": "",
          "error": false,
          "sequence": 0,
          "children": [
            {
              "spanId": "22adac378120182f",
              "parentSpanId": "3013630021baadd1",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881850000,
              "endTime": 1700533881850000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "redis.clients.jedis.BinaryJedis.isConnected()",
              "duration": 0,
              "kind": 3,
              "type": "db",
              "value": "redis",
              "error": false,
              "sequence": 1,
              "children": null
            },
            {
              "spanId": "fdfdfabf518afaa2",
              "parentSpanId": "3013630021baadd1",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881850000,
              "endTime": 1700533881850000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
              "duration": 0,
              "kind": 3,
              "type": "db",
              "value": "redis",
              "error": false,
              "sequence": 2,
              "children": null
            },
            {
              "spanId": "f0a439507dedbf8f",
              "parentSpanId": "3013630021baadd1",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881850000,
              "endTime": 1700533881850000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "redis.clients.jedis.BinaryJedis.isConnected()",
              "duration": 0,
              "kind": 3,
              "type": "db",
              "value": "redis",
              "error": false,
              "sequence": 3,
              "children": null
            },
            {
              "spanId": "26acbcf3922477f8",
              "parentSpanId": "3013630021baadd1",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881852000,
              "endTime": 1700533881855000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
              "duration": 3000,
              "kind": 3,
              "type": "db",
              "value": "redis",
              "error": false,
              "sequence": 4,
              "children": null
            },
            {
              "spanId": "2b592b73fae017ce",
              "parentSpanId": "3013630021baadd1",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881855000,
              "endTime": 1700533881856000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "cn.gov.zcy.paas.privilege.runtime.PrivilegeRuntimeServiceImpl.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
              "duration": 1000,
              "kind": 1,
              "type": "http",
              "value": "",
              "error": false,
              "sequence": 5,
              "children": [
                {
                  "spanId": "b081646445e24124",
                  "parentSpanId": "2b592b73fae017ce",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881855000,
                  "endTime": 1700533881856000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "cn.gov.zcy.paas.privilege.runtime.ApiRuntimeServiceHelper.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
                  "duration": 1000,
                  "kind": 1,
                  "type": "http",
                  "value": "",
                  "error": false,
                  "sequence": 6,
                  "children": [
                    {
                      "spanId": "6b8bcf62f71b7e3c",
                      "parentSpanId": "b081646445e24124",
                      "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                      "startTime": 1700533881855000,
                      "endTime": 1700533881855000,
                      "serviceName": "user-center",
                      "spanNameAnnotation": "",
                      "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
                      "duration": 0,
                      "kind": 1,
                      "type": "http",
                      "value": "",
                      "error": false,
                      "sequence": 7,
                      "children": null
                    },
                    {
                      "spanId": "da8ff76690477625",
                      "parentSpanId": "b081646445e24124",
                      "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                      "startTime": 1700533881856000,
                      "endTime": 1700533881856000,
                      "serviceName": "user-center",
                      "spanNameAnnotation": "",
                      "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
                      "duration": 0,
                      "kind": 1,
                      "type": "http",
                      "value": "",
                      "error": false,
                      "sequence": 8,
                      "children": null
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "spanId": "22adac378120182f",
          "parentSpanId": "3013630021baadd1",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881850000,
          "endTime": 1700533881850000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "redis.clients.jedis.BinaryJedis.isConnected()",
          "duration": 0,
          "kind": 3,
          "type": "db",
          "value": "redis",
          "error": false,
          "sequence": 1,
          "children": null
        },
        {
          "spanId": "fdfdfabf518afaa2",
          "parentSpanId": "3013630021baadd1",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881850000,
          "endTime": 1700533881850000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
          "duration": 0,
          "kind": 3,
          "type": "db",
          "value": "redis",
          "error": false,
          "sequence": 2,
          "children": null
        },
        {
          "spanId": "f0a439507dedbf8f",
          "parentSpanId": "3013630021baadd1",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881850000,
          "endTime": 1700533881850000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "redis.clients.jedis.BinaryJedis.isConnected()",
          "duration": 0,
          "kind": 3,
          "type": "db",
          "value": "redis",
          "error": false,
          "sequence": 3,
          "children": null
        },
        {
          "spanId": "50e6e56727850841",
          "parentSpanId": "0000000000000000",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881850000,
          "endTime": 1700533881856000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "cn.gov.zcy.paas.auth.service.AccessContextService:resolveUseHash(java.lang.String,java.lang.String,java.lang.String,cn.gov.zcy.paas.auth.dto.AccessEnvInfo)",
          "duration": 6000,
          "kind": 2,
          "type": "rpc",
          "value": "dubbo",
          "error": false,
          "sequence": 0,
          "children": [
            {
              "spanId": "3013630021baadd1",
              "parentSpanId": "50e6e56727850841",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881850000,
              "endTime": 1700533881856000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "org.apache.dubbo.rpc.proxy.AbstractProxyInvoker.invoke(org.apache.dubbo.rpc.Invocation invocation)",
              "duration": 6000,
              "kind": 1,
              "type": "http",
              "value": "",
              "error": false,
              "sequence": 0,
              "children": [
                {
                  "spanId": "22adac378120182f",
                  "parentSpanId": "3013630021baadd1",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881850000,
                  "endTime": 1700533881850000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "redis.clients.jedis.BinaryJedis.isConnected()",
                  "duration": 0,
                  "kind": 3,
                  "type": "db",
                  "value": "redis",
                  "error": false,
                  "sequence": 1,
                  "children": null
                },
                {
                  "spanId": "fdfdfabf518afaa2",
                  "parentSpanId": "3013630021baadd1",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881850000,
                  "endTime": 1700533881850000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
                  "duration": 0,
                  "kind": 3,
                  "type": "db",
                  "value": "redis",
                  "error": false,
                  "sequence": 2,
                  "children": null
                },
                {
                  "spanId": "f0a439507dedbf8f",
                  "parentSpanId": "3013630021baadd1",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881850000,
                  "endTime": 1700533881850000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "redis.clients.jedis.BinaryJedis.isConnected()",
                  "duration": 0,
                  "kind": 3,
                  "type": "db",
                  "value": "redis",
                  "error": false,
                  "sequence": 3,
                  "children": null
                },
                {
                  "spanId": "26acbcf3922477f8",
                  "parentSpanId": "3013630021baadd1",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881852000,
                  "endTime": 1700533881855000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
                  "duration": 3000,
                  "kind": 3,
                  "type": "db",
                  "value": "redis",
                  "error": false,
                  "sequence": 4,
                  "children": null
                },
                {
                  "spanId": "2b592b73fae017ce",
                  "parentSpanId": "3013630021baadd1",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881855000,
                  "endTime": 1700533881856000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "cn.gov.zcy.paas.privilege.runtime.PrivilegeRuntimeServiceImpl.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
                  "duration": 1000,
                  "kind": 1,
                  "type": "http",
                  "value": "",
                  "error": false,
                  "sequence": 5,
                  "children": [
                    {
                      "spanId": "b081646445e24124",
                      "parentSpanId": "2b592b73fae017ce",
                      "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                      "startTime": 1700533881855000,
                      "endTime": 1700533881856000,
                      "serviceName": "user-center",
                      "spanNameAnnotation": "",
                      "spanName": "cn.gov.zcy.paas.privilege.runtime.ApiRuntimeServiceHelper.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
                      "duration": 1000,
                      "kind": 1,
                      "type": "http",
                      "value": "",
                      "error": false,
                      "sequence": 6,
                      "children": [
                        {
                          "spanId": "6b8bcf62f71b7e3c",
                          "parentSpanId": "b081646445e24124",
                          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                          "startTime": 1700533881855000,
                          "endTime": 1700533881855000,
                          "serviceName": "user-center",
                          "spanNameAnnotation": "",
                          "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
                          "duration": 0,
                          "kind": 1,
                          "type": "http",
                          "value": "",
                          "error": false,
                          "sequence": 7,
                          "children": null
                        },
                        {
                          "spanId": "da8ff76690477625",
                          "parentSpanId": "b081646445e24124",
                          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                          "startTime": 1700533881856000,
                          "endTime": 1700533881856000,
                          "serviceName": "user-center",
                          "spanNameAnnotation": "",
                          "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
                          "duration": 0,
                          "kind": 1,
                          "type": "http",
                          "value": "",
                          "error": false,
                          "sequence": 8,
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
          "spanId": "26acbcf3922477f8",
          "parentSpanId": "3013630021baadd1",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881852000,
          "endTime": 1700533881855000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "redis.clients.jedis.BinaryJedis.get(byte[] key)",
          "duration": 3000,
          "kind": 3,
          "type": "db",
          "value": "redis",
          "error": false,
          "sequence": 4,
          "children": null
        },
        {
          "spanId": "2b592b73fae017ce",
          "parentSpanId": "3013630021baadd1",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881855000,
          "endTime": 1700533881856000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "cn.gov.zcy.paas.privilege.runtime.PrivilegeRuntimeServiceImpl.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
          "duration": 1000,
          "kind": 1,
          "type": "http",
          "value": "",
          "error": false,
          "sequence": 5,
          "children": [
            {
              "spanId": "b081646445e24124",
              "parentSpanId": "2b592b73fae017ce",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881855000,
              "endTime": 1700533881856000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "cn.gov.zcy.paas.privilege.runtime.ApiRuntimeServiceHelper.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
              "duration": 1000,
              "kind": 1,
              "type": "http",
              "value": "",
              "error": false,
              "sequence": 6,
              "children": [
                {
                  "spanId": "6b8bcf62f71b7e3c",
                  "parentSpanId": "b081646445e24124",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881855000,
                  "endTime": 1700533881855000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
                  "duration": 0,
                  "kind": 1,
                  "type": "http",
                  "value": "",
                  "error": false,
                  "sequence": 7,
                  "children": null
                },
                {
                  "spanId": "da8ff76690477625",
                  "parentSpanId": "b081646445e24124",
                  "traceId": "76e90dad92baf5cdb1637066cf6854a4",
                  "startTime": 1700533881856000,
                  "endTime": 1700533881856000,
                  "serviceName": "user-center",
                  "spanNameAnnotation": "",
                  "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
                  "duration": 0,
                  "kind": 1,
                  "type": "http",
                  "value": "",
                  "error": false,
                  "sequence": 8,
                  "children": null
                }
              ]
            }
          ]
        },
        {
          "spanId": "b081646445e24124",
          "parentSpanId": "2b592b73fae017ce",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881855000,
          "endTime": 1700533881856000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "cn.gov.zcy.paas.privilege.runtime.ApiRuntimeServiceHelper.isResourcePermit(cn.gov.zcy.paas.user.dto.Operator operator, java.lang.String libraryCode, java.lang.String path, java.lang.String method)",
          "duration": 1000,
          "kind": 1,
          "type": "http",
          "value": "",
          "error": false,
          "sequence": 6,
          "children": [
            {
              "spanId": "6b8bcf62f71b7e3c",
              "parentSpanId": "b081646445e24124",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881855000,
              "endTime": 1700533881855000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
              "duration": 0,
              "kind": 1,
              "type": "http",
              "value": "",
              "error": false,
              "sequence": 7,
              "children": null
            },
            {
              "spanId": "da8ff76690477625",
              "parentSpanId": "b081646445e24124",
              "traceId": "76e90dad92baf5cdb1637066cf6854a4",
              "startTime": 1700533881856000,
              "endTime": 1700533881856000,
              "serviceName": "user-center",
              "spanNameAnnotation": "",
              "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
              "duration": 0,
              "kind": 1,
              "type": "http",
              "value": "",
              "error": false,
              "sequence": 8,
              "children": null
            }
          ]
        },
        {
          "spanId": "6b8bcf62f71b7e3c",
          "parentSpanId": "b081646445e24124",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881855000,
          "endTime": 1700533881855000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
          "duration": 0,
          "kind": 1,
          "type": "http",
          "value": "",
          "error": false,
          "sequence": 7,
          "children": null
        },
        {
          "spanId": "da8ff76690477625",
          "parentSpanId": "b081646445e24124",
          "traceId": "76e90dad92baf5cdb1637066cf6854a4",
          "startTime": 1700533881856000,
          "endTime": 1700533881856000,
          "serviceName": "user-center",
          "spanNameAnnotation": "",
          "spanName": "cn.gov.zcy.paas.privilege.runtime.cache.ResourceMetaRuntimeService.getZcyUrlMatcher(cn.zcygov.paas.privilege.enums.ResourceTypeEnum type)",
          "duration": 0,
          "kind": 1,
          "type": "http",
          "value": "",
          "error": false,
          "sequence": 8,
          "children": null
        }
      ]
      const treeData = XEUtils.toArrayTree(data, {
        key: "spanId",
        parentKey: "parentSpanId",
        children: "children",
        mapChildren: "_X_ROW_CHILD"
      })
      console.log('treeData1:', JSON.parse(JSON.stringify(treeData)))
      XEUtils.eachTree(treeData, (item, index, items, paths, parent, nodes) => {
        // 层级
        item._LEVEL = nodes.length - 1
        // 是否展开
        item._EXPAND = false
        // 是否可视
        item._VISIBLE = !item._LEVEL
        // 是否有子节点
        item._HAS_CHILDREN = item.children && item.children.length > 0
        // 是否叶子节点
        item._IS_LEAF = !item._HAS_CHILDREN
      })
      console.log('treeData2:', Object.freeze(treeData))
      this.tree = treeData
      this.refreshTree()
    },
    // 切换树节点的展开、收缩
    toggleTreeNode (row) {
      if (row._HAS_CHILDREN) {
        this.setTreeExpand(row, !row._EXPAND)
      }
    },
    // 设置树节点的展开、收缩
    setTreeExpand (row, isExpand) {
      const matchObj = XEUtils.findTree(this.tree, item => item === row)
      row._EXPAND = isExpand
      if (matchObj) {
        XEUtils.eachTree(matchObj.item.children, (item, index, items, path, parent) => {
          item._VISIBLE = parent ? parent._EXPAND && parent._VISIBLE : isExpand
        })
      }
      this.refreshTree()
    },
    // 展开、收缩所有树节点
    allTreeExpand (isExpand) {
      if (isExpand) {
        XEUtils.eachTree(this.tree, item => {
          item._EXPAND = item._HAS_CHILDREN
          item._VISIBLE = true
        })
      } else {
        XEUtils.eachTree(this.tree, item => {
          item._EXPAND = false
          item._VISIBLE = !item._LEVEL
        })
      }
      this.refreshTree()
    },
    refreshTree () {
      const treeList = XEUtils.toTreeArray(this.tree)
      this.fullList = treeList
      this.list = treeList.filter(item => item._VISIBLE)
    }
  },
  mounted () {
    this.loadTree(10)
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>
.my-tree {
  padding: 0 10px;
  border: 1px solid #e8eaec;
  background-color: #fff;
}
.my-tree .my-tree-item {
  height: 32px;
  line-height: 32px;
}
.my-tree .my-tree-item.has-child .tree-icon {
  visibility: visible;
  transition: all 0.3s;
}
.my-tree .my-tree-item.is-expand .tree-icon {
  transform: rotate(90deg);
}
.my-tree .tree-icon {
  cursor: pointer;
  width: 20px;
  line-height: 20px;
  text-align: center;
  visibility: hidden;
  user-select: none;
}
</style>
