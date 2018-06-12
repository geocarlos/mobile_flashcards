import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function createNotification(){
  return {
    title: 'Remember to study!',
    body: "Don't forget to take your quizzes today!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data)=>{
    if(data === null){
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status})=>{
        if(status === 'granted'){
          Notifications.cancelAllScheduledNotificationsAsync();
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(19);
          tomorrow.setMinutes(30);

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          );
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}

export function clearLocalNotification(){
  console.log("Notification cleared.");
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}
