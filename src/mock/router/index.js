const router = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../../layout'),
        redirect: '/workbench',
        children: [
            {
                path: '/test',
                name: 'test',
                component: () => import('../../views/test')
            },
            {
                path: '/form',
                name: '表单组件',
                component: () => import('../../views/form')
            },
            {
                path: '/table',
                name: '表格组件',
                component: () => import('../../views/table')
            },
            {
                path: '/modal',
                name: '对话框组件',
                component: () => import('../../views/modal')
            },
            {
                path: '/provide',
                name: '组件传值',
                component: () => import('../../views/provide')
            },
            {
                path: '/workbench',
                name: '工作台',
                component: () => import('../../views/workbench')
            },
            {
                path: '/seach',
                name: '表格表单',
                component: () => import('../../views/seach')
            },
            {
                path: '/drag',
                name: '拖拽',
                component: () => import('../../views/drag')
            },
            {
                path: '/dynamicStyle',
                name: '动态样式',
                component: () => import('../../views/dynamicStyle')
            },
            {
                path: '/teleport',
                name: 'teleport',
                component: () => import('../../views/teleport')
            },
            {
                path: '/move',
                name: '可移动指令',
                component: () => import('../../views/move')
            },
            {
                path: '/playground',
                name: '在线编辑器',
                component: () => import('../../views/playground')
            },
            {
                path: '/three',
                name: '三维测试',
                component: () => import('../../views/three')
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('../../views/login')
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
        component: () => import('../../views/404'),
    }
]

export default {
    "code": 200,
    "msg": "成功",
    "data": router
}
