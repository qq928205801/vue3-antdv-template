const router = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../../layout/index.vue'),
        redirect: '/workbench',
        children: [
            {
                path: '/test',
                name: 'test',
                component: () => import('../../views/test/index.vue')
            },
            {
                path: '/form',
                name: '表单组件',
                component: () => import('../../views/form/index.vue')
            },
            {
                path: '/table',
                name: '表格组件',
                component: () => import('../../views/table/index.vue')
            },
            {
                path: '/modal',
                name: '对话框组件',
                component: () => import('../../views/modal/index.vue')
            },
            {
                path: '/provide',
                name: '组件传值',
                component: () => import('../../views/provide/index.vue')
            },
            {
                path: '/workbench',
                name: '工作台',
                component: () => import('../../views/workbench/index.vue')
            },
            {
                path: '/seach',
                name: '表格表单',
                component: () => import('../../views/seach/index.vue')
            },
            {
                path: '/drag',
                name: '拖拽',
                component: () => import('../../views/drag/index.vue')
            },
            {
                path: '/dynamicStyle',
                name: '动态样式',
                component: () => import('../../views/dynamicStyle/index.vue')
            },
            {
                path: '/teleport',
                name: 'teleport',
                component: () => import('../../views/teleport/index.vue')
            },
            {
                path: '/move',
                name: '可移动指令',
                component: () => import('../../views/move/index.vue')
            },
            {
                path: '/playground',
                name: '在线编辑器',
                component: () => import('../../views/playground/index.vue')
            },
            {
                path: '/three',
                name: '三维测试',
                component: () => import('../../views/three/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('../../views/login/index.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../../views/404.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/404',
        component: () => import('../../views/404.vue'),
    }
]

export default {
    "code": 200,
    "msg": "成功",
    "data": router
}
