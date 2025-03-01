import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';



let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server= app.listen(config.port, () => {
      console.log(`app is listening on PORT ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

//  this is   unhandledRejection uncaughtException  error handle 
 
 process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
