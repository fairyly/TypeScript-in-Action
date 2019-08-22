
import  commander  from 'commander';
import  colors  from 'colors';
import  axios, {AxiosResponse}  from 'axios';

const comand = commander
  .version('1.0.0')
  .option('-c, --city [name]', 'add city name')
  .parse(process.argv);

// if (!comand.city) {
//   // code...
//   comand.outputHelp();
// }
if (!process.argv.slice(2).length) {
  comand.outputHelp(colors.red);
  process.exit();
}

console.log(comand.city)

interface WeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: Live[];
}

interface Live {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const URL = 'https://restapi.amap.com/v3/weather/weatherInfo';
const KEY = '你的key';

axios.get(`${URL}?city=${encodeURI(comand.city)}&key=${KEY}`).then((res: AxiosResponse<WeatherResponse>) => {
  // WeatherResponse.lives: Live[];
  const live = res.data.lives[0];
  console.log(colors.red(live.city));
}).catch(()=>{
  console.log('服务异常')
})