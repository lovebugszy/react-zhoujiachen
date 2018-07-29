const api = {
    login:'/login', //登录
    allUser:'/user', // 查询所有收款人
    // 入库
    entrySelectList:'/business',       //选择企业列表

    stroeSelectList:'/mestore',       //选择企业列表

    entryList:'/instorage',            // 入库单列表
    exports:'/export',                 // 导出
    enforcedCompletion:'/instorage',    // 入库单强制完成
    entryDetails:'/instorage',         // 入库单详情
    dynamic:'/dynamic',                 // 动态详情

    reportentry:'/statistics',          //入库明细报表


    // 出库
    outputList:'/out_storage',          // 出库单列表
    outputDetails:'/out_storage',       // 出库单列表
    outputSignIn:'/sign',                // 签收   
    outputCheckSign:'/sign',           // 覆盖签收校验
    afterSale:'/after_sale',           // 销退单查询

    Receivablesorder:'/Receivablesorder', //新增收款单


    Enterprise:'/business', //企业管理

    //销退
    afterSaleList: '/after_sale',           // 销退单列表
    afterSaleDetails: '/after_sale',       //销退单详情
    //其它处理
    sellOtherList: '/after_sale',               //其他处理单列表
    sellOtherDetails: '/after_sale',            //其他处理单详情
    enforcedCompletions: '/after_sale',         //取消
    //货损
    dangerList: "/after_sale",             //货损单列表
    dangerDetails: '/after_sale',       //货损单详情
    //采购
    buyList: "/after_sale",            //采购列表
    buyDetails: '/after_sale',         //采购详情

    Receivablesorder: '/Receivablesorder', //新增收款单


    Receivablesgoods: '/save', //新增收货
    Storedetail: '/store_detail',//库存信息

    reportStore:'/storeBatch',//库存明细报表
    BasicInfo:'/basicInfo',
    SaveRole:'/saveRole',//保存角色
    Mestore:'/mestore',//仓库
}

export default api