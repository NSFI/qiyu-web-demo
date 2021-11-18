

export function configUsr() {
    ysf('config', {
        uid:"14486211167",
        name:'test',
        email:'test@163.com',
        mobile:'13888888888',
        data:JSON.stringify([
            {"key":"real_name", "value":"土豪"},
            {"key":"mobile_phone", "value":"15989303213", "hidden":true},
            {"key":"email", "value":"13800000000@163.com"},
            {"index":0, "key":"account", "label":"账号", "value":"zhangsan" , "href":"http://example.domain/user/zhangsan"},
            {"index":1, "key":"sex", "label":"性别", "value":"先生"},
            {"index":5, "key":"reg_date", "label":"注册日期", "value":"2015-11-16"},
            {"index":6, "key":"last_login", "label":"上次登录时间", "value":"2015-12-22 15:38:54"}
        ]),
        staffid:'123',
        groupid: '123',
        shuntId: '123',
        level: 1,
        qtype: 1056,
        welcomeTemplateId: 1024,
        success: function() {},
        error: function() {}
    });
}