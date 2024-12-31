import { command } from "./command";
import { start } from "./server";

const [arg] = process.argv.slice(2);

switch(arg) {
  case 'server':
    start();
    break;
  case 'version':
    console.log('Version:', process.env.npm_package_version);
    console.log('Author:', process.env.npm_package_author);
    break;
  default:{
    if (!/https?:\/\//.test(arg)) {
      throw new Error("URLを指定してください");
    }

    (async () => {
      const result = await command(arg);
      console.log(JSON.stringify(result, null, 2));
    })();
    break;
  }
}
