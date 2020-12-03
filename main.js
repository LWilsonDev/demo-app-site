// edit this with your own apps
var launchPageConfig = {
  apps: [
    {
      icon: "https://uswest.appetize.io/images/sample-icon.png",
      iOS: {
        publicKey: "dtvnym0vhd9mawx80tmqgctdz0",
        languages: [
          {
            locale: "en_CA",
            language: "en",
            name: "English",
          },
          {
            locale: "fr_CA",
            language: "fr",
            iosKeyboard: "fr_CA@sw=QWERTY-Accents",
            name: "French",
          },
        ],
        devices: [
          {
            name: "Phone",
            type: "iphone8",
          },
          {
            name: "Tablet",
            type: "ipadair2",
          },
        ],
      },
      Android: {
        publicKey: "dtvnym0vhd9mawx80tmqgctdz0",
        languages: [
          {
            language: "en_CA",
            name: "English",
          },
          {
            language: "fr_CA",
            name: "French",
          },
        ],
        devices: [
          {
            name: "Phone",
            type: "nexus5",
          },
          {
            name: "Tablet",
            type: "nexus9",
          },
        ],
      },
    },
  ],
  options: {
    hidePasswords: true,
  },
};

$(document).ready(function () {
  // list apps
  var appElements = [];
  for (var i = 0; i < launchPageConfig.apps.length; i++) {
    appElements.push(
      "<a onclick='selectApp(" +
        i +
        ");'><img src='" +
        launchPageConfig.apps[i].icon +
        "' class='launch-icon'/></a>"
    );
  }
  $("#apps").empty();
  $("#apps").append(appElements);
  selectApp(0);
});
// select app, update platforms, devices, languages
var selectedApp = 0;
function selectApp(index) {
  if (
    !sessionActive ||
    confirm("This will restart your session. Do you want to continue?")
  ) {
    sessionActive = false;
    console.log("selecting app " + index);
    selectedApp = index;
    $("#apps .selected").removeClass("selected");
    $($("#apps img")[selectedApp]).addClass("selected");
    // create platform buttons
    var platformElements = [];
    if (launchPageConfig.apps[index].iOS)
      platformElements.push(
        '<a onclick="selectPlatform(\'iOS\');"><button type="button" class="btn btn-info">iOS</button></a>'
      );
    if (launchPageConfig.apps[index].Android)
      platformElements.push(
        '<a onclick="selectPlatform(\'Android\');"><button type="button" class="btn btn-info">Android</button></a>'
      );
    $("#platforms").empty();
    $("#platforms").append(platformElements);
    // select default platform
    if (launchPageConfig.apps[index].iOS) selectPlatform("iOS");
    else if (launchPageConfig.apps[index].Android) selectPlatform("Android");
  }
}
var selectedPlatform;
function selectPlatform(platform) {
  if (
    !sessionActive ||
    confirm("This will restart your session. Do you want to continue?")
  ) {
    sessionActive = false;
    $("#savescreenshot").hide();
    $("#endsession").hide();
    console.log("selecting platform " + platform);
    selectedPlatform = platform;
    $("#platforms .selected").removeClass("selected");
    $('#platforms .btn:contains("' + selectedPlatform + '")').addClass(
      "selected"
    );
    var deviceElements = [];
    if (
      launchPageConfig.apps[selectedApp][platform].devices &&
      launchPageConfig.apps[selectedApp][selectedPlatform].devices.length > 0
    ) {
      for (
        var i = 0;
        i < launchPageConfig.apps[selectedApp][platform].devices.length;
        i++
      ) {
        var element = $(document.createElement("a"));
        element.attr(
          "onclick",
          "selectDevice(launchPageConfig.apps[selectedApp][selectedPlatform].devices[" +
            i +
            "])"
        );
        element.append(
          '<button type="button" class="btn btn-info">' +
            launchPageConfig.apps[selectedApp][selectedPlatform].devices[i]
              .name +
            "</button>"
        );
        deviceElements.push(element);
      }
      $("#devices").empty();
      $("#devices").append(deviceElements);
      selectDevice(
        launchPageConfig.apps[selectedApp][selectedPlatform].devices[0]
      );
    }
    var languageElements = [];
    if (
      launchPageConfig.apps[selectedApp][selectedPlatform].languages &&
      launchPageConfig.apps[selectedApp][selectedPlatform].languages.length > 0
    ) {
      for (
        var i = 0;
        i <
        launchPageConfig.apps[selectedApp][selectedPlatform].languages.length;
        i++
      ) {
        var element = $(document.createElement("a"));
        element.attr(
          "onclick",
          "selectLanguage(launchPageConfig.apps[selectedApp][selectedPlatform].languages[" +
            i +
            "])"
        );
        element.append(
          '<button type="button" class="btn btn-info">' +
            launchPageConfig.apps[selectedApp][selectedPlatform].languages[i]
              .name +
            "</button>"
        );

        languageElements.push(element);
      }
      $("#languages").empty();
      $("#languages").append(languageElements);
      selectLanguage(
        launchPageConfig.apps[selectedApp][selectedPlatform].languages[0]
      );
    }
  }
}
var selectedDevice;
function selectDevice(device) {
  if (
    !sessionActive ||
    confirm("This will restart your session. Do you want to continue?")
  ) {
    sessionActive = false;
    $("#savescreenshot").hide();
    $("#endsession").hide();
    console.log("selecting device " + device.type);
    selectedDevice = device;
    $("#devices .selected").removeClass("selected");
    $('#devices .btn:contains("' + selectedDevice.name + '")').addClass(
      "selected"
    );
    updateIframeSrcUrl();
  }
}
var selectedLanguage = {};
function selectLanguage(language) {
  if (
    !sessionActive ||
    confirm("This will restart your session. Do you want to continue?")
  ) {
    sessionActive = false;
    $("#savescreenshot").hide();
    $("#endsession").hide();
    console.log("selecting language " + language.name);
    selectedLanguage = language;
    $("#languages .selected").removeClass("selected");
    $('#languages .btn:contains("' + selectedLanguage.name + '")').addClass(
      "selected"
    );
    updateIframeSrcUrl();
  }
}
function updateIframeSrcUrl() {
  var url =
    "https://appetize.io/embed/7ww0v3ke017gfwbr2we4trp7c0?device=nexus5&orientation=portrait&scale=100&osVersion=8.1" +
    launchPageConfig.options.hidePasswords;
  $("#app_iframe").attr("src", url);
  iframe = document.querySelector("iframe");
}
$(document).on("input", "#slider", function () {
  setScale($(this).val() * 100);
});
// Sending messages to iframe from parent window
var iframe = document.querySelector("iframe");
function rotateLeft() {
  iframe.contentWindow.postMessage("rotateLeft", "*");
}
function rotateRight() {
  iframe.contentWindow.postMessage("rotateRight", "*");
}
function setScale(number) {
  iframe.contentWindow.postMessage(
    {
      type: "setScale",
      value: number,
    },
    "*"
  );
}
function saveScreenshot() {
  iframe.contentWindow.postMessage("saveScreenshot", "*");
}
function endSession() {
  if (
    !sessionActive ||
    confirm("This will restart your session. Do you want to continue?")
  ) {
    iframe.contentWindow.postMessage("endSession", "*");
  }
}
// Receiving cross-document messages from iframe in parent window
var sessionActive;
var messageEventHandler = function (event) {
  console.log(event.data);
  if (event.data == "appLaunch") {
    sessionActive = true;
    $("#savescreenshot").show();
    $("#endsession").show();
  } else if (event.data == "sessionEnded") {
    sessionActive = false;
    $("#savescreenshot").hide();
    $("#endsession").hide();
  }
};
window.addEventListener("message", messageEventHandler, false);
