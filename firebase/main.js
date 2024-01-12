export default function main() {
  function determineAppServerKey() {
    const vapidPublicKey =
      "BEqGnJCz4-RxBPZbqOXsqDEtG5pjp6znmGTAtFtj-6MTHGE3GW8gYyJRExSA5hpt2h5BGXCLhtFg3nQjDYh-U5s";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);

    return response.pushManager.getSubscription().then(function (subscription) {
      response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: determineAppServerKey(),
      });
    });
  });
}
