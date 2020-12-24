<script>
import Store from './Store';
// 请求加密key和白名单
import { LAUNCH_APP_CODES, TABBAR_PATHS } from "./modules/config";
import PAGES from "./pages4route.js";
// #ifdef MP-BAIDU
Store.set({
  key: "platform",
  data: "BAIDU",
  lasting: true,
});
// #endif
// #ifdef MP-WEIXIN
Store.set({
  key: "platform",
  data: "WEIXIN",
  lasting: true,
});
// #endif
// #ifdef MP-ALIPAY
Store.set({
  key: "platform",
  data: "ALIPAY",
  lasting: true,
});
// #endif
export default {
  onLaunch(options) {
    // #ifdef MP-ALIPAY
    my.hideAllFavoriteMenu();
    // #endif
    const sys = uni.getSystemInfoSync();
    Store.set({
      key: "deviceInfo",
      data: sys,
      lasting: true,
    });
    Store.set({
      key: "isIpx",
      data: sys.model.indexOf("iPhone X") > -1,
      lasting: true,
    });
    // #ifdef MP-WEIXIN
    const clientId = 80001;
    // #endif
    // #ifdef MP-BAIDU
    const clientId = 40258;
    // #endif
    // #ifdef MP-ALIPAY
    const clientId = 40286;
    // #endif
  },
  onShow({ scene, query } = {}) {
    Store.set({
      key: "canIUseLaunchApp",
      data:
        LAUNCH_APP_CODES.includes(scene) &&
        uni.canIUse("button.open-type.launchApp"),
      lasting: true,
    });
    // #ifdef MP-BAIDU
    let _mscid = "bd_bdxcx";
    // #endif
    // #ifdef MP-WEIXIN
    let _mscid = "cx_wx_01";
    // #endif
    // #ifdef MP-ALIPAY
    let _mscid = "ap_cx_01";
    // #endif
    if (typeof query === "object" && query.scene) {
      const params = decodeURIComponent(query.scene).split("&");
      for (let i = 0; i < params.length; i++) {
        const [k, v] = params[i].split("=");
        if (k === "r") {
          if (v && /^[a-z0-9]+_.+$/i.test(v)) {
            _mscid = v;
          }
          break;
        }
      }
    }
    // 存储当前场景值-仅微信小程序
    // #ifdef MP-WEIXIN
    if (query.scene) {
      Store.set({
        key: "currentAppId",
        data: scene,
      });
    }
    // #endif
  },
  globalData: {
    PAGES,
    handleRoute({ pid, query, redirect, type }) {
      if (pid) {
        const match = pid.match(/([a-z]+)(\d+)/i);
        if (match) {
          const root = PAGES[match[1]];
          const pid = match[2];
          if (root && pid) {
            const page = root.find((item) => item.pid === pid);
            if (page) {
              const { path } = page;
              const url = `/${path}${query ? `?${query}` : ""}`;
              if (type) {
                uni[type]({
                  url,
                });
              } else if (TABBAR_PATHS.includes(path)) {
                uni[redirect ? "reLaunch" : "switchTab"]({
                  url,
                });
              } else {
                uni[redirect ? "redirectTo" : "navigateTo"]({
                  url,
                });
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "./app.less";
</style>