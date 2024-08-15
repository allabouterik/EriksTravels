// https://codewithanbu.com/detect-whether-a-device-is-ios-or-not-using-javascript/

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}
