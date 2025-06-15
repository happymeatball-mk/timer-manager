class TimersManager {

    #isStart = false;
    timeout = 10000;

    constructor() {
        this.queue = [];
        this.logs = [];
    }

    errorsModule(item) {
        if (typeof item.timerData.name !== 'string' || item.timerData.name === '') {
            throw new Error(item.timerData.name, "wrong name type");
        }

        if (typeof item.timerData.delay !== 'number') {
            throw new Error("wrong delay type" ); 
        }

        if (item.timerData.delay < 0 || item.timerData.delay > 5000) {
            throw new Error("wrong delay value"); 
        }

        if (typeof item.timerData.interval !== 'boolean') {
            throw new Error("wrong interval type"); 
        }

        if (typeof item.timerData.job !== 'function') {
            throw new Error("wrong job type"); 
        }
    }

    _log(item, args, result, err = null) {
        if (err) {
            this.logs.push({
                name: item.timerData.name,
                in:  args,
                out: result,
                error: {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                },
                created: new Date()
            })
        } else {
            this.logs.push({
                name: item.timerData.name,
                in:  args,
                out: result,
                created: new Date()
            })  
        }
    }

    async callback(item) {
        try {
            this.errorsModule(item);
            const result = await item.timerData.job(...item.args);
            this._log(item, item.args, result);
        } catch (err) {
            const result = undefined;
            this._log(item, item.args, result, err);
        }
        
    }

    timersTimeout () {
        let maxdelay = 0;
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.delay > maxdelay) {
                maxdelay = this.queue[i].timerData.delay;
            }
        }
        maxdelay += this.timeout;
        setTimeout(() => this.stop(), maxdelay);
    }

    add(data, ...args) {
        if (this.#isStart === true) {
            throw new Error("Cannot add timers after TimeManager has started");
        }

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === data.name) {
                throw new Error("Timer is already in the queue"); 
            }
        }

        this.queue.push({ 
            timerData: data, 
            args: args
        });

        return this
    }

    remove(item) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === item.name) {
                if (item.timerData.interval === true) {
                    clearInterval(this.queue[i].id);
                } else {
                    clearTimeout(this.queue[i].id);
                }
                this.queue.splice(i, 1);
            }
        }
        return this
    }
    
    start() {   
        this.timersTimeout(); 
        this.queue.forEach((item) => {
            if (item.timerData.interval === true) {
                item.id = setInterval(() => this.callback(item), item.timerData.delay);
            } else {
                item.id = setTimeout(() => this.callback(item), item.timerData.delay);
            }
        })    

        this.#isStart = true;
    }

    stop() {
        this.queue.forEach(
            (item) => {
                if (item.timerData.interval === true) {
                    clearInterval(item.id);
                } else {
                    clearTimeout(item.id);
                }
            }
        )
    }

    pause(item) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === item.name) {
                if (this.queue[i].timerData.interval === true) {
                    clearInterval(this.queue[i].id);
                } else {
                    clearTimeout(this.queue[i].id);
                }
            } 
        }
    }

    resume(item) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === item.name) {
                if (this.queue[i].timerData.interval === true) {
                    item.id = setInterval(() => this.callback(this.queue[i]), this.queue[i].timerData.delay);
                } else {
                    item.id = setTimeout(() => this.callback(this.queue[i]), this.queue[i].timerData.delay);
                }
            }
        }
    }

    print() {
        setTimeout(() => console.log(this.logs), this.timeout)
    }
}

export default TimersManager;