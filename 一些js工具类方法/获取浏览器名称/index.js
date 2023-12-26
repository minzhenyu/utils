function getExplorer() {
    const ua = window.navigator.userAgent;
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1;
    };
    if (isExplorer("MSIE")) return "IE";
    else if (isExplorer("Firefox")) return "Firefox";
    else if (isExplorer("Chrome")) return "Chrome";
    else if (isExplorer("Opera")) return "Opera";
    else if (isExplorer("Safari")) return "Safari";
}
const arr = getExplorer();
console.log(arr); //Chrome
