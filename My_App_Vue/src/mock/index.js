import Mock from "mockjs";
// 模拟接口延时响应
Mock.setup({
  timeout: "200-600",
});

//登录接口
// options参数包含了前端请求的所有信息，包括请求方法、请求url、请求头、请求体等
Mock.mock("https://www.demo.com/login", "post", (options) => {
  //console.log("options",options.body)
  const { username, password } = JSON.parse(options.body);
  if (username === "admin" && password === "admin123123") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        username: "赵铁柱",
        token: "mocktoken123456admin",
        btnAuth: ["add", "edit", "delete"],
      },
    };
  } else if (username === "manager" && password === "manager123123") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        username: "manager",
        token: "mocktoken123456manager",
        btnAuth: ["add", "edit"],
      },
    };
  } else if (username === "user" && password === "user123123") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        username: "user",
        token: "mocktoken123456user",
        btnAuth: ["add"],
      },
    };
  } else {
    return {
      code: 401,
      message: "用户名或密码有误",
      data: "",
    };
  }
});

const menuList = [
  {
    menuId: 1,
    menuParentId: 0,
    menuIcon: "ApartmentOutlined",
    menuName: "menu.instrument",
    menuType: 0,
    sortNum: 1,
    children: [
      {
        menuId: 2,
        menuParentId: 1,
        menuIcon: "ApiOutlined",
        menuName: "menu.application",
        menuType: 1,
        menuUrl: "/tool/application",
        menuWinformName: "tool/application/index.vue",
        sortNum: 1,
        children: [],
      },
      {
        menuId: 3,
        menuParentId: 1,
        menuIcon: "AimOutlined",
        menuName: "menu.tool",
        menuType: 1,
        menuUrl: "/sim/tool",
        menuWinformName: "tool/index.vue",
        sortNum: 2,
        children: [],
      },
    ],
  },
  {
    menuId: 4,
    menuParentId: 0,
    menuIcon: "AccountBookOutlined",
    menuName: "menu.library",
    menuType: 1,
    menuUrl: "/test/test",
    menuWinformName: "library/index.vue",
    sortNum: 20,
    children: [],
  },
  {
    menuId: 5,
    menuParentId: 0,
    menuIcon: "AppleOutlined",
    menuName: "menu.toolConfig",
    menuType: 0,
    sortNum: 21,
    children: [
      {
        menuId: 6,
        menuParentId: 5,
        menuIcon: "FormatPainterOutlined",
        menuName: "menu.toolOne",
        menuType: 0,
        menuUrl: "",
        sortNum: 23,
        children: [
          {
            menuId: 7,
            menuParentId: 6,
            menuIcon: "AlertOutlined",
            menuName: "menu.pageone",
            menuType: 1,
            menuUrl: "/menu/pageone",
            menuWinformName: "tool/toolOne.vue",
            sortNum: 25,
            children: [],
          },
        ],
      },
      {
        menuId: 8,
        menuParentId: 5,
        menuIcon: "FilePdfOutlined",
        menuName: "menu.toolTwo",
        menuType: 0,
        sortNum: 24,
        children: [
          {
            menuId: 9,
            menuParentId: 8,
            menuIcon: "AuditOutlined",
            menuName: "menu.toolTwo",
            menuType: 1,
            menuUrl: "/tool/toolTwo",
            menuWinformName: "tool/toolTwo.vue",
            sortNum: 27,
            children: [],
          },
          {
            menuId: 10,
            menuParentId: 8,
            menuIcon: "AlertOutlined",
            menuName: "menu.toolThree",
            menuType: 1,
            menuUrl: "/tool/toolThree",
            menuWinformName: "tool/toolThree.vue",
            sortNum: 28,
            children: [],
          },
        ],
      },
    ],
  },
];

Mock.mock("https://www.demo.com/menu", "get", (options) => {
  return {
    code: 200,
    message: "请求成功",
    data: menuList,
  };
  // const token = sessionStorage.getItem("token");
  // if (token == "mocktoken123456admin") {
  //   return {
  //     code: 200,
  //     message: "请求成功",
  //     data: menuList,
  //   };
  // } else if (token == "mocktoken123456user") {
  //   return {
  //     code: 200,
  //     message: "请求成功",
  //     data: menuList,
  //   };
  // } else if (token == "mocktoken123456manager") {
  //   return {
  //     code: 200,
  //     message: "请求成功",
  //     data: menuList,
  //   };
  // } else {
  //   return {
  //     code: 200,
  //     message: "失败",
  //     data: [],
  //   };
  // }
});

Mock.mock("https://www.demo.com/userInfo", "get", (options) => {
  return {
    code: 200,
    message: "请求成功",
    data: {
      username: "雪饼猴",
      token: "mocktoken123456admin",
      btnAuth: ["add", "edit", "delete"],
    },
  };
});
