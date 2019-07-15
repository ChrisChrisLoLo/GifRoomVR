const express = require('express')
const app = express();
const port = 3100;

const apiRoot = "/api";
app.get(apiRoot+"/gfycat",async (req,res)=>{
  res.send(await fetch('https://api.gfycat.com/v1/gfycats/trending?tagName=_gfycat_all_trending&count=1&cursor=')
      .then(res => res.json())
      .then(data => {
        return data.gfycats.map(gif => gif.webmUrl);
      }).catch(error => {
        console.error(error)
      })
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));