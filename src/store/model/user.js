import { menus, userInfo } from "@/js/service/user.js";
const routeAllPathToCompMap = import.meta.glob("@/page/**/*.vue");

export function tree2list (tree) {
  let data = [];
  while (tree.length) {
    let { children, ...item } = tree.pop();
    if (item.menuType === 4) continue;
    let obj = {
      path: item.menuUrl,
      name: item.menuName,
      component: item.menuWinformName,
      sortNum: item.sortNum,
      meta: { closable: true, icon: item.menuIcon },
      menuId: item.menuId,
      menuParentId: item.menuParentId,
    };
    data.push(obj);
    if (children)
      for (let i = children.length - 1; i >= 0; i--) tree.push(children[i]);
  }
  return data;
}

export default {
  namespaced: true, //开启命名空间
  state: {
    name: "",
    menus: [],
    userInfo: {},
    token: localStorage.getItem("token")? localStorage.getItem("token") : "",
  },
  mutations: {
    setName (state, value) {
      state.name = value;
    },
    setToken (state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },  
    setMenus (state, value) {
      state.menus = value;
    },
    setUserInfo (state, value) {
      state.userInfo = value;
    },
  },
  actions: {
    SetMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        menus()
          .then((res) => {
            if (!res.data) return;
            let data = tree2list(res.data);
            data.forEach((t) => {
              if (t.path && !t.path.startsWith("/layout")) {
                t.path = "/layout" + t.path;
              }
            });
            data.forEach((r) => {
              if (r.component) {
                try {
                  r.component = routeAllPathToCompMap[`/src/views/${r.component}`];
                } catch {
                  r.component = null;
                }
              }
            });
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });

        userInfo().then((res) => {
          console.log(JSON.stringify(res.data));
          commit("setUserInfo", res.data);
        });
      });
    },
  },
  getters: {
    getName (state) {
      return state.name;
    },
    getToken (state) {
      return state.token;
    },
  },
};
