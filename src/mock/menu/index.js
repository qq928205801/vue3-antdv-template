let data = [
    {
        key: "1",
        name: "工作台",
        path: "/workbench",
        children: [],
    },
    {
        key: "2",
        name: "demo",
        children: [
            { key: "3", name: "测试", path: "/test" },
            {
                key: "4",
                name: "表单组件",
                path: "/form",
            },
            {
                key: "5",
                name: "表格组件",
                path: "/table",
                // children: [{ key: "6", name: "表格组件", path: "/table" }],
            },
            {
                key: "6",
                name: "对话框组件",
                path: "/modal",
            },
            {
                key: "9",
                name: "组件传值",
                path: "/provide",
            },
            {
                key: "10",
                name: "拖拽",
                path: "/drag",
            },
            {
                key: "11",
                name: "动态样式",
                path: "/dynamicStyle",
            },
            {
                key: "12",
                name: "teleport",
                path: "/teleport",
            },
            {
                key: "13",
                name: "可移动指令",
                path: "/move",
            },
            {
                key: "14",
                name: "在线编辑器",
                path: "/playground",
            },
            {
                key: "15",
                name: "三维测试",
                path: "/three",
            },
        ],
    },
    {
        key: "7",
        name: "搜索",
        children: [
            {
                key: "8",
                name: "表单表格",
                path: "/seach",
            },
        ],
    },
]
export default {
    "code": 200,
    "msg": "成功",
    "data": data
}