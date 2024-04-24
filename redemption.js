import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '1m',
  ext: {
    loadimpact: {
      projectID: 3693331,
      // Test runs with the same name groups test runs together
      name: 'Redemption'
    }
  }
  // Add more options as needed
};

export default function () {
  const url = 'https://api-stg.star-am.com/transaction/redeem';
  const payload = JSON.stringify({
    "partnerReferenceNo": "YANLORD00023",
    "customerExternalId": "YANLORDREG0001",
    "sid": "SID0YAN001",
    "productCode": "STA01MMC01MID002",
    "unit": "15",
    "isRedeemAll": false
  });
  const channelID = `CHANNEL_ID_${__VU}`;
  const params = {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'CHANNEL_ID': channelID,
      // Include any other headers like authorization if needed
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'is status 200': (r) => r.status === 200,
    // Add more checks as per your validation requirements
  });

  console.log(response.body);

  // Make sure to adjust sleep time based on your testing requirements
  sleep(1);
}
