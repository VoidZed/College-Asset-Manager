import PatentLogo from "../assets/patent.png"
import Research from "../assets/research.png"
import Conference from "../assets/conference.png"
import Seminar from "../assets/seminar.png"
import MOU from "../assets/mou.png"

import Workshop from "../assets/workshop.png"
import Bootcamp from "../assets/bootcamp.png"
import Alumini from "../assets/alumini.png"
import Industrial from "../assets/industrial.png"
import Hackathon from "../assets/hackathon.png"
import Guest from "../assets/guest_lecture.png"
import Celebration   from "../assets/day_celebration.png"
import Convocation from "../assets/convocation.png"
import Scholarship from "../assets/scholarship.png"

import Zest from "../assets/zest.png"
import Techfest from "../assets/techfest.png"
import Sports from "../assets/aamod.png"
import Club from "../assets/club.png"
import Oath from "../assets/oath.png"

import Rnd from "../assets/r&d.png"
import College from "../assets/college.png"
import Exam from "../assets/exam.png"
import Tyro from "../assets/tyro.png"


const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perspiciatis, nisi, soluta quisquam similique quia laudantium, distinctio esse maiores harum cupiditate? Voluptate facilis quo aliquam, quos necessitatibus cupiditate perferendis alias!"
const desc1 = "Lorem ipsum dolor sit amet consectetur adipisicing elit."

// Note:' keys are routes


export const routes = {
    "r&d_cell": {
        name: 'Research & Development Cell',
        logo:Rnd,
        description: desc,
        activity: {
            "patent": { name: "Patent", description: desc1,logo:PatentLogo},
            "research_paper": { name: "Research Paper", description: desc1 ,logo:Research},
            "conference": { name: "Conference", description: desc1 ,logo:Conference},
            "seminar": { name: "Seminar", description: desc1 ,logo:Seminar},
            "mou": { name: "MOU", description: desc1 ,logo:MOU}
        }
    },

    "other": {
        name: "All College Activities",
        logo:College,
        description: desc,
        activity: {
            "workshop": { name: "Workshop", description: desc1 ,logo:Workshop},
            "bootcamp": { name: "Bootcamp", description: desc1 ,logo:Bootcamp},
            "alumini_meet": { name: "Alumini Meet", description: desc1 ,logo:Alumini},
            "industrial_visit": { name: "Industrial Visit", description: desc1,logo:Industrial },
            "hackathon": { name: "Hackathon", description: desc1,logo:Hackathon },
            "guest_lecture": { name: "Guest Lecture", description: desc1,logo:Guest },
            "day_celebration": { name: "Day Celebration", description: desc1 ,logo:Celebration},
            "important_exam":{name:"National Exam",description:desc1,logo:Exam}

        }


    },



    "tyro": {
        name: 'TYRO Club',
        description: "Activity managing and organizing club of the SRMS CET",
        logo:Tyro,
        activity: {
            "zest": { name: "ZEST", description: desc1,logo:Zest },
            "techvyom": { name: "Techvyom", description: desc1,logo:Techfest },
            "aamod": { name: "Aamod", description: desc1,logo:Sports },
            "club_activity": { name: "Club Activity", description: desc1,logo:Club },
            "oath_ceremony": { name: "Oath Ceremony", description: desc1 ,logo:Oath},

        }
    },
    
    "trust":{
        name: "SRMS Trust",
        description: desc,
        activity: {
            "scholarship": { name: "Trust Scholarship", description: desc1 ,logo:Scholarship},
            "convocation": { name: "Convocation", description: desc1 ,logo:Convocation},
        }
    }



};
