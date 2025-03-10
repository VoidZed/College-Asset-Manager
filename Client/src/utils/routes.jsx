import PatentLogo from "../assets/patent.png"
import Research from "../assets/research.png"
import Conference from "../assets/conference.png"
import Seminar from "../assets/seminar.png"

const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perspiciatis, nisi, soluta quisquam similique quia laudantium, distinctio esse maiores harum cupiditate? Voluptate facilis quo aliquam, quos necessitatibus cupiditate perferendis alias!"
const desc1 = "Lorem ipsum dolor sit amet consectetur adipisicing elit."

// Note:' keys are routes


export const routes = {
    "r&d_cell": {
        name: 'Research & Development Cell',
        description: desc,
        activity: {
            "patent": { name: "Patent", description: desc1,logo:PatentLogo},
            "research_paper": { name: "Research Paper", description: desc1 ,logo:Research},
            "conference": { name: "Conference", description: desc1 ,logo:Conference},
            "seminar": { name: "Seminar", description: desc1 ,logo:Seminar},
            "mou": { name: "MOU", description: desc1 }
        }
    },

    "other": {
        name: "All College Activities",
        description: desc,
        activity: {
            "workshop": { name: "Workshop", description: desc1 },
            "bootcamp": { name: "Bootcamp", description: desc1 },
            "alumini_meet": { name: "Alumini Meet", description: desc1 },
            "industrial_visit": { name: "Industrial Visit", description: desc1 },
            "hackathon": { name: "Hackathon", description: desc1 },
            "guest_lecture": { name: "Guest Lecture", description: desc1 },
            "day_celebration": { name: "Day Celebration", description: desc1 },

        }


    },



    "tyro": {
        name: 'TYRO Club',
        description: "Activity managing and organizing club of the SRMS CET",
        activity: {
            "zest": { name: "ZEST", description: desc1 },
            "techvyom": { name: "Techvyom", description: desc1 },
            "aamod": { name: "Aamod", description: desc1 },
            "club_activity": { name: "Club Activity", description: desc1 },
            "oath_ceremony": { name: "Oath Ceremony", description: desc1 },

        }
    },
    
    "trust":{
        name: "SRMS Trust",
        description: desc,
        activity: {
            "scholarship": { name: "Trust Scholarship", description: desc1 },
            "convocation": { name: "Convocation", description: desc1 },
        }
    }



};
