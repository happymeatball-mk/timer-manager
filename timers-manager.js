class TimersManager {

    #isStart = false;

    constructor() {
        this.queue = [];
    }

    add(data, arg1 = null, arg2 = null) {
        if (this.#isStart === true) {
            throw new Error('Cannot add timers after TimeManager has started');
        }

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name == data.name) {
                console.log(this.queue[i].timerData.name, "уже в очереди"); 
                return
            }
        }

        this.queue.push(
        { 
            timerData: data,
            value1: arg1, 
            value2: arg2
        });

        

        return this
    }

    remove(item) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === item.name) {
                clearTimeout(this.queue[i].id)
                this.queue.splice(i, 1)
            }
        }
        return this
    }
    
    start() {
        //checking module

        for (let i = 0; i < this.queue.length; i++) {
            if (typeof this.queue[i].timerData.name !== typeof "string" || this.queue[i].timerData.name === '') {
                console.log(this.queue[i].timerData.name, "wrong name type"); 
                return
            }

            if (typeof this.queue[i].timerData.delay !== typeof 1) {
                console.log(this.queue[i].timerData.name,"wrong delay type" ); 
                return
            }

            if (this.queue[i].timerData.delay < 0 || this.queue[i].timerData.delay > 5000) {
                console.log(this.queue[i].timerData.name, "wrong delay value"); 
                return
            }

            if (typeof this.queue[i].timerData.interval !== typeof true) {
                console.log(this.queue[i].timerData.name, "wrong interval type"); 
                return
            }

            if (typeof this.queue[i].timerData.job !== typeof (() => {})) {
                console.log(this.queue[i].timerData.name, "wrong job type"); 
                return
            }
        }


        this.queue.forEach((item) => {if (item.timerData.interval === true) {
                item.id = setInterval(
                    () => {
                        const result = item.timerData.job(item.value1, item.value2);
                        if (result === undefined) {return};
                        console.log(result)
                    }, 
                item.timerData.delay)} 

                else {
                    item.id = setTimeout(
                    () => {
                        const result = item.timerData.job(item.value1, item.value2);
                        if (result === undefined) {return};
                        console.log(result)
                    }, 
                    item.timerData.delay)
                }
            }
        )    
        
        this.#isStart = true;
    }

    stop() {
        this.queue.forEach(
            (item) => clearTimeout(item.id)
        )
    }

    pause(item) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === item.name) {
                clearTimeout(this.queue[i].id)
            }
        }
    }

    resume(item) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === item.name) {
                setTimeout(
                    () => {
                        const result = this.queue[i].timerData.job(
                            this.queue[i].value1, 
                            this.queue[i].value2); 
                        console.log(result)
                    }, 
                    this.queue[i].timerData.delay
                )
            }
        }
    }

}

const manager = new TimersManager()

const t1 = {
    name: 't1',
    delay: 1000,
    interval: false,
    job: () => { console.log('t1') } 
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
    interval: true,
    job: () => { console.log('t4') } 
};



manager.add(t1).add(t2, 2, 3).add(t3, 4, 5).add(t4);
//manager.remove(t2)

manager.start();
//manager.stop()
//manager.add(t4);
//manager.pause(t1);
//manager.resume(t2);

//console.log(manager)


