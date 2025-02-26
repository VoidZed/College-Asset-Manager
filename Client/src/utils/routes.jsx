const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perspiciatis, nisi, soluta quisquam similique quia laudantium, distinctio esse maiores harum cupiditate? Voluptate facilis quo aliquam, quos necessitatibus cupiditate perferendis alias!"
const desc1 = "Lorem ipsum dolor sit amet consectetur adipisicing elit."

// Note:' keys are routes


export const routes = {
    "value_addition": {
        name: 'Value Addition Cell',
        description: desc,
        activity: {
            "patent": { name: "Patent", description: desc1 },
            "guest_lecture": { name: "Guest Lecture", description: desc1 },
            "workshop": { name: "Workshop", description: desc1 }
        }
    },

    "app_development": {
        name: "App Development Cell",
        description: desc,
        activity: {
            "android_app": { name: "Android App", description: desc1 },
            "ios_app": { name: "IOS App", description: desc1 },
            "web_warriors": { name: "Web Warriors", description: desc1 }
        }
    },

    "patent": {
        name: 'Patent Cell',
        description: desc,
        activity: {
            "patent": { name: "Patent", description: desc1 },
            "startup": { name: "Startup", description: desc1 },
            "incubation_idea": { name: "Incubation Idea", description: desc1 }
        }
    },

    "tyro": {
        name: 'TYRO Club',
        description: "Activity managing and organizing club of the SRMS CET",
        activity: {
            "zest": { name: "ZEST", description: desc1 },
            "techvyom": { name: "Techvyom", description: desc1 },
            "aamod": { name: "Aamod", description: desc1 }
        }
    },

    "illuminati": {
        name: 'Illuminati Club',
        description: "Activity managing and organizing club of the SRMS CET",
        activity: {
            "club_activity": { name: "Club Activity", description: desc1 },
            "sport_activity": { name: "Sport Activity", description: desc1 },
            "day_event": { name: "Day Event", description: desc1 }
        }
    },

    "equinox": {
        name: 'Equinox Club',
        description: "Activity managing and organizing club of the SRMS CET",
        activity: {
            "club_activity": { name: "Club Activity", description: desc1 },
            "sport_activity": { name: "Sport Activity", description: desc1 },
            "day_event": { name: "Day Event", description: desc1 }
        }
    },

    "robotrax": {
        name: 'Robotrax Club',
        description: "Activity managing and organizing club of the SRMS CET",
        activity: {
            "club_activity": { name: "Club Activity", description: desc1 },
            "sport_activity": { name: "Sport Activity", description: desc1 },
            "day_event": { name: "Day Event", description: desc1 }
        }
    }
};
