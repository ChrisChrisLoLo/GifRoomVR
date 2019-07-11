export const loadGifs = async (count) => {
  return await fetch('https://api.gfycat.com/v1/gfycats/trending?tagName=_gfycat_all_trending&count='+count+'&cursor=')
      .then(res => res.json())
      .then(data => {
        return data.gfycats.map(gif => gif.webmUrl);
      }).catch(error => {
        console.error(error)
      });
};