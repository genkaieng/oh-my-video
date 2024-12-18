import { command } from "./command";
import { start } from "./server";

const [arg] = process.argv.slice(2);
switch(arg) {
  case 'server':
    start();
    break;
  default:{
    if (!/https?:\/\//.test(arg)) {
      throw new Error("pnpm dev <url>");
    }
    
    (async () => {
      const results = await command(arg);
      results?.forEach((item) => console.log(item));
    })();
    break;
  }
}
