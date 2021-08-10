const ScreeningTask = (task, dependencies) => {
    let result = [];
    let ifCyclic;
    try {
        // to check whether task and dependencies are null or not 
        if (task.length <= 0 && dependencies.length <= 0) {
            return result;
        }
        // to check whether the given task is having any dependencies
        else if (task.length > 0 && dependencies.length === 0) {
            return result = task;
        }
        // condition if task and dependencies both have some values
        else if (task.length > 0 && dependencies.length > 0) {
            let matchedDependenciesTempArray = [];
            // looping on task --> main loop
            task.map((currentTask) => {
                let isMatched = false;
                // looping on dependencies
                dependencies.map((currentDependencies) => {
                    // splitting first term as key using space
                    let currentDependencyKey = currentDependencies.split(" ")[0];
                    // splitting second term as value using space
                    let currentDependencyValue = currentDependencies.split(" ")[2];
                    // comparing current task with current dependency key after splitting
                    if (currentTask.toLowerCase() === currentDependencyKey.toLowerCase()) {
                        // if matched
                        isMatched = true;
                        // filter the duplicate dependency key
                        let filterDependencyDuplicateArray = matchedDependenciesTempArray.filter(x => x.key === currentDependencyKey);
                        if (filterDependencyDuplicateArray.length <= 0) {
                            // filter the dupicate dependency value --> cyclic dependency
                            let filterDependencyDuplicateArray = matchedDependenciesTempArray.filter(x => x.key === currentDependencyValue);
                            if (filterDependencyDuplicateArray.length > 0) {
                                ifCyclic = "Error - this is a cyclic dependency";
                            }
                            else {
                                // push both key and value after matched
                                matchedDependenciesTempArray.push({ "key": currentDependencyKey, "value": currentDependencyValue });
                            }
                        }
                    }
                })
                // if not matched then push into result
                if (!isMatched) {
                    // filtering matched value with current task
                    let filterDependencyDuplicateArray = matchedDependenciesTempArray.filter(x => x.value === currentTask.toLowerCase());
                    if (filterDependencyDuplicateArray.length > 0) {
                        // pushing value from first pair
                        result.push(filterDependencyDuplicateArray[0].value.toLowerCase());

                        let key = filterDependencyDuplicateArray[0].key;
                        // filtering matched value with key
                        let filterDependencyDuplicate = matchedDependenciesTempArray.filter(x => x.value === key.toLowerCase());
                        if (filterDependencyDuplicate.length > 0) {
                            result.push(filterDependencyDuplicate[0].value.toLowerCase());
                            result.push(filterDependencyDuplicate[0].key.toLowerCase());
                        }
                        else {
                            result.push(key.toLowerCase());
                        }
                    }
                    else {
                        result.push(currentTask.toLowerCase());
                    }
                }
            })
            if(ifCyclic) {
                return ifCyclic;
            }else {
                return result;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

export default ScreeningTask;