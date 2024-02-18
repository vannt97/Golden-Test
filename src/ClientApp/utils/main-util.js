import { API_URL, API_URL_PRODUCTION } from "../../GLOBAL_CONFIG";

export function appHeight() {
  var factorCanvas = window.innerHeight / window.innerWidth;
  const doc = document.documentElement;
  if (factorCanvas < 16 / 9) {
    var width = window.innerHeight * (9 / 16) + "px";
    var height = window.innerHeight + "px";
    doc.style.setProperty("--app-height", `${height}`);
    doc.style.setProperty("--app-width", `${width}`);
  } else {
    var width = window.innerWidth + "px";
    var height = window.innerWidth * (16 / 9) + "px";
    doc.style.setProperty("--app-height", `${height}`);
    doc.style.setProperty("--app-width", `${width}`);
  }
}

export function logger() {
  // console.log(window.IS_DEBUG);
  if (window.IS_DEBUG == false) {
    if (!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
      console[methods[i]] = function () {};
    }
  }
}

export function linkUrl() {
  switch (window.IS_PRODUCTION) {
    case 1: {
      return API_URL_PRODUCTION;
      break;
    }
    default: {
      return API_URL;
      break;
    }
  }
}

export function shareFB(
  type = 1,
  data = {
    hashtag: null,
    linkShare: null,
    linkRedirect: null,
  },
  callback
) {
  switch (type) {
    case 1:
      //link Share
      const metaUrlRedirectType1 = data.linkShare;
      // let metaUrlType1 = window.location.origin + "/share-video/" + data.uuid;

      // const objectType1 = JSON.stringify({
      //   image: data.metaThumbnail,
      //   url: encodeURIComponent(metaUrlType1),
      // });

      // FB.ui(
      //   {
      //     display: "popup",
      //     method: "share",
      //     href: "https://developers.facebook.com/docs/",
      //     redirect_uri:
      //       "https://abbott-kdg-2023.otovina.xyz/cam-on?facebook_return=true",
      //   },
      //   function (response) {
      //     window.location.href =
      //       "https://abbott-kdg-2023.otovina.xyz/cam-on?facebook_return=true";
      //   }
      // );

      FB.ui(
        {
          display: "popup",
          method: "share",
          hashtag: data.hashtag,
          href: metaUrlRedirectType1,
          redirect_uri: data.linkRedirect,
        },
        function (response) {
          window.parent.location.href = data.linkRedirect;
        }
      );
      break;
    case 2: {
      window.open(
        `https://www.facebook.com/dialog/feed?app_id=810702220735044&link=${encodeURIComponent(
          data.linkShare
        )}&redirect_uri=${encodeURIComponent(
          data.linkRedirect
        )}&hashtag=${encodeURIComponent(data.hashtag)}`
      );

      window.parent.location.href = data.linkRedirect;

      break;
    }
    // case 2:
    //   //share Graph
    //   const metaUrlRedirect = window.location.origin + "/share.php";
    //   let metaUrl;
    //   if (getParamsCustomer() !== null) {
    //     metaUrl =
    //       window.location.origin +
    //       "/share-video/" +
    //       data.uuid +
    //       getParamsCustomer().utmstring;
    //   } else {
    //     metaUrl = window.location.origin + "/share-video/" + data.uuid;
    //   }
    //   const object = JSON.stringify({
    //     author: data.metaAuthor,
    //     title: data.metaTitle,
    //     description: data.metaDescription,
    //     image: data.metaThumbnail,
    //     url: encodeURIComponent(metaUrl),
    //   });
    //   console.log("object", JSON.parse(object), data.hashtag);
    //   FB.ui(
    //     {
    //       display: "popup",
    //       method: "share_open_graph",
    //       hashtag: data.hashtag,
    //       action_type: "og.likes",
    //       action_properties: JSON.stringify({
    //         object: `${metaUrlRedirect}?object=${object}`,
    //         // object: `https://game.marvyco.com/test-feature/kha/share-2.php?object=${object}`,
    //       }),
    //     },
    //     function (response) {
    //       // if(Array.isArray(response)){
    //       // }
    //       callback(response);
    //       console.log("Vào type2", response);
    //     }
    //   );
    //   break;
    default:
      break;
  }
}

export function getValueFromURL(name, path = null) {
  var url_string = path != null ? path : window.location.href;
  // console.log(url_string);
  var url = new URL(url_string);
  // console.log(url);
  var param = url.searchParams.get(name);
  return param;
}

export function deviceType() {
  const ua = navigator.userAgent;
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  } else if (
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      ua
    )
  ) {
    return "tablet";
  }
  return "desktop";
}

export function detectInAppBrowser() {
  var ua = navigator.userAgent;
  ua = ua.toLowerCase().trim();
  const isIOS =
    ua.includes("iphone") || ua.includes("ipod") || ua.includes("ipad");
  const isAndroid = ua.includes("android");
  if (isIOS || isAndroid) {
    // iOS Chrome
    if (
      ua.includes("crios") ||
      (isIOS && /safari\/[0-9.]+$/.test(ua)) ||
      (isAndroid && ua.includes("chrome") && /safari\/[0-9.]+$/.test(ua))
    ) {
      return "native_browser";
    } else {
      return "inapp_browser";
    }
  }
  return null;
}

export function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}