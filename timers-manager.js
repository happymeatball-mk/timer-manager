class TimersManager {

    #isStart = false;

    constructor() {
        this.queue = [];
        this.logs = [];
    }

    async _log(item, value1, value2, result) {
        this.logs.push({
            name: item.timerData.name,
            in:  [value1, value2],
            out: result,
            created: new Date(),
        })
    }

    add(data, arg1 = null, arg2 = null) {
        if (this.#isStart === true) {
            throw new Error("Cannot add timers after TimeManager has started");
        }

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name == data.name) {
                console.log(this.queue[i].timerData.name, "Timer already in queue"); 
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
        //checking module

        for (let i = 0; i < this.queue.length; i++) {
            if (typeof this.queue[i].timerData.name !== typeof 'string' || this.queue[i].timerData.name === '') {
                console.log(this.queue[i].timerData.name, "wrong name type"); 
                return
            }

            if (typeof this.queue[i].timerData.delay !== 'number') {
                console.log(this.queue[i].timerData.name,"wrong delay type" ); 
                return
            }

            if (this.queue[i].timerData.delay < 0 || this.queue[i].timerData.delay > 5000) {
                console.log(this.queue[i].timerData.name, "wrong delay value"); 
                return
            }

            if (typeof this.queue[i].timerData.interval !== 'boolean') {
                console.log(this.queue[i].timerData.name, "wrong interval type"); 
                return
            }

            if (typeof this.queue[i].timerData.job !== 'function') {
                console.log(this.queue[i].timerData.name, "wrong job type"); 
                return
            }
        }

        this.queue.forEach((item) => {

            const callback = async () => {
                const result = await item.timerData.job(item.value1, item.value2);
                await this._log(item, item.value1, item.value2, result);
                if (result === undefined) {return};
            }

            if (item.timerData.interval === true) {
                item.id = setInterval(callback, item.timerData.delay)
            } else {
                item.id = setTimeout(callback, item.timerData.delay)
            }
        })    

        this.#isStart = true;
    }

    stop() {
        this.queue.forEach(
            (item) => {if (item.timerData.interval === true) {
                    clearInterval(item.id)
                } else {
                    clearTimeout(item.id)
                }
            }
        )
    }

    pause(item) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timerData.name === item.name) {
                if (item.interval === true) {
                    clearInterval(item.id)
                } else {
                    clearTimeout(item.id)
                }
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

    print() {
        setTimeout(() => {
            console.log(this.logs)}, 10000
        )
    }
}

export default TimersManager;