const getParameters = (URL) =>
  JSON.parse(
    `{"${decodeURI(URL.split("?")[1])
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );

getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1");
// {q: 'js+md', newwindow: '1'}

// 从 URL 中获取参数
const getParamByUrl = (key) => {
  const url = new URL(location.href);
  return url.searchParams.get(key);
};
