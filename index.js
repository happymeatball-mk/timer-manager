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