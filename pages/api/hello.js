// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    try {
      const res = UrlFetchApp.fetch(url, options);
      const responseText = res.getContentText();
      console.log("Response Data: ", responseText);
    } catch (error) {
      console.error("Error: " + error.toString());
    }
}