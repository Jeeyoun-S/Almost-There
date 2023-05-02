import { apiInstance } from "../index";

const api = apiInstance();

async function meetingRegister(
  id,
  name,
  date_time,
  place,
  address,
  lat,
  lng,
  success,
  fail
) {
  const Authorization = "Bearer " + localStorage.getItem("Authorization");
  console.log(" at ", id, name, date_time, place, address, lat, lng);
  await api
    .post(
      `/meeting`,
      {
        hostId: id,
        meetingName: name,
        meetingTime: date_time,
        meetingPlace: place,
        meetingAddress: address,
        meetingLat: lat,
        meetingLng: lng,
        roomCode: "",
      },
      {
        headers: {
          Authorization: Authorization,
        },
      }
    )
    .then(success)
    .catch(fail);
}

async function getTodayMeetings() {
  var result = null;
  await api.get("/meeting/today").then((res) => {
    result = res.data.data;
  });
  return await Promise.resolve(result);
}

async function getUpcomingMeetings() {
  var result = null;
  await api.get("/meeting/upcoming").then((res) => {
    result = res.data.data;
  });
  return await Promise.resolve(result);
}

function getcntMeetingsWithin3hours() {
  return new Promise((resolve, reject) => {
    api
      .get("/meeting/3hours", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getBestMember() {
  var result = null;
  await api.get("/member/best-member").then((res) => {
    result = res.data.data;
    console.log(result);
  });
  return await Promise.resolve(result);
}

async function postReceiptInfo(receipt) {
  var result = null;

  var formData = new FormData();
  formData.append("receipt", receipt);

  await api
    .post(`/meeting-calculate/receipt`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(async (res) => {
      if (res.data.statusCode == 200) {
        result = res.data.data;
      }
    })
    .catch();
  return await Promise.resolve(result);
}

async function saveCalculateDetail(
  meetingId,
  filePath,
  fileName,
  storeName,
  totalPrice
) {
  await api
    .post(`/meeting-calculate/detail`, {
      meetingId: meetingId,
      filePath: filePath,
      fileName: fileName,
      storeName: storeName,
      price: totalPrice,
    })
    .then((res) => {
      console.log(res);
    });
}

export {
  meetingRegister,
  getTodayMeetings,
  getUpcomingMeetings,
  getcntMeetingsWithin3hours,
  getBestMember,
  postReceiptInfo,
  saveCalculateDetail,
};
