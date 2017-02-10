var Task = function (category, title, priority, estimate) {
    this.category = category;
    this.title = title;
    this.priority = priority;
    this.estimate = estimate;
    this.spent = 0;
    this.remaining = 1.5;
}
Task.prototype.track = function (n) {
    if (n > 0) {
        this.spent = n;
        this.remaining = this.estimate - this.spent;
    }
}
Task.prototype.done = function() {
    if(this.remaining === 0) {
        return true;
    }
    return false;
}
Task.prototype.complete = function() {
   if(!this.done())  
   this.remaining = 0; 
}
module.exports = Task