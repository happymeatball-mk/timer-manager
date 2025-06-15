# timer-manager

## Description

Timers Manager is a lightweight JavaScript application for managing timers and intervals. It provides an intuitive API for adding, starting, pausing, resuming, and removing timers.

Timers Manager methods:

The **add** method adds a timer for execution  
The **add** method can be joined manager.add(t1).add(t2, 1, 2);  
The **remove** method stops a specific timer and removes it from the queue  
The **start** method starts all timers for execution  
The **print** method returns an array of all logs 

## Quickstart

Install node.js - https://nodejs.org/en

Clone the repository and run the script using Node.js.

git clone https://github.com/happymeatball-mk/timer-manager.git
cd \the-path-to-your-repository\timers-manager
node index.js

## Example Code

import TimersManager from './timers-manager.js'

const manager = new TimersManager()

const t1 = {
    name: 't1',
    delay: 1000,
    interval: false,
    job: () => console.log('t1')
};

const t2 = {
    name: 't2',
    delay: 2000,
    interval: false,
    job: (a, b) => a + b 
};

const t3 = {
    name: 't3',
    delay: 5000,
    interval: false,
    job: (a, b) => a * b
};

const t4 = {
    name: 't4',
    delay: 1000,
    interval: false,
    job: () => {throw new Error('We have a problem!')}
};

const t5 = {
    name: 't5',
    delay: 1000,
    interval: false,
    job: n => n 
};


manager.add(t1).add(t2, 2, 3).add(t3, 4, 5).add(t4).add(t5, 1);
manager.start();
manager.print();

## Expected Output

[
  {
    name: 't1',
    in: [],
    out: undefined,
    created: 2025-06-15T18:40:00.636Z
  },
  {
    name: 't4',
    in: [],
    out: undefined,
    error: {
      name: 'Error',
      message: 'We have a problem!',
      stack: 'Error: We have a problem!\n' +
        '    at Object.job (file:///C:/Users/User1/javascriptProjects/timers-manager/index.js:30:23)\n' +
        '    at TimersManager.callback (file:///C:/Users/User1/javascriptProjects/timers-manager/timers-manager.js:59:49)\n' +
        '    at Timeout._onTimeout (file:///C:/Users/User1/javascriptProjects/timers-manager/timers-manager.js:118:49)\n' +
        '    at listOnTimeout (node:internal/timers:588:17)\n' +
        '    at process.processTimers (node:internal/timers:523:7)'
    },
    created: 2025-06-15T18:40:00.636Z
  },
  { name: 't5', in: [ 1 ], out: 1, created: 2025-06-15T18:40:00.636Z },
  {
    name: 't2',
    in: [ 2, 3 ],
    out: 5,
    created: 2025-06-15T18:40:01.624Z
  },
  {
    name: 't3',
    in: [ 4, 5 ],
    out: 20,
    created: 2025-06-15T18:40:04.632Z
  }
]