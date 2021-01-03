
const puVapidKey = 'BM9ygFMJVJC5ep6lNjWsr6ibSKOYMXqGUZLpMwoLjISiBYl5YWa6Vg58R2gzk4BkyRhmsQIqpVVc9XfPYLnsN0I';
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  async function send(){
    console.log("Registering service worker")
    const register = await navigator.serviceWorker.register('/worker.js', {scope:'/'});
    console.log("Service worker registered...");
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey:urlBase64ToUint8Array(puVapidKey)
    });
    console.log("Push registered");
    console.log("Sending push");
    await fetch("/subscribe",{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    })
    console.log("Push sent");
}
if('serviceWorker' in navigator){
    send().catch(err=>console.error(err));
}

