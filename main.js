async function process_argv() {
    let { argv } = process;
    argv = argv.slice(2);
    const result = await studentActivitiesRegistration(argv);

    return result;
}

async function getStudentActivities() {
    let result = {}
    try {
        let res = await fetch("http://localhost:3001/activities");
        result = await res.json();
    } catch (error) {
        console.log(error)
    }
    return result; // TODO: replace this
}

async function studentActivitiesRegistration(data) {
    let result;

    if (data[0] == "CREATE") {
        result = addStudent(data[1], data[2])
    }
    if (data[0] == "DELETE") {
        result = deleteStudent(data[1])
    }

    return result; // TODO: replace this
}

async function addStudent(name, day) {
    let result = {}

    const data = {
        name: name,
        activities: []
    };

    try {
        let activityList = await getStudentActivities()

        // Looping setiap activiities data activityList
        activityList.forEach(activity => {
            // bandingkan data dari activity day dengan parameter day
            // Looping lagi array activity days, baru bandingkan
            activity.days.forEach(element => {
                if ( element == day ) {
                    data.activities.push(
                        {
                            name: activity.name,
                            desc: activity.desc
                        }
                    )
                }
            })
            // kalau sama, mungkin ke data.activities.
        });
        
        try {
            let res = await fetch("http://localhost:3001/students", {
                method: "POST", // HTTP METHOD
                headers: {
                //HTTP Headers
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            })
            result = res.json()
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
    
    return result; // TODO: replace this
}

async function deleteStudent(id) {
    return {}; // TODO: replace this
}

process_argv()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = {
    studentActivitiesRegistration,
    getStudentActivities,
    addStudent,
    deleteStudent
};
