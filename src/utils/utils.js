/**
 * Function returning the build date(as per provided epoch)
 * @param epoch Time in milliseconds
 */
import moment from "moment";
export const getBuildDate = (epoch) => {
  const buildDate = moment(epoch).format("DD-MM-YYY HH:MM");
  return buildDate;
};

export const sendPopupMessage = (data, db) => {
  const docRef = db.collection("Users").doc(data?.receiverID);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const registrationToken = doc.data()?.deviceToken;
   
      
      if (registrationToken) {
        let body = {
          notification: {
            title: 'New Message',
            body: data.msg,
          },
          to: registrationToken,
        };

        let option = {
          method: "POST",
          headers: new Headers({
            Authorization:
              "key=AAAA2ywIpsg:APA91bHxmBteBUjp8V6qmxmX5FmssxYyi-JRebgY9mAaaUNNfDuSbSsrWX5rS0f9sQo2LvRq_K9oL-MwNsphwj1r5DdAfVxLs634NdcvHihdabyUpu2j0qGDNZNBeb5FpXjoe0LfNksL",
            "Content-type": "application/json",
          }),
          body: JSON.stringify(body),
        };

        fetch("https://fcm.googleapis.com/fcm/send", option)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log({ error });
          });
      } else {
        console.log("token not found");
      }
    }
  });
};
