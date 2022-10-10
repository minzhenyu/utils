// 将华氏温度转换为摄氏温度
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

fahrenheitToCelsius(50);
// 10

// 将摄氏温度转华氏温度
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

celsiusToFahrenheit(100);
// 212
