import cluster from 'cluster';
import { availableParallelism } from 'os';
import startServer from './server';

import 'dotenv/config';
const PORT = process.env.PORT ?? 4000;

const useMulti = () => {
  const numCPUs = availableParallelism();
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    cluster.schedulingPolicy = cluster.SCHED_RR;

    for (let i = 0; i < numCPUs; i++) {
      const workerPort = +PORT + i;
      cluster.fork({ PORT: workerPort });
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    console.log(`Worker process started: ${process.pid}`);
    startServer();
  }
};

useMulti();
